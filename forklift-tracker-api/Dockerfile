FROM node:18

WORKDIR /app

COPY package*.json ./

ENV DATABASE_URL=postgresql://root:root@forklift-tracker-database:5432/postgres?schema=public

COPY . .

# RUN npx prisma migrate deploy
RUN npx prisma generate && npm run build

CMD ["npm", "run", "start:containter" ]
