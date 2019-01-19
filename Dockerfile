FROM node:11.7.0-jessie

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

COPY . /app

WORKDIR /app

RUN npm install --production

CMD ["node", "."]