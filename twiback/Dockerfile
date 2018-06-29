FROM node

MAINTAINER mizucoffee
ENV PORT 80
ENV MONGO_URI 10.5.0.6

RUN git clone https://github.com/KawakawaRitsuki/Twiback.git /Twiback
ADD default.json /Twiback/config/

WORKDIR /Twiback
RUN npm install
RUN npm run build-css

CMD ["node", "index.js"]
