# Database Migration Commands

## New Package.json Scripts

```json
"dp:drop": "typeorm-ts-node-commonjs schema:drop -d src/ormconfig.ts",
"migration:generate": "typeorm-ts-node-commonjs migration:generate -d src/ormconfig.ts src/migrations/%npm_config_name%",
"migration:run": "typeorm-ts-node-commonjs migration:run -d src/ormconfig.ts"
```

## Usage
### Generate New Migration
```json
npm run migration:generate --name=CreateTagsAndUsers
```
### Run Migrations
```json
npm run migration:run
```
### Drop Database Schema
```json
npm run dp:drop
```
### Add created at column to tags table (you need to edit enity file first)
```json
npm run migration:generate --name=AddCreatedAtForTags
```

### For psql commands:
#### Open database:
```json
psql -U postgres -d blog
```
#### show all tables in database:
```json
\dt
```
#### show all columns in `users` table:
```json
\d users
```
#### show all columns in `tags` table:
```json
\d tags
```