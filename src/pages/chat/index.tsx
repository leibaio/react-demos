import { ChatMessage, chatStreamApi } from "@/api/chat";
import {
  DeleteOutlined,
  RobotOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Input, Space, Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import "./index.less";

const { TextArea } = Input;

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cancelRequestRef = useRef<(() => void) | null>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentAssistantMessage]);

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim()) {
      message.warning("请输入消息");
      return;
    }

    if (isLoading) {
      message.warning("请等待当前回复完成");
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setCurrentAssistantMessage("");

    let fullContent = "";

    try {
      const cancel = chatStreamApi(
        inputValue,
        (content) => {
          // 接收到消息片段
          fullContent += content;
          setCurrentAssistantMessage(fullContent);
        },
        (error) => {
          // 错误处理
          message.error(`请求失败: ${error.message}`);
          setIsLoading(false);
          setCurrentAssistantMessage("");
        },
        () => {
          // 完成处理
          const assistantMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "assistant",
            content: fullContent,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setCurrentAssistantMessage("");
          setIsLoading(false);
        }
      );

      cancelRequestRef.current = cancel;
    } catch (error) {
      message.error("发送失败");
      setIsLoading(false);
      setCurrentAssistantMessage("");
    }
  };

  // 停止生成
  const handleStop = () => {
    if (cancelRequestRef.current) {
      cancelRequestRef.current();
      cancelRequestRef.current = null;
    }

    if (currentAssistantMessage) {
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: currentAssistantMessage,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }

    setCurrentAssistantMessage("");
    setIsLoading(false);
  };

  // 清空对话
  const handleClear = () => {
    setMessages([]);
    setCurrentAssistantMessage("");
    message.success("对话已清空");
  };

  // 按 Enter 发送（Shift+Enter 换行）
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <Card
        title={
          <Space>
            <RobotOutlined />
            <span>AI 对话助手</span>
          </Space>
        }
        extra={
          <Button
            icon={<DeleteOutlined />}
            onClick={handleClear}
            disabled={messages.length === 0 && !currentAssistantMessage}
          >
            清空对话
          </Button>
        }
        className="chat-card"
      >
        <div className="messages-container">
          {messages.length === 0 && !currentAssistantMessage && (
            <div className="empty-state">
              <RobotOutlined style={{ fontSize: 48, color: "#ccc" }} />
              <p>开始与 AI 对话吧！</p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${msg.role === "user" ? "user-message" : "assistant-message"}`}
            >
              <Avatar
                icon={
                  msg.role === "user" ? <UserOutlined /> : <RobotOutlined />
                }
                className="message-avatar"
                style={{
                  backgroundColor: msg.role === "user" ? "#1890ff" : "#52c41a",
                }}
              />
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {currentAssistantMessage && (
            <div className="message-item assistant-message">
              <Avatar
                icon={<RobotOutlined />}
                className="message-avatar"
                style={{ backgroundColor: "#52c41a" }}
              />
              <div className="message-content">
                <div className="message-text">
                  {currentAssistantMessage}
                  <Spin size="small" style={{ marginLeft: 8 }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息... (Enter 发送, Shift+Enter 换行)"
            autoSize={{ minRows: 2, maxRows: 6 }}
            disabled={isLoading}
          />
          <div className="input-actions">
            {isLoading ? (
              <Button type="primary" danger onClick={handleStop}>
                停止生成
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={!inputValue.trim()}
              >
                发送
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatPage;
