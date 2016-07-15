###########################################
# Dockerfile to build an node REST service
###########################################
# Author: robymes
MAINTAINER robymes <robymes@gmail.com>
# Base image is Ubuntu
FROM node:argon
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
EXPOSE 8080
CMD [ "npm", "start" ]