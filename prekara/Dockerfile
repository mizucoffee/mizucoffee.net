FROM node

MAINTAINER mizucoffee
ENV PORT 80
ENV MONGO_URL 10.5.0.6

RUN git clone https://github.com/Prekara/PreKara-Server.git /prekara

WORKDIR /prekara
RUN npm install
RUN npm run build

CMD ["node", "index.js"]
