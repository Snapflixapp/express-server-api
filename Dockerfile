FROM node:7.6.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install &&  npm run build

EXPOSE 3000
CMD [ "npm", "run", "serve" ]
