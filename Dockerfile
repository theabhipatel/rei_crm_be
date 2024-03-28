FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY ./package*.json .

RUN npm install

COPY . .

EXPOSE 3331

RUN npm run build

FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci 

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "start"]
