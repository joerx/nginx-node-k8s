server {

    listen ${NGINX_PORT};

    server_name _;
    root ${NGINX_ROOT};

    index index.html;

    location ~ ^/\. {
        deny all;
    }

    # Max cache lifetime for static files & disable access logging
    location ~* \.(css|js|jpg|jpeg|gif|png|ico|gz|svg|svgz|ttf|otf|woff|woff2|eot|mp4|ogg|ogv|webm|html|htm|swf|pdf)$ {
        add_header Pragma public;
        expires max;
        access_log off;
    }

    location / {
        try_files $uri $uri/ @backend;
    }

    location @backend {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://${PROXYPASS_HOST}:${PROXYPASS_PORT};
    }
}
