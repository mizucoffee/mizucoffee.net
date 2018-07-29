FROM nginx

MAINTAINER mizucoffee

RUN apt update
RUN apt -y install git wget curl gnupg
RUN git clone https://github.com/KawakawaRitsuki/dot.mizucoffee.net.git /dot
RUN git clone https://github.com/KawakawaRitsuki/aboutme.git /about
RUN git clone https://github.com/KawakawaRitsuki/mizu.coffee.git /mizu.coffee
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt -y install nodejs

WORKDIR /dot
RUN npm install
RUN npx gulp

WORKDIR /about
RUN npm install
RUN npx gulp

WORKDIR /mizu.coffee
RUN npm install
RUN npx gulp

# ADD conf.d /etc/nginx/conf.d/
ADD cert /etc/nginx/
ADD error /error/
ADD nginx.conf /etc/nginx/

ADD conf-build /conf-build
WORKDIR /conf-build
RUN npm install
RUN node build.js
RUN mv output/* /etc/nginx/conf.d/

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
