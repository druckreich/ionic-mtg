FROM beevelop/ionic:latest as builder

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app

RUN ionic build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/www /usr/share/nginx/html
