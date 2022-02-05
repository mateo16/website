---
title: Deploying lighting-fast Python microservices
description: Using FastAPI and Docker to seamlessly deploy ultra-fast, lightweight microservices.
author: Martin Zenzerovich
date: 2022-01-29 21:43:56
banner: /src/pages/posts/narwhal/narwhal.png
---

![Ironman](./narwhal.png)

What happens when a unicorn and a whale have a baby? We're not sure but we think we came close to finding out!

By combining [uvicorn](https://www.uvicorn.org/) with fdsfs...

## Making things right, one line at a time...

- Go to [Google](https://google.com/).
- Go [home](/).

## Sample code

Steal this at your own risk:

```bash
$ cat `ls` > echo .
```

Typescript:

```ts
interface Dog {
  age: number;
  bark: Function;
}
```

```yaml
title: Deploying lighting-fast Python microservices like it ain't no thang
author: Martin Z
date: 2018-01-29 21:43:56
```

Docker shit:

```dockerfile
FROM python:$PYTHON_VERSION-alpine AS builder-image

ARG APP_NAME=app

ENV POETRY_HOME=/opt/poetry \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1

# NOTE: uncomment this to install a specific Poetry version
# ENV POETRY_VERSION=1.1.12

ENV APP_PATH=/opt/$APP_NAME
ENV PATH=$POETRY_HOME/bin:$PATH

# install uvicorn dependencies (used to compile uvloop)
RUN apk update && \
    apk add \
      curl \
      make \
      g++

# install Poetry
```

And that's it!
