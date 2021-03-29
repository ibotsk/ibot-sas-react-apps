FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .
COPY packages/client ./packages/client
COPY packages/core ./packages/core
COPY packages/components ./packages/components
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY packages/slovplantlist-web-app ./packages/slovplantlist-web-app

RUN yarn install --only=production --ignore-engines
RUN yarn --cwd packages/components run build
RUN yarn --cwd packages/slovplantlist-web-app run build

FROM nginx:1.12-alpine
COPY --from=build-stage /usr/src/app/packages/slovplantlist-web-app/build /usr/share/nginx/html
COPY ./nginx-config/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-config/extra /etc/nginx/extra-conf.d

ARG BACKEND_URL
ARG SSL_CRT_FILE
ARG SSL_KEY_FILE
ARG SSL_PROXY_CRT_FILE
ARG SSL_PROXY_KEY_FILE

RUN sed -i "s/{ssl_crt_file}/${SSL_CRT_FILE}/g; s/{ssl_key_file}/${SSL_KEY_FILE}/g" /etc/nginx/conf.d/default.conf && \
    sed -i "s/{backendurl}/${BACKEND_URL}/g; s/{ssl_proxy_crt_file}/${SSL_PROXY_CRT_FILE}/g; s/{ssl_proxy_key_file}/${SSL_PROXY_KEY_FILE}/g" /etc/nginx/extra-conf.d/nginx-proxy.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
