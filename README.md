# Develop分支上是最新的代码，master分支不定期更新，本项目所有的接口都有mock服务,

## 重要文件
tradeview文件 /src/routes/Home/TradeChart.js   
websocket文件  /services/SocketClient.js

## host配置
127.0.0.1 hopex.com  
127.0.0.1 localhost

## nginx配置
```
 http {
     include       mime.types;
     default_type  application/octet-stream;
 
     access_log  logs/access.log;
 
     sendfile        on;
     #tcp_nopush     on;
 
     #keepalive_timeout  0;
     keepalive_timeout  65;
 
     gzip  on;
 
     server {
         listen       80;
         server_name  hopex.com;
 
         location ^~ /banners/ {
             proxy_pass http://192.168.70.131:5000;
         }
 
         location ^~ /mock/ {
          proxy_pass http://127.0.0.1:8000;
         }
 
         location ^~ /api/v1/country {
             proxy_pass http://192.168.70.131:5001;
           }
 
          location ^~ /api/v1/user/ {
          proxy_pass http://192.168.70.131:5001;
         }
 
         location ^~ /api/v1/gateway/ {
             proxy_pass http://192.168.70.131:5003;
             proxy_http_version 1.1;
             proxy_set_header   Upgrade $http_upgrade;
             proxy_set_header   Connection keep-alive;
             proxy_set_header   Host $host;
             proxy_cache_bypass $http_upgrade;
             proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header   X-Forwarded-Proto $scheme;
         }
 
 
         location ^~ /api/v1/ {
           proxy_pass http://192.168.70.131;
           # proxy_pass http://192.168.70.131:10020;
           # proxy_pass http://192.168.70.131:10020;
         }
 
         location ^~ /api/ {
           proxy_pass http://192.168.70.131:10020;
         }
 
         location / {
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "upgrade";
          proxy_pass http://127.0.0.1:8000;
         }
 
     }
 
     server {
         listen       80;
         server_name  me.com;
 
         location / {
             root C:/weixiaoyi/myproject/hopex/dist/;
             try_files $uri $uri/ /index.html =404;
         }
 
     }
```
## 预览
![avatar](http://p09oq805j.bkt.clouddn.com/hopex.png)

