# User-Service app with Express

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
