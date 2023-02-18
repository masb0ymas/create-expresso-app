# create-expresso-app

Simple generate starter backend with expresso-typeorm or expresso-sequelize, run a command like this :

```sh
npx create-expresso-app my-app
```

Next step

```sh
cd my-app
```

Duplicate .env.example to .env

Customize `Database`, `Redis`, and `Storage` provider configurations, example :

```sh
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=127.0.0.1
TYPEORM_PORT=5432
TYPEORM_DATABASE=your_database
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=your_password
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
TYPEORM_MIGRATIONS_RUN=true

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_password

STORAGE_ACCESS_KEY=your_access_key
STORAGE_SECRET_KEY=your_secret_key
STORAGE_BUCKET_NAME=your_bucket_name
STORAGE_REGION=ap-southeast-1
STORAGE_SIGN_EXPIRED=7d
```

and then,

```sh
yarn dev
```