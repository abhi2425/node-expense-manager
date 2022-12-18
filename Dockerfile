FROM node:16-alpine

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY ./package*.json .

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start"]

