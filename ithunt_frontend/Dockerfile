# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-alpine

# 创建并设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install --legacy-peer-deps

# 复制当前目录的所有文件到工作目录
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 暴露应用运行的端口
EXPOSE 3000

# 运行 Next.js 应用
CMD ["npm", "start"]
