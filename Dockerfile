FROM node:22-slim AS builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

ARG UI_MODE
RUN npm run build-prod && ls -l /usr/src/app/dist

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist /lcc-scheduler-ui-dist
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
