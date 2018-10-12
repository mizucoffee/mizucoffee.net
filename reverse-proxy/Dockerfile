FROM base/archlinux

MAINTAINER mizucoffee

RUN useradd www-data
RUN pacman --noconfirm -Syu && \
  pacman --noconfirm -S nodejs npm yarn git nginx-mainline

RUN git clone https://github.com/KawakawaRitsuki/dot.mizucoffee.net.git /dot && \
  git clone https://github.com/KawakawaRitsuki/about.mizucoffee.net.git /about && \
  git clone https://github.com/KawakawaRitsuki/circle.mizucoffee.net.git /circle && \
  git clone https://github.com/KawakawaRitsuki/mizu.coffee.git /mizu.coffee

RUN cd /dot && yarn install --network-timeout 1000000 && npx gulp
RUN cd /about && yarn install --network-timeout 1000000 && npx gulp
RUN cd /circle && yarn install --network-timeout 1000000 && npx gulp
RUN cd /mizu.coffee && yarn install --network-timeout 1000000 && ./build.sh

ADD error /error/
ADD nginx.conf /etc/nginx/
ADD conf-build /conf-build
ADD dhparam.pem /etc/nginx/

RUN cd /conf-build && yarn && node build.js && mkdir -p /etc/nginx/conf.d/ && cp output/* /etc/nginx/conf.d/

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
