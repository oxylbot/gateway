FROM node:10.15.1-jessie

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

COPY . /app

WORKDIR /app

RUN npm install --production

CMD ["npm", "start"]