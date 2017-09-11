FROM nginx
ENV NGINX_PORT=80 NGINX_ROOT=/var/www/html/public PROXYPASS_PORT=3000 PROXYPASS_HOST=localhost

COPY entrypoint.sh /entrypoint.sh
COPY vhost.conf.tpl /vhost.tpl

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE $NGINX_PORT

CMD ["nginx", "-g", "daemon off;"]
