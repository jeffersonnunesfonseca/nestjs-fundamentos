Versões para esse curso
node: v.18.0
npm: 9.5.1

mysql com docker:

```
docker run --name mysql-dev -d\
    -e MYSQL_ROOT_PASSWORD=1234 \
    -v .docker/dbdata:/var/lib/mysql \
    -p 3306:3306 \
    mysql
```

mysql no compose:
`docker-compose up -d db`
