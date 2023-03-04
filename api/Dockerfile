FROM node:12.13.0-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY api/src ./

USER node

RUN echo $(ls -1 /home/node/app)

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "node", "server.js" ]