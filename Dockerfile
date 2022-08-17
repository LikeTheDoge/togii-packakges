# 制定node镜像的版本
FROM node:16
# 移动当前目录下面的文件到app目录下
ADD . /app/
# 进入到app目录下面，类似cd
WORKDIR /app
# 设置镜像
RUN npm config set registry http://39.101.133.158:4873
RUN yarn config set registry http://39.101.133.158:4873
# 安装依赖
RUN yarn install
# 对外暴露的端口，这里的3010需要和inde.js监听的端口一致
EXPOSE 8001
# 程序启动脚本，意思为 执行 npm start
CMD ["yarn", "doc:serve"]
