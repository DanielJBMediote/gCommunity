#  Lasted version of NodeJS
FROM node:latest

# CREATE DIRECTORY
WORKDIR /server

# COPY ROOT DIRECTORY
COPY ./server/ ./
COPY ./server/package.json ./

# INSTALL DEPENDENCES
RUN npm i -g @adonisjs/cli --silent
RUN npm install --silent
