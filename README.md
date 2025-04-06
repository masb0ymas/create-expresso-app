# create-expressjs-starterkit

A simple CLI tool to generate Express.js starter backends with TypeORM or Sequelize.

## Quick Start

```sh
npx create-expressjs-starterkit my-app
cd my-app
```

## Configuration

1. Duplicate `.env.example` to `.env`
2. Configure your database and storage settings:

### For Sequelize Template

```sh
# Database Configuration
SEQUELIZE_CONNECTION=postgres
SEQUELIZE_HOST=127.0.0.1
SEQUELIZE_PORT=5432
SEQUELIZE_DATABASE=your_database
SEQUELIZE_USERNAME=postgres
SEQUELIZE_PASSWORD=your_password
SEQUELIZE_SYNC=false
SEQUELIZE_TIMEZONE=Asia/Jakarta

# Storage Configuration
STORAGE_ACCESS_KEY=your_access_key
STORAGE_SECRET_KEY=your_secret_key
STORAGE_BUCKET_NAME=your_bucket_name
STORAGE_REGION=ap-southeast-1
STORAGE_SIGN_EXPIRED=7d
```

### For TypeORM Template

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

## Development

Start the development server:

```sh
yarn dev
```
