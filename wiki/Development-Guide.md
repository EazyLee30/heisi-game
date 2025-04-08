# 开发指南

## 环境要求

- Node.js (v14 或更高版本)
- npm (v6 或更高版本)
- Git

## 开发环境设置

1. 克隆仓库：
```bash
git clone https://github.com/EazyLee30/heisi-game.git
cd heisi-game
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm start
```

## 代码规范

- 使用 ESLint 进行代码检查
- 遵循 React 最佳实践
- 使用函数式组件和 Hooks
- 保持代码简洁和可维护

## 测试

运行测试：
```bash
npm test
```

## 构建

创建生产环境构建：
```bash
npm run build
```

## 常见问题

### 依赖安装问题
如果遇到依赖安装问题，尝试：
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

### 开发服务器问题
如果开发服务器无法启动，检查端口 7788 是否被占用。 