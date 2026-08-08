# Docker Projects

Containerisation work that starts with a single Dockerfile and builds up to a
three tier app behind Nginx. Each folder goes a step further than the last.

Portfolio: [committodeploy.dev](https://committodeploy.dev)

## Layout

| Folder | What it covers |
|---|---|
| 01_docker_commands | Command reference: images, containers, networks, volumes, Compose |
| 02_java_project | Dockerising a Java app with a JDK base image |
| 03_nodejs_project_01 | Node.js Dockerfile with dependency layer caching |
| 04_two_tier_project | Node.js and MySQL on a user defined bridge network, database seeded on start |
| 05_three_tier_fyp | React, Express and a database behind Nginx, run with Compose |

## How it builds up

02 and 03 are single container builds. The Node example orders its layers so
`package.json` is copied and installed before the app source, which means
dependencies only reinstall when they actually change.

04 adds service to service networking. The app container reaches MySQL by service
name over a user defined bridge network instead of by IP. `Dockerfile.db` loads
the schema through `/docker-entrypoint-initdb.d/`, so the database comes up
already seeded.

05 is the full setup. Nginx sits in front and reverse proxies to the frontend and
the API, and the API talks to the database. This is the shape most web apps
actually run in.

## Running them

Two tier stack:

```bash
cd 04_two_tier_project
export MYSQL_ROOT_PASSWORD='pick-a-password'
docker compose up -d --build
docker compose ps
```

App on port 3000. MySQL is published on 3307 so it does not clash with a local
install.

Three tier stack:

```bash
cd 05_three_tier_fyp
docker compose up -d --build
```

Tear down including volumes:

```bash
docker compose down -v
```

## Configuration

Database credentials come from the environment. Set `MYSQL_ROOT_PASSWORD` before
running `docker compose up`. Nothing is hardcoded and no `.env` file is committed.

MySQL data is stored in `./volumes/mysql` through a bind mount, which is
gitignored.

## Tech stack

Docker, Docker Compose, user defined bridge networks, named and bind volumes,
Nginx, MySQL, Node.js, React
