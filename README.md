# React Demos

一个基于 React + TypeScript + Vite 的现代化前端项目，包含多个演示页面和完整的开发工具链。

## ✨ 特性

- 🚀 **现代化技术栈**: React 18 + TypeScript + Vite
- 🎨 **UI 组件库**: Ant Design + Tailwind CSS
- 🛣️ **路由管理**: React Router v6 + 模块化路由配置
- 🔐 **权限控制**: 基于 Context 的认证系统
- 🧪 **测试框架**: Vitest + Testing Library
- 📦 **包管理**: pnpm
- 🔧 **代码质量**: ESLint + Prettier + Husky + lint-staged
- 📝 **提交规范**: Commitizen + Commitlint

## 📁 项目结构

```text
src/
├── api/                 # API 接口
├── assets/             # 静态资源
├── components/         # 组件
│   ├── common/        # 通用组件
│   └── layout/        # 布局组件
├── config/            # 配置文件
├── constants/         # 常量定义
├── contexts/          # React Context
├── hooks/             # 自定义 Hooks
├── pages/             # 页面组件
├── routes/            # 路由配置
│   └── modules/       # 路由模块
├── styles/            # 样式文件
├── test/              # 测试工具
├── types/             # TypeScript 类型定义
└── utils/             # 工具函数
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20.14.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm dev

# 启动开发服务器（指定端口）
pnpm dev --port 3000
```

### 构建

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 测试

```bash
# 运行测试
pnpm test

# 运行测试（UI 模式）
pnpm test:ui

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

### 代码质量

```bash
# 运行 ESLint 检查
pnpm lint

# 自动修复 ESLint 问题
pnpm lint:fix

# 提交代码（使用 Commitizen）
pnpm commit
```

## 🔧 技术栈

### 核心框架

- **React 18**: 用户界面库
- **TypeScript**: 类型安全的 JavaScript
- **Vite**: 快速的构建工具

### UI 和样式

- **Ant Design**: React UI 组件库
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Less**: CSS 预处理器

### 路由和状态管理

- **React Router v6**: 声明式路由
- **React Context**: 状态管理

### 开发工具

- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **Husky**: Git hooks
- **lint-staged**: 暂存文件检查
- **Commitizen**: 规范化提交信息

### 测试

- **Vitest**: 单元测试框架
- **Testing Library**: React 组件测试
- **jsdom**: DOM 环境模拟

## 📝 开发规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用 PascalCase 命名
- 文件和目录使用 kebab-case 命名

### 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

### 目录规范

- `components/common`: 通用组件
- `components/layout`: 布局组件
- `pages`: 页面组件
- `hooks`: 自定义 Hooks
- `types`: TypeScript 类型定义
- `utils`: 工具函数
- `api`: API 接口

## 🌍 环境变量

项目支持多环境配置，在根目录下创建对应的环境文件：

- `.env`: 全局环境变量
- `.env.development`: 开发环境
- `.env.production`: 生产环境
- `.env.test`: 测试环境

```bash
# API 相关
VITE_API_URL=https://api.example.com
VITE_TARGET=https://api.example.com

# 应用信息
VITE_NAME=React Demos
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
