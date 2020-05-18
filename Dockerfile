FROM node:lts as builder
WORKDIR /workdir
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/local/pool-controller-graph
COPY --from=builder /workdier/package*.json .
RUN npm ci
COPY --from=builder /workdir/dist .
EXPOSE 4000
ENTRYPOINT [ "node", "index.js" ]