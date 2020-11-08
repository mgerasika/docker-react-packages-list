image=docker-stg333
container=nestjs-docker333

docker build -t $image .
#docker stop $container
#docker rm $container
docker run --env PORT=5003 -d -p 3003:5003 --name $container $image
