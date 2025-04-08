#!/bin/bash

# 停止并删除现有服务
echo "Stopping and removing existing service..."
ssh root@117.72.76.110 "rm -rf /var/www/heisi-game/*"

# 构建应用
echo "Building application..."
npm run build

# 创建远程目录
echo "Creating remote directory..."
ssh root@117.72.76.110 "mkdir -p /var/www/heisi-game"

# 上传构建文件
echo "Uploading build files..."
scp -r build/* root@117.72.76.110:/var/www/heisi-game/build/

# 设置正确的权限
echo "Setting proper permissions..."
ssh root@117.72.76.110 "chown -R www-data:www-data /var/www/heisi-game && chmod -R 755 /var/www/heisi-game"

# 上传 Nginx 配置
echo "Uploading Nginx configuration..."
scp nginx.conf root@117.72.76.110:/etc/nginx/conf.d/heisi-game.conf

# 重启 Nginx
echo "Restarting Nginx..."
ssh root@117.72.76.110 "systemctl restart nginx"

echo "Deployment completed!" 