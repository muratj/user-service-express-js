# User-Service app with Express

Tech stack:  
<img
  src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg"
  alt="JavaScript"
  width="20px"
/>
<img
  src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg"
  alt="NodeJS"
  width="20px"
/>
<img
  src="https://github.com/get-icon/geticon/raw/master/icons/express.svg"
  alt="Express"
  height="20px"
  style="background-color: #000"
/>
<img
  src="https://github.com/get-icon/geticon/raw/master/icons/postgresql.svg"
  alt="Postgresql"
  width="20px"
/>
<img
  src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg"
  alt="Docker"
  width="20px"
/>

## Pre-requisites

- nodejs v16
- Docker to run db in a container

---

## Folder structure

```text
user-service/
src/
|
+-api/
|  |
|  +-controllers/
|  +-middlewares/
|  +-models/
|  +-routes/
|  +-services/
+-configs/
+-index.js
.dev.env
.prod.env
```

> NOTE: framework implements cross-environment variables, to run `production` env you have to add `.prod.env` file (copy variables from `.dev.env`)

## Database

Stack: Postgres, Docker  
Config file path: `src/configs/db.config.js`

Setup:

1. make sure Docker up and running.
1. also make sure port 5432 not in use or update port in `.dev.env` if you want to run in different port  
    - bash `sudo lsof -i -P -n | grep LISTEN` prints all processes with port which are in use
    - `sudo lsof -i -P -n | grep 5432` prints process running on port 5432
    - `sudo kill -9 <PID>` force kill the process
1. run command `docker compose --env-file .dev.env up -d`

> Need to implement function craete table if not exists, for now create your own table based on models folder

## Framework

App entry file `src/index.js` constains only global level configurations and handles endpoints sending it to related route files  
`src/api/routes` handles routes parameters of the route and calls related method from controllers  
`src/api/controllers` hanles request and response and calls service methods if needed  
`src/api/services` business logic makes db request through models repository
`src/api/models` entity for database each file represents seperate entity extends `Repository.js`
`src/api/models/Repository.js` contains common methods to run `Insert, Select, Update, Delete` sql query to the DB
