FROM node:alpine

WORKDIR /usr/backend

COPY package*.json /usr/backend

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]