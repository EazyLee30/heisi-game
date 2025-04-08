# 部署指南

## 部署要求

- Node.js 服务器
- Nginx
- 足够的磁盘空间
- 适当的防火墙配置

## 部署步骤

1. **准备构建**
```bash
npm run build
```

2. **配置 Nginx**
- 复制 `nginx.conf` 到服务器
- 放置在 `/etc/nginx/conf.d/heisi-game.conf`

3. **运行部署脚本**
```bash
./deploy.sh
```

## Nginx 配置

项目包含基本的 Nginx 配置，提供：
- 静态文件服务
- 客户端路由处理
- 缓存配置
- 安全头设置

## 手动部署

如果需要手动部署：

1. 构建应用：
```bash
npm run build
```

2. 复制文件到服务器：
```bash
scp -r build/* user@server:/var/www/heisi-game/
```

3. 设置权限：
```bash
ssh user@server "chown -R www-data:www-data /var/www/heisi-game"
```

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本
   - 验证依赖安装
   - 检查语法错误

2. **部署失败**
   - 验证 SSH 访问
   - 检查服务器权限
   - 确保 Nginx 运行

3. **应用无法加载**
   - 检查 Nginx 配置
   - 验证文件权限
   - 检查服务器日志

## 部署后检查清单

- [ ] 验证应用可访问
- [ ] 检查所有路由
- [ ] 测试所有功能
- [ ] 监控服务器资源
- [ ] 设置监控和日志 