FROM node:18-alpine

LABEL maintainer="asadbashir2229526@gmail.com"
LABEL version="1.0"
LABEL description="nodejs application"

WORKDIR /app

COPY simple-nodejs-app/package*.json ./

RUN npm install

COPY simple-nodejs-app/ .

EXPOSE 3000

# it will run what is under start in package.json file which is (node index.js)
# so below command will  do node index.js
# CMD ["npm","start"]

ENTRYPOINT [ "npm","start" ]

# ENTRYPOINT = the fixed command

# CMD = default arguments for that command