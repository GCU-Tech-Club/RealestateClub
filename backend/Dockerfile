# Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build 

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

# Copy the service account key into the container
#COPY firebase-sak.json /app/firebase-sak.json

CMD ["node", "dist/index.js"]