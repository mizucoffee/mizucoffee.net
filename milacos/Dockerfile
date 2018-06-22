FROM node

MAINTAINER mizucoffee

ENV GOROOT /usr/local/go
ENV GOPATH $HOME/.go
ENV PATH $GOPATH/bin:$GOROOT/bin:$PATH
ENV PORT 3000

RUN set -x && \
  apt update && \
  apt -y install git nginx docker software-properties-common && \
  wget https://dl.google.com/go/go1.10.3.linux-amd64.tar.gz && \
  wget https://download.docker.com/linux/static/stable/x86_64/docker-18.03.1-ce.tgz && \
  tar -xvf go1.10.3.linux-amd64.tar.gz && \
  mv go /usr/local && \
  mkdir $HOME/.go && \
  mkdir -p /ssh/log && \
  mkdir -p /ssh/config

RUN set -x && \
  tar xvf docker-18.03.1-ce.tgz && \
  mv docker/* /usr/bin/ && \
  go get -u github.com/tg123/sshpiper/sshpiperd

# ADD milacos /milacos/
ADD start.sh /ssh/
RUN git clone https://github.com/KawakawaRitsuki/MiLaCoS.git /milacos

WORKDIR /milacos

RUN set -x && \
  mkdir keys && \
  npm install && \
  npm run build-css

ADD nginx.conf /etc/nginx/

CMD ["node", "index.js"]
