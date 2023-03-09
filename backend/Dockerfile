FROM node:18-alpine

WORKDIR /usr/backend

COPY package*.json /usr/backend

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]