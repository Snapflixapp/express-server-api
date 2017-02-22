FROM node:boron

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/var/app

COPY package.json npm-shrinkwrap.json $HOME/snapflix/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/snapflix
RUN npm install

USER root
COPY . $HOME/snapflix
RUN chown -R app:app $HOME/*
USER app

CMD ["node", "/server/index.js"]
