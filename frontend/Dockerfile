FROM node:14-alpine

WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci
ADD . /app
RUN npm run build


FROM nginx:alpine
COPY --from=0 /app/build/ /usr/share/nginx/html/
RUN ls /usr/share/nginx/html/
