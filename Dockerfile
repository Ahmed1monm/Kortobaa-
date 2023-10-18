FROM node:16

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]