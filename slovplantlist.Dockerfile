FROM node:10

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

RUN yarn install
RUN yarn --cwd packages/components run build

EXPOSE 3000
CMD [ "yarn", "--cwd", "packages/slovplantlist-admin-js", "start" ]
