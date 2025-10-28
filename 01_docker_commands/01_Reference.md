# 🚀 Docker & Node.js Quick Revision Guide

## 🧠 What is Docker?

Docker is a platform used to **build, package, and run applications** in isolated environments called **containers**. Containers include everything your app needs — code, runtime, libraries, and dependencies — ensuring consistent behavior across all systems.

### ✅ Why Use Docker?

* Ensures consistent environments (works the same on every system).
* Makes deployment faster and simpler.
* Isolates applications and dependencies.
* Easily scalable and portable.
* Integrates perfectly with CI/CD and DevOps workflows.

---

## 🧩 Common Docker Concepts

| Term               | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| **Image**          | A snapshot or blueprint used to create containers.                |
| **Container**      | A running instance of an image.                                   |
| **Dockerfile**     | A script with instructions to build an image.                     |
| **Volume**         | Used for persistent storage of data outside a container.          |
| **Network**        | Enables communication between containers.                         |
| **Docker Compose** | A tool to define and run multi-container applications using YAML. |

---

## 🧰 Common Docker Commands

| Command                              | Description                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| `docker build -t nodejs-app .`       | Builds a Docker image from Dockerfile in the current directory.                   |
| `docker run -d -p 3000:3000 imageid` | Runs a container in detached mode and maps port 3000 of host → 3000 of container. |
| `-d`                                 | Detached mode (runs container in background).                                     |
| `-p`                                 | Port mapping → `host_port:container_port`.                                        |
| `docker ps`                          | Shows running containers.                                                         |
| `docker ps -a`                       | Shows all containers (including stopped).                                         |
| `docker images`                      | Lists all Docker images.                                                          |
| `docker logs container-id`           | Displays logs of a running/stopped container.                                     |
| `docker attach container-id`         | Attach terminal to a running container.                                           |
| `docker exec -it container-id bash`  | Access container shell interactively.                                             |
| `docker stop container-id`           | Stops a running container.                                                        |
| `docker rm container-id`             | Removes a container.                                                              |
| `docker rmi image-id`                | Removes an image.                                                                 |
| `docker volume ls`                   | Lists all volumes.                                                                |
| `docker network ls`                  | Lists all networks.                                                               |
| `docker compose up -d --build`       | Builds and starts all services in background using docker-compose.yml.            |
| `docker compose down`                | Stops and removes containers, networks, and volumes created by Compose.           |

---

## 🌐 Docker Networking

**Networking is essential** so containers can communicate with each other.

### 🔹 Network Types

1. **Host Network**

   * Shares host’s network stack.
   * Example: if you expose port 80, it’s directly available on host port 80.
   * `docker run --network host nginx`

2. **Default Bridge Network**

   * Default network if none is specified.
   * Containers can communicate **via IP** but not by name.

3. **User-Defined Bridge (Custom Network)**

   * You create it manually, and containers can communicate **via container name**.
   * Example:

     ```bash
     docker network create mycustomnetwork -d bridge
     docker run -d --name mysql-container --network mycustomnetwork -e MYSQL_ROOT_PASSWORD=asad123 -e MYSQL_DATABASE=linksdb -p 3307:3306 mysql
     docker run -d --name nodeapp --network mycustomnetwork -p 4000:4000 nodeapp-image
     ```

4. **None Network**

   * Completely isolates the container (no network access).

5. **MACVLAN** *(Advanced / Docker Swarm)*

   * Assigns a **unique MAC address** to each container so it appears as a physical device on the LAN.

6. **IPVLAN** *(Advanced / Docker Swarm)*

   * Similar to MACVLAN but uses **shared MAC, different IPs**.

7. **Overlay Network** *(Used in Swarm or Kubernetes)*

   * Connects containers across multiple hosts.

---

## 🧱 Advanced Example (MySQL Dockerfile)

Used to **automatically create a database** and initialize it from SQL file:

```dockerfile
FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=asad123
ENV MYSQL_DATABASE=linksdb
COPY db.sql /docker-entrypoint-initdb.d/
```

Then run:

```bash
docker compose up -d --build
```

This builds and starts both app and DB with linked containers.

---

## 🧾 Node.js Quick Notes

### 🔹 When there are no logs in Node.js

Use **Morgan** for HTTP logging middleware:

```js
const morgan = require('morgan');
app.use(morgan('dev'));
```

### 🔹 Common Node.js Terms

| Term              | Description                                   |
| ----------------- | --------------------------------------------- |
| `express`         | Web framework for Node.js                     |
| `dotenv`          | Loads environment variables from `.env` file  |
| `morgan`          | Logs HTTP requests                            |
| `cors`            | Enables Cross-Origin Resource Sharing         |
| `nodemon`         | Automatically restarts server on file changes |
| `body-parser`     | Parses incoming request bodies                |
| `mysql2`          | MySQL client for Node.js                      |
| `express-session` | Manages user sessions                         |
| `cross-env`       | Sets environment variables across platforms   |
| `bcryptjs`        | Hashes passwords                              |

---

## 🧩 Docker Compose (Multi-Container Setup)

### Example:

```yaml
version: '3.8'
services:
  db:
    image: mysql:latest
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: asad123
      MYSQL_DATABASE: linksdb
    volumes:
      - mysql-data:/var/lib/mysql
    ports:
      - "3307:3306"

  nodeapp:
    build:
      context: .
    container_name: two-tier-nodeapp
    environment:
      DATABASE_HOST: db
      DATABASE_USER: root
      DATABASE_PASSWORD: asad123
      DATABASE_NAME: linksdb
      DATABASE_PORT: 3306
      PORT: 4000
    ports:
      - "4000:4000"
    depends_on:
      - db

volumes:
  mysql-data:
```

---

✅ **Summary**

* Use **Docker** to isolate and deploy apps consistently.
* Use **Docker Compose** to manage multi-container applications.
* Use **custom networks** for inter-container communication.
* Use **volumes** for persistent data.
* Use **health checks** and **restart policies** for production reliability.
