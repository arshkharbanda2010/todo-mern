FROM node:12.13.0-alpine


WORKDIR /app

COPY client ./

RUN npm install


EXPOSE 3000
CMD ["npm", "start"]