FROM node:18-alpine

LABEL maintainer="asadbashir2229526@gmail.com"
LABEL version="1.0"
LABEL description="nodejs application"

WORKDIR /app

COPY simple-nodejs-app/package*.json ./

RUN npm install

COPY simple-nodejs-app/ .

EXPOSE 3000

CMD ["npm","start"]
# when use cmd and when use entrypoint

# explain each and every word in sequence why used ,any alternative ,what is best practice. 
# more terms we can add , firstly explain this all one by one which command 
# will work to build image which will work after container  run