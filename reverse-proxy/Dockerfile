FROM base/archlinux

MAINTAINER mizucoffee

RUN useradd www-data
RUN pacman --noconfirm -Syu && \
  pacman --noconfirm -S nodejs npm yarn git gcc make wget pcre zlib geoip mailcap

RUN wget -O openssl.tar.gz https://github.com/openssl/openssl/archive/OpenSSL_1_1_1-pre8.tar.gz && \
  wget -O nginx.tar.gz http://nginx.org/download/nginx-1.15.2.tar.gz && \
  tar xvf openssl.tar.gz && \
  mv openssl-OpenSSL_1_1_1-pre8 openssl && \
  tar xvf nginx.tar.gz && \
  mv nginx-1.15.2 nginx && \
  cd openssl && \
  ./Configure --prefix=/usr --openssldir=/etc/ssl --libdir=lib shared no-ssl3-method enable-ec_nistp_64_gcc_128 "linux-x86_64" "-Wa,--noexecstack" && \
  make depend && \
  make && \
  make MANDIR=/usr/share/man MANSUFFIX=ssl install_sw install_ssldirs install_man_docs && \
  cd ../nginx && \
  ./configure \
  --prefix=/etc/nginx \
  --conf-path=/etc/nginx/nginx.conf \
  --sbin-path=/usr/bin/nginx \
  --pid-path=/run/nginx.pid \
  --lock-path=/run/lock/nginx.lock \
  --user=http \
  --group=http \
  --http-log-path=/var/log/nginx/access.log \
  --error-log-path=stderr \
  --http-client-body-temp-path=/var/lib/nginx/client-body \
  --http-proxy-temp-path=/var/lib/nginx/proxy \
  --http-fastcgi-temp-path=/var/lib/nginx/fastcgi \
  --http-scgi-temp-path=/var/lib/nginx/scgi \
  --http-uwsgi-temp-path=/var/lib/nginx/uwsgi \
  --with-openssl=/openssl \
  --with-compat \
  --with-debug \
  --with-file-aio \
  --with-http_addition_module \
  --with-http_auth_request_module \
  --with-http_dav_module \
  --with-http_degradation_module \
  --with-http_flv_module \
  --with-http_geoip_module \
  --with-http_gunzip_module \
  --with-http_gzip_static_module \
  --with-http_mp4_module \
  --with-http_realip_module \
  --with-http_secure_link_module \
  --with-http_slice_module \
  --with-http_ssl_module \
  --with-http_stub_status_module \
  --with-http_sub_module \
  --with-http_v2_module \
  --with-mail \
  --with-mail_ssl_module \
  --with-pcre-jit \
  --with-stream \
  --with-stream_geoip_module \
  --with-stream_realip_module \
  --with-stream_ssl_module \
  --with-stream_ssl_preread_module \
  --with-threads && \
  make && \
  make install && \
  install -d /var/lib/nginx && \
  chmod 755 /var/log/nginx && \
  chown root:root /var/log/nginx

RUN echo DUMMY

RUN git clone https://github.com/KawakawaRitsuki/dot.mizucoffee.net.git /dot && \
  git clone https://github.com/KawakawaRitsuki/about.mizucoffee.net.git /about && \
  git clone https://github.com/KawakawaRitsuki/mizu.coffee.git /mizu.coffee

RUN cd /dot && yarn install --network-timeout 1000000 && npx gulp
RUN cd /about && yarn install --network-timeout 1000000 && npx gulp
RUN cd /mizu.coffee && yarn install --network-timeout 1000000 && npx gulp

ADD error /error/
ADD nginx.conf /etc/nginx/
ADD conf-build /conf-build
ADD dhparam.pem /etc/nginx/

RUN cd /conf-build && yarn && node build.js && mkdir -p /etc/nginx/conf.d/ && cp output/* /etc/nginx/conf.d/

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
