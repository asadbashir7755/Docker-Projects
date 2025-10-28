docker networking is important so that docker containers can communicate with each other

<!-- docker network types
1.host 
    your port is 80: docker port will be 80
2.default bridge 
    what is it?
3.user default bridge (custom)
    what is it?
4.none
    what is it?
5.MACVLAN  (docker swarm)
    WHAT  is it?

6.IPVLAN (docker swarm)
7.Overlay  (docker swarm)



commands
1.docker network ls
2.docker network create mycustomnetwork -d bridge
3.docker run -d --name mysql-container --network mycustomnetwork -e MYSQL_ROOT_PASSWORD=asad123 -e MYSQL_DATABASE=linksdb -p 3307:3306 mysqlclear


4. docker run -d --name two-tier-nodeapp --network mycustomnetwork -p 4000:4000 778cfac62966


for advance database
FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=asad123
ENV MYSQL_DATABASE=linksdb
COPY db.sql /docker-entrypoint-initdb.d/
