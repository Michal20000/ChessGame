# Common build stage
FROM node:18-alpine3.15 AS common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install
RUN npm i bcrypt
RUN npm i express
RUN npm i mongoose
RUN npm i socket.io

EXPOSE 3000

FROM common-build-stage AS production-build-stage

ENV NODE_ENV production
ENV PORT 3000

CMD ["node", "index.js"]
