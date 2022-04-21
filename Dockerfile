FROM node:14.15.4-stretch-slim

WORKDIR /app

COPY dist ./dist
COPY package.json package-lock.json ./

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
