# Docker Cleanup and Image Management Commands

### 1. System Pruning

* `docker system prune`
  Deletes all unused networks and containers.

* `docker system prune -a`
  Deletes all unused and hidden images as well.

* `docker system prune -a -f`
  Forcefully deletes all unused resources.

### 2. Image Management

* `docker images -aq`
  Displays all image IDs.

* `docker rmi <image_id>`
  Deletes a specific image (multiple IDs can be given at once).

* `docker rmi -f $(docker images -aq)`
  Removes all images at once.

* `docker image prune -a`
  Deletes all unused images.

### 3. Container Management

* `docker rm <container_id>`
  Removes a specific container.

* `docker container prune`
  Deletes all stopped/unused containers.

### 4. Volume Management

* `docker volume prune`
  Removes all unused volumes.

* `docker volume rm mysql-data`
  Deletes a specific volume.

* `docker volume rm -f mysql-data`
  Forcefully deletes a specific volume.

### 5. Network Management

* `docker network prune`
  Deletes all unused networks.

### 6. Disk Space Usage

* `docker system df`
  Checks how much disk space is consumed by images, containers, and cache.

### 7. Build and Compose

* `docker compose up -d --build`
  Forces Docker to rebuild images before starting containers.

* `sudo docker build -t multi-stage-node-app -f Docker_extra .`
  Builds an image using a specific Dockerfile (useful when multiple Dockerfiles exist).

### 8. Docker Hub Commands

* `docker login`
  Logs in to Docker Hub.

* `docker tag <local-image>:<tag> <dockerhub-username>/<repository-name>:<tag>`
  Tags an image for pushing to Docker Hub.

  Example:
  `docker tag myapp:latest asadbashir/myapp:latest`

* `docker push <dockerhub-username>/<repository-name>:<tag>`
  Pushes the tagged image to Docker Hub.

* `docker pull <dockerhub-username>/<repository-name>:<tag>`
  Pulls an image from Docker Hub.

---

## Additional Tips and Monitoring

### Pro Tips

* Use the following command during build for cleaner layers:
  `RUN npm install && npm cache clean --force`

* Use smaller base images like:
  `node:18-slim` or `gcr.io/distroless/nodejs`

* Docker removes an image **only if** no other image or container depends on its layers.

* **Do not** manually delete folders inside `/var/lib/docker/overlay2`. Doing so will corrupt Docker’s metadata and break containers.

### Monitoring Running Containers

* `nohup docker attach <container_id> &`
  Example: `nohup docker attach ca285a725c7a &`
  Runs the container in the background even after closing the terminal.

* `tail -f nohup.out`
  Continuously monitors logs of the attached container.

---

## Nginx Overview

**Nginx** is a high-performance web server that can also act as a **reverse proxy**, **load balancer**, and **HTTP cache**.

### Why Use Nginx?

* Handles multiple concurrent connections efficiently.
* Serves static content quickly.
* Commonly used as a reverse proxy for applications like Node.js.

### Reverse Proxy vs Forward Proxy

* **Reverse Proxy:**
  Acts on behalf of the **server**, forwarding client requests to backend servers. Example: Nginx handling requests for a Node.js app.

* **Forward Proxy:**
  Acts on behalf of the **client**, forwarding requests to the internet (e.g., used for filtering, caching, or hiding client identity).
