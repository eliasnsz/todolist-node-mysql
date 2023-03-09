FROM node:18-alpine

WORKDIR /usr/frontend

COPY package*.json /usr/frontend/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

# Start the application
CMD [ "npm", "start" ]