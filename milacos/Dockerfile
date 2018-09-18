FROM base/archlinux

MAINTAINER mizucoffee

RUN useradd www-data

ENV PORT 3000
ENV MONGO_URI 10.5.0.6

RUN set -x && \
  pacman --noconfirm -Syu && \
  pacman --noconfirm -S git npm nodejs nginx-mainline docker wget && \
  wget https://download.docker.com/linux/static/stable/x86_64/docker-18.03.1-ce.tgz

RUN set -x && \
  tar xvf docker-18.03.1-ce.tgz && \
  mv docker/* /usr/bin/

RUN git clone https://github.com/KawakawaRitsuki/MiLaCoS.git /milacos

WORKDIR /milacos

RUN set -x && \
  mkdir keys && \
  npm install && \
  npm run build-css

ADD nginx.conf /etc/nginx/

CMD ["node", "index.js"]
