<!-- 
docker system prune 
do delete all unused networks  containers

docker system prune -a
to delere all hidden ones also 

docker system prune -a -f
to delete all forcefully

docker rmi image id 
to delete specific image can give multiple ids at a time

docker images -aq 
to get all images id

if u wana remove all images at a time
docker rmi -f $(docker images -aq)

docker system df
to check how much space consumed by images containers cache 

docker rm containerid
 to remove specific container

 docker container prune
 to delere unused containers only 

 docker image prune -a 
 to remove all unused images 

 docker volume prune

 docker network prune

docker volume rm mysql-data

docker volume rm -f mysql-data


docker compose up -d --build 
to force build image again and then make container

docker login

docker tag <dockerhub-username>/<repository-name>:<tag>

docker tag myapp:latest asadbashir/myapp:latest


docker push 

docker pull

sudo docker build -t multi-stage-node-app -f Docker_extra .
when have multi docker files


