# 贡献指南

感谢您对本项目的关注！我们欢迎任何形式的贡献。

## 开发环境设置

1. **Fork 并克隆仓库**

   ```bash
   git clone https://github.com/your-username/react-demos.git
   cd react-demos
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   ```

## 开发流程

### 分支管理

- `main`: 主分支，保持稳定
- `develop`: 开发分支
- `feature/*`: 功能分支
- `fix/*`: 修复分支

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动

**示例：**

```bash
feat(auth): add login functionality
fix(router): resolve navigation issue
docs: update README installation guide
```

### 代码规范

1. **TypeScript**
   - 使用严格的 TypeScript 配置
   - 为所有函数和组件添加类型注解
   - 避免使用 `any` 类型

2. **React**
   - 使用函数组件和 Hooks
   - 组件名使用 PascalCase
   - Props 接口以 `Props` 结尾

3. **样式**
   - 优先使用 Tailwind CSS
   - 复杂样式使用 Less
   - 保持样式的一致性

4. **文件命名**
   - 组件文件使用 PascalCase
   - 工具函数文件使用 camelCase
   - 目录使用 kebab-case

### 测试

- 为新功能编写单元测试
- 确保所有测试通过
- 保持测试覆盖率

```bash
# 运行测试
pnpm test

# 查看覆盖率
pnpm test:coverage
```

### Pull Request

1. **创建分支**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **提交更改**

   ```bash
   git add .
   pnpm commit  # 使用 Commitizen
   ```

3. **推送分支**

   ```bash
   git push origin feature/your-feature-name
   ```

4. **创建 Pull Request**
   - 提供清晰的标题和描述
   - 关联相关的 Issue
   - 确保 CI 检查通过

### 代码审查

- 所有 PR 需要至少一个审查者批准
- 解决所有审查意见
- 确保代码符合项目规范

## 问题报告

使用 GitHub Issues 报告问题时，请提供：

1. **问题描述**：清晰描述遇到的问题
2. **重现步骤**：详细的重现步骤
3. **期望行为**：描述期望的正确行为
4. **环境信息**：操作系统、浏览器、Node.js 版本等
5. **截图或日志**：如果适用，提供相关截图或错误日志

## 功能请求

提交功能请求时，请说明：

1. **功能描述**：详细描述建议的功能
2. **使用场景**：说明功能的使用场景和价值
3. **实现建议**：如果有想法，可以提供实现建议

## 联系方式

如有任何问题，可以通过以下方式联系：

- 创建 GitHub Issue
- 发送邮件到项目维护者

再次感谢您的贡献！
