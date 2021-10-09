FROM postgres:14-alpine3.14

COPY /tables/ /docker-entrypoint-initdb.d/tables/
COPY /seed/ /docker-entrypoint-initdb.d/seed/
COPY deploy_schemas.sql /docker-entrypoint-initdb.d/
