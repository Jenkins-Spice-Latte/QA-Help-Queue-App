FROM node:alpine3.11

WORKDIR .



COPY package.json .

RUN npm install
RUN npm install axios

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]