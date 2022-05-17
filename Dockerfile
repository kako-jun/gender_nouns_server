FROM node:alpine
WORKDIR /app

ENV HOST 0.0.0.0
ENV PORT 8080

COPY ./gender_nouns_server /app
RUN npm install

CMD ["node", "app.js"]
