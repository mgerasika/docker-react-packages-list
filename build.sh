image=docker-stg333
container=nestjs-docker333

docker build -t $image .
#docker stop $container
#docker rm $container
docker run --env PORT=5003 REACT_APP_CLIENT_ID=hello_world_234 -d -p 3003:5003 --name $container $image
