FROM base/archlinux

MAINTAINER mizucoffee
ENV PORT 80

RUN pacman -Syu
RUN pacman --noconfirm -S nodejs yarn git

RUN git clone https://github.com/dylanaraps/neofetch.git /neofetch
RUN mv /neofetch/neofetch /usr/bin/

RUN git clone https://github.com/KawakawaRitsuki/status.mizucoffee.net.git /status
WORKDIR /status
RUN yarn

CMD ["node", "index.js"]
