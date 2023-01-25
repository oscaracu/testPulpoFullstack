FROM node:16.16 AS development
WORKDIR /backend/src/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
RUN npm run build
EXPOSE 3000

