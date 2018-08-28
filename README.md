#本项目所有的接口都有mock服务
host配置
127.0.0.1 hopex.com
127.0.0.1 localhost

##ngin配置

 server {
        listen       80;
        server_name  hopex.com;
        
        location ^~ /banners/ {
            proxy_pass http://192.168.70.131:5000;
        }

        location ^~ /mock/ {
         proxy_pass http://127.0.0.1:8000;
        }

        location / {
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection "upgrade";
         proxy_pass http://127.0.0.1:8000;
        }

    }
