FROM node

MAINTAINER mizucoffee
ENV PORT 80

RUN git clone https://github.com/dylanaraps/neofetch.git /neofetch
RUN ls /neofetch
RUN git clone https://github.com/KawakawaRitsuki/status.mizucoffee.net.git /status
RUN mv /neofetch/neofetch /usr/bin/

WORKDIR /status
RUN npm install

CMD ["node", "index.js"]
