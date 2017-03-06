FROM node:7.6.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm run build

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "run", "serve" ]
