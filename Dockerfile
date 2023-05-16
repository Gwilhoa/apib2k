# Utilisation de l'image officielle MariaDB
FROM mariadb:latest

COPY ./my_webapp.sql /docker-entrypoint-initdb.d/
# Configuration des variables d'environnement
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=my_webapp
ENV MYSQL_USER=my_webapp
ENV MYSQL_PASSWORD=bqhFseCF7tOkjco5K9V97h35

# Copie du fichier SQL contenant les commandes de création de la base de données et des tables

# Exposition du port 3306
EXPOSE 3306
