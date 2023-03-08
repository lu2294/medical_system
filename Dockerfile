FROM node:14.17.5-alpine as Base
ADD . webui 
RUN npm --prefix /webui/ install /webui/ --registry=http://10.21.142.86:80 \ 
   && cd /webui/plugins/graylogweb/packages/eslint-config-graylog \
    && npm install --registry=http://10.21.142.86:80 \
    && cd /webui/plugins/graylogweb/packages/graylog-web-plugin \
    && npm install --registry=http://10.21.142.86:80 \
    && npm run compile\
    && cd /webui/plugins/graylogweb \
    && npm install --registry=http://10.21.142.86:80 \
    && cd /webui/plugins/scenes/ \
    && npm install --registry=http://10.21.142.86:80 \
    && cd /webui/plugins/product/ \
    && npm install --registry=http://10.21.142.86:80 \
    && npm config set registry http://registry.npm.taobao.org/ \
    && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && cd /webui/ \
    && npm run build \
    && rm -rf node_modules \
    && cd /webui/plugins/scenes/ \
    && npm run build \
    && rm -rf node_modules \
    && cd /webui/plugins/product/ \
    && npm run build \  
    && rm -rf node_modules \
    && cd /webui/plugins/graylogweb \
    && npm run build \  
    && rm -rf node_modules \
    && cd /webui/plugins/graylogweb/packages/eslint-config-graylog \
    && rm -rf node_modules \
    && cd /webui/plugins/graylogweb/packages/graylog-web-plugin \
    && rm -rf node_modules \
    && npm cache clean -f
FROM nginx:1.23.1-alpine
COPY --from=Base /webui/ webui
ENV LANG C.UTF-8
WORKDIR /webui/
CMD ["nginx", "-g", "daemon off;"] 



