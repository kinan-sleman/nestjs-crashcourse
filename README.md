### ADD USERS FAVORITES RELATION:
```json
npm run migration:generate --name=AddUserFavoritesRelation
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