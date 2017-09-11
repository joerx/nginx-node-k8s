FROM node:8-alpine

ENV NODE_PORT=3000

COPY package.json /code/
WORKDIR /code
RUN npm --silent install

RUN adduser -D app

COPY ./ /code/
RUN chown app:app /code/*

USER app

EXPOSE $NODE_PORT

CMD ["npm", "start"]
