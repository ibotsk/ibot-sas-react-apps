FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production --loglevel notice

COPY packages/client ./packages/client
COPY packages/components ./packages/components
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY packages/slovplantlist-admin-js ./packages/slovplantlist-admin-js

COPY lerna.json .
RUN lerna bootstrap -- --production

EXPOSE 3000
CMD [ "npm", "--prefix", "packages/slovplantlist-admin-js", "start" ]
