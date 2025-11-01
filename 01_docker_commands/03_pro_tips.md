<!--
some pro tips
RUN npm install && npm cache clean --force


Use smaller base images like node:18-slim or gcr.io/distroless/nodejs

Docker removes the image only if no other image or container depends on its layers.

You should not manually remove folders from /var/lib/docker/overlay2 —
doing so corrupts Docker’s metadata and breaks containers.

 -->
nohup docker attach ca285a725c7a &

monitoring
tail -f nohup.out


nginx  what is this why use it

reverse proxy forward proxy mean

