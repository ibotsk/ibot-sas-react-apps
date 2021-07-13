FROM node:14-slim as build-stage

# Create app directory
WORKDIR /usr/src/app

COPY package.json .
COPY lerna.json .
COPY yarn.lock .

COPY packages/client ./packages/client
COPY packages/components ./packages/components
COPY packages/core ./packages/core
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY packages/slovplantlist-admin-js ./packages/slovplantlist-admin-js

RUN yarn install --only=production --ignore-engines
RUN yarn --cwd packages/components run build
RUN yarn --cwd packages/slovplantlist-admin-js run build

FROM nginx:1.12-alpine
COPY --from=build-stage /usr/src/app/packages/slovplantlist-admin-js/build /usr/share/nginx/html
COPY ./nginx-config/default-nossl.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
