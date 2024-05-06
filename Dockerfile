# from imagetag from docker hub
from node:20-alpine3.18 AS build
#specify work dir in the container 
workdir /usr/local/project
#install angular cli
run npm install -g @angular/cli
#copy package json 
copy package.json .
# install nodemodules 
run npm install --f 
copy . .
#build angular project 
run npm run build

FROM nginx:1.25.4

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/project/dist/lilibox-admin/browser /usr/share/nginx/html