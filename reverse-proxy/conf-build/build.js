const fs = require("fs-extra")
const src = fs.readJsonSync('./source.json')

fs.mkdirp("./output/")
fs.removeSync("./output/*")

fs.writeFileSync(`./output/milacos.conf`,`server {
  listen 443 ssl http2;
  server_name *.vps.mizucoffee.net;

  ssl_certificate      /cert/_.vps.mizucoffee.net.crt;
  ssl_certificate_key  /cert/_.vps.mizucoffee.net.key;
  ssl_dhparam dhparam.pem;
  add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";

  location / {
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_pass http://10.5.0.7/;
  }
}`)

fs.writeFileSync(`./output/http.conf`,`server {
  listen       80;
  server_name  mizucoffee.net *.mizucoffee.net mizu.coffee *.mizu.coffee;
  rewrite  ^ https://$http_host$request_uri? permanent;
}`)

src.forEach(item => {
  const domain = item.domain
  const subdomain = item.subdomain
  subdomain.forEach(sd => {
    let target = sd.name + "." + domain
    if(sd.name == "@") target = domain
    fs.writeFileSync(`./output/${target}.conf`, `server {
  listen 443 ssl http2;
  server_name ${target};

  ssl_certificate      /cert/${domain}.crt;
  ssl_certificate_key  /cert/${domain}.key;
  ssl_dhparam dhparam.pem;
  add_header Strict-Transport-Security "max-age=31536000; includeSubdomains; preload";

  ${sd.location}

  error_page 502 /502.html;
  error_page 504 /504.html;
  error_page 418 /418.html;

  location ~ /40* { root /error; }
  location ~ /50* { root /error; }
}`)
  })
})

