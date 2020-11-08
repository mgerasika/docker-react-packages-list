docker build -t docker-stg3 .
docker stop nestjs-docker3
docker rm nestjs-docker3
docker run --env PORT=5003 -d -p 3003:5003 --name nestjs-docker3 docker-stg3
