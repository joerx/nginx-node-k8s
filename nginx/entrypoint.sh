#!/bin/bash

set -e

# replace placeholders in nginx config file
envsubst "`printf '${%s} ' $(bash -c "compgen -A variable")`" < /vhost.tpl > /etc/nginx/conf.d/default.conf

exec "$@"
