FROM node:12.18.3-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000
ENTRYPOINT ["yarn", "build"]
