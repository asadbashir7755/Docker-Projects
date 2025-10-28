FROM node:18-alpine


LABEL maintainer="asadbashir2229526@gmail.com"
LABEL version="1.0"
LABEL description="two tier application to practice docker networking"

WORKDIR /app

COPY nodejs-mysql-links/package*.json ./

RUN npm install

COPY nodejs-mysql-links/ ./

EXPOSE 4000

CMD ["npm","run","dev"]

