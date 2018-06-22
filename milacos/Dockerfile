FROM node

MAINTAINER mizucoffee

#ENV GOROOT /usr/local/go
#ENV GOPATH $HOME/.go
#ENV PATH $GOPATH/bin:$GOROOT/bin:$PATH
ENV PORT 3000

RUN set -x && \
  apt update && \
  apt -y install git nginx docker software-properties-common && \
  wget https://download.docker.com/linux/static/stable/x86_64/docker-18.03.1-ce.tgz

RUN set -x && \
  tar xvf docker-18.03.1-ce.tgz && \
  mv docker/* /usr/bin/

# ADD milacos /milacos/
RUN git clone https://github.com/KawakawaRitsuki/MiLaCoS.git /milacos

WORKDIR /milacos

RUN set -x && \
  mkdir keys && \
  npm install && \
  npm run build-css

ADD nginx.conf /etc/nginx/

CMD ["node", "index.js"]
