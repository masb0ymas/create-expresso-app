# create-expresso-app

Simple generate starter backend with `expresso-typeorm` or `expresso-sequelize`, run a command like this :

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
SEQUELIZE_CONNECTION=postgres
SEQUELIZE_HOST=127.0.0.1
SEQUELIZE_PORT=5432
SEQUELIZE_DATABASE=your_database
SEQUELIZE_USERNAME=postgres
SEQUELIZE_PASSWORD=your_password
SEQUELIZE_SYNC=false
SEQUELIZE_TIMEZONE=Asia/Jakarta

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_password

STORAGE_ACCESS_KEY=your_access_key
STORAGE_SECRET_KEY=your_secret_key
STORAGE_BUCKET_NAME=your_bucket_name
STORAGE_REGION=ap-southeast-1
STORAGE_SIGN_EXPIRED=7d
```

for `expresso-typeorm` template database configuration like this :
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
```

and then,

```sh
yarn dev
```