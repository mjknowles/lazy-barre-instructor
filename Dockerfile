FROM node:carbon
WORKDIR /usr/src/app
COPY dist ./
ENV PORT 8080
EXPOSE 8080

CMD [ "npm", "start" ]