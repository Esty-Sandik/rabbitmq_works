FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY producer.js ./

CMD [ "node", "producer.js" ]