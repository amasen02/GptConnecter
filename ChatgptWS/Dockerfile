FROM node:14-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 9229

CMD [ "node", "--inspect=0.0.0.0:9229", "server.js" ]