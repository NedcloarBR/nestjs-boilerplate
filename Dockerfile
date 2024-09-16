FROM node:20.9.0-alpine AS builder

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY . .

RUN yarn install && yarn build

FROM node:20.9.0-alpine AS runner

WORKDIR /usr/app

COPY --from=builder /usr/app/dist /usr/app/dist
COPY --from=builder /usr/app/package.json /usr/app/package.json
COPY --from=builder /usr/app/yarn.lock /usr/app/yarn.lock

RUN yarn install --production=true && yarn cache clean

CMD [ "yarn", "start:prod" ]
