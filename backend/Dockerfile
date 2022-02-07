FROM node:14-alpine
WORKDIR /app

ADD package.json package-lock.json /app/
RUN npm ci

ADD . /app/
RUN npm run build

CMD ["npm", "run", "start:docker"]
