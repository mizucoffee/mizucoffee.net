FROM nginx

MAINTAINER mizucoffee

ADD conf.d /etc/nginx/conf.d/
ADD cert /etc/nginx/
ADD nginx.conf /etc/nginx/

RUN apt update
RUN apt -y install git wget curl gnupg
RUN git clone https://github.com/KawakawaRitsuki/dot.mizucoffee.net.git /dot
RUN git clone https://github.com/KawakawaRitsuki/aboutme.git /about
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt -y install nodejs

WORKDIR /dot
RUN npm install
RUN npx gulp

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
