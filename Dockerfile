FROM nginx:stable

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/