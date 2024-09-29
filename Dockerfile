FROM softeko/compress-pdf-base-node AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.8.3 && \
    npm install --omit-dev

COPY . .

RUN npm run build

FROM softeko/compress-pdf-base-node

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]