#  Lasted version of NodeJS
FROM node:current-alpine

#Create api directory
WORKDIR /usr/src/web


COPY ./web/ .usr/src/web/
COPY ./web/package*.json ./usr/src/web/

ENV PATH ./web/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@4.0.0 -g --silent

EXPOSE 3000

# CMD [ "npm", "start" ]