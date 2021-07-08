FROM node:16-alpine

ENV HOME=/app
ENV NODE_ENV=production

WORKDIR /app

RUN cd $WORKDIR

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY src src

CMD npm run start