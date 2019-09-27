FROM node:10-alpine
# NOTE: Remember to use --net="host" if running the container without docker-compose
# Also, if you don't build using docker-compose, make sure you mount config.json as /home/node/config.json when building the image.

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ENV SERVER_PORT=34543
ENV DB_HOST=localhost
ENV DB_PORT=27017
ENV DB_INITDB=admin
ENV CMS_HOST=localhost
ENV CMS_PORT=1337

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ 

USER node
RUN yarn install

# RUN yarn install

COPY --chown=node:node . .

EXPOSE 34543

CMD ["node", "app.js"]
