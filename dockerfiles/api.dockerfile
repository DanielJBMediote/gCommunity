#  Lasted version of NodeJS
FROM node:latest

# CREATE DIRECTORY
WORKDIR /usr/src/api

# COPY ROOT DIRECTORY
COPY ./backend/ ./usr/src/api/
COPY ./backend/package.json /usr/src/api/

# INSTALL DEPENDENCES
RUN npm i -g @adonisjs/cli
RUN npm install
