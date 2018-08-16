FROM node:10-alpine

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

COPY . /app

WORKDIR /app

RUN ["npm", "install", "--production"]

EXPOSE 3281 3282
 
CMD ["npm", "start"]