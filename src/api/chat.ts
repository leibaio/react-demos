const Api = {
  ChatStream: "/api/chat/stream",
};

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface SSEMessage {
  type: "token" | "done";
  content: string;
}

/**
 * 调用 SSE 流式聊天接口（使用 fetch + ReadableStream）
 * @param prompt 用户输入的问题
 * @param onMessage 接收到消息片段时的回调
 * @param onError 发生错误时的回调
 * @param onComplete 完成时的回调
 */
export const chatStreamApi = (
  prompt: string,
  onMessage: (content: string) => void,
  onError?: (error: Error) => void,
  onComplete?: () => void
): (() => void) => {
  // 获取 token
  const token = localStorage.getItem("authToken");

  // SSE 需要使用完整的 URL
  const isDev = import.meta.env.DEV;
  const baseURL = isDev
    ? import.meta.env.VITE_TARGET || "http://localhost:8080"
    : import.meta.env.VITE_API_URL || "";

  const url = `${baseURL}${Api.ChatStream}?prompt=${encodeURIComponent(prompt)}`;

  console.log("SSE 连接地址:", url);
  console.log("使用 Token:", token ? "已设置" : "未设置");

  const abortController = new AbortController();

  // 使用 fetch 实现 SSE，支持自定义请求头
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "text/event-stream",
    },
    signal: abortController.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("SSE 连接已建立");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("无法获取响应流");
      }

      let buffer = "";
      let reading = true;

      // 读取流数据
      while (reading) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("SSE 流结束");
          onComplete?.();
          reading = false;
          break;
        }

        // 解码数据
        buffer += decoder.decode(value, { stream: true });

        // 处理 SSE 格式的数据（按行分割）
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // 保留最后一个不完整的行

        for (const line of lines) {
          const trimmedLine = line.trim();

          // 跳过空行和注释行
          if (!trimmedLine || trimmedLine.startsWith(":")) {
            continue;
          }

          console.log("原始行:", trimmedLine);

          // 处理 "data:" 或 "data: " 开头的行
          if (trimmedLine.startsWith("data:")) {
            // 提取 data 后面的内容（兼容有空格和无空格两种情况）
            const data = trimmedLine.startsWith("data: ")
              ? trimmedLine.substring(6)
              : trimmedLine.substring(5);

            console.log("提取 data:", data);

            try {
              const parsed: SSEMessage = JSON.parse(data);
              console.log("收到消息:", parsed);

              if (parsed.type === "token" && parsed.content) {
                console.log("调用 onMessage，内容:", parsed.content);
                onMessage(parsed.content);
              } else if (parsed.type === "done") {
                console.log("收到完成信号");
                onComplete?.();
                reader.cancel();
                return;
              }
            } catch (e) {
              console.log("JSON 解析失败:", e);
              // 如果不是 JSON，直接使用原始数据
              if (data && data !== "[DONE]") {
                onMessage(data);
              }
            }
          }
        }
      }
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("SSE 连接已取消");
      } else {
        console.error("SSE 连接错误:", error);
        onError?.(error);
      }
    });

  // 返回取消函数
  return () => {
    console.log("取消 SSE 连接");
    abortController.abort();
  };
};
