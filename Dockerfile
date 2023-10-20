FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3010

COPY . .

CMD ["npm", "run", "prisma"]
