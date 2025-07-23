export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复bug
        "docs", // 文档更新
        "style", // 代码格式（不影响功能）
        "refactor", // 重构
        "perf", // 性能优化
        "test", // 测试相关
        "chore", // 构建过程或辅助工具的变动
        "ci", // CI配置文件和脚本的变动
        "build", // 影响构建系统或外部依赖的更改
        "revert", // 回滚
      ],
    ],
    "subject-case": [0], // 关闭主题大小写检查
  },
};
