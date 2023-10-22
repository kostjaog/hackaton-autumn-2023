FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
ENV DATABASE_URL=postgresql://root:root@db:5432/postgres?schema=public

COPY . .

RUN npx prisma migrate deploy

RUN npm run build

CMD [ "npm", "run", "start:dev" ]