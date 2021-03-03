FROM node:10 as build-deps
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

RUN yarn install
RUN yarn --cwd packages/components run build
RUN yarn --cwd packages/slovplantlist-web-app run build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/packages/slovplantlist-web-app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]