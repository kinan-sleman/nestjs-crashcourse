### install slugify package to generate slug:
```json
npm i slugify
```
### CREATE ARTICLES ENTITY:
```json
npm run migration:generate --name=AddArticlesEntity
```
### Add Author Article Relationship:
```json
npm run migration:generate --name=AddAuthorArticleRelation
```
### Add default value for article description:
```json
npm run migration:generate --name=AddDefaultValueForArticleDescription
```
### Add default value for article body:
```json
npm run migration:generate --name=AddDefaultValueForArticleBody
```
### Add default value for article title:
```json
npm run migration:generate --name=AddDefaultValueForArticleTitle
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