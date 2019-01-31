FROM node:11.9.0-alpine

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

COPY . /app

WORKDIR /app

RUN npm install --production

CMD ["node", "."]