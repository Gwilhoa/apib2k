# Membres

{% swagger method="post" path="/members" baseUrl="https://api.bitume2000.fr/v2" summary="créer un membre au serveur" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="id" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="squad_id" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}

{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}

{% swagger-response status="409: Conflict" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/members" baseUrl="https://api.bitume2000.fr/v2" summary="récupérer tout les membres du serveur" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
[{
    "id": "54546464654",
    "name": "Harry Potter",
    "points": 395,
    "coins": 0,
    "title": "Hero",
    "memevotes": 3,
    "bestmeme": 0,
    "waifutime": "0",
    "squad": {
        "id": "651651651651",
        "name": "Gryffondor",
        "PointsGiven": 0,
        "PointsTotal": 3003493,
        "color": "-1671646"
    }
}, {
    "id": "543543543",
    "name": "Drago Malfoy",
    "points": 352985,
    "coins": 21,
    "title": "0",
    "memevotes": 3,
    "bestmeme": 0,
    "waifutime": "1678198359582",
    "squad": {
        "id": "56451515436546546546",
        "name": "serpentard",
        "PointsGiven": 0,
        "PointsTotal": 842703053,
        "color": "-14653804"
    }
}]
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
unauthorized
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/members" baseUrl="https://api.bitume2000.fr/v2" summary="supprimer un membre du serveur" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/members/id/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récuperer les informations d'un membre" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    "id": "151616116161651",
    "name": "Harry Potter",
    "points": 492629,
    "coins": 21,
    "title": "Hero",
    "memevotes": 3,
    "bestmeme": 3,
    "waifutime": "",
    "squad": {
        "id": "54554494494944",
        "name": "Gryffondor",
        "PointsGiven": 0,
        "PointsTotal": 842703448,
        "color": "-14653804"
    }
}
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/members/achievement/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récuperer les succès gagné par un membre" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
[{
    "id": 1,
    "name": "Bienvenu à poudlard",
    "description": "avoir mis un pied a l'école des sorciers",
    "coins": 0,
    "points": 1000,
    "title": "Apprenti sorcier",
    "hidden": false
}, {
    "id": 2,
    "name": "Wingardium leviosa",
    "description": "apprendre le sort",
    "coins": 0,
    "point": 1500,
    "hidden": false
}]
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/members/achievement/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="ajouter un succès à une personne" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="id" required="true" %}
achievement_id
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
[{
    "id": 1,
    "name": "Bienvenu à poudlard",
    "description": "avoir mis un pied a l'école des sorciers",
    "coins": 0,
    "points": 1000,
    "title": "Apprenti sorcier",
    "hidden": false
}, {
    "id": 2,
    "name": "Wingardium leviosa",
    "description": "apprendre le sort",
    "coins": 0,
    "point": 1500,
    "hidden": false
}]
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/members/points/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="modifier le nombres de point" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    "id": "151616116161651",
    "name": "Harry Potter",
    "points": 492629,
    "coins": 21,
    "title": "Hero",
    "memevotes": 3,
    "bestmeme": 3,
    "waifutime": "",
    "squad": {
        "id": "54554494494944",
        "name": "Gryffondor",
        "PointsGiven": 0,
        "PointsTotal": 842703448,
        "color": "-14653804"
    }
}
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}

{% swagger-response status="409: Conflict" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/members/coins/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="modifier le nombres de pièces" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    "id": "151616116161651",
    "name": "Harry Potter",
    "points": 492629,
    "coins": 21,
    "title": "Hero",
    "memevotes": 3,
    "bestmeme": 3,
    "waifutime": "",
    "squad": {
        "id": "54554494494944",
        "name": "Gryffondor",
        "PointsGiven": 0,
        "PointsTotal": 842703448,
        "color": "-14653804"
    }
}
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}

{% swagger-response status="409: Conflict" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/members/title/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récupérer les titres d'une personne" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
[{
    "id": 6,
    "name": "Hero"
}, {
    "id": 85,
    "name": "Quidditch Player"
}]
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/members/title/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="ajouter un titre à une personne" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}
```json
{
    "id": 6,
    "name": "Hero"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/members/memevote/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="utiliser un point super vote" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    supervote: 2
}
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/members/bestmeme/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="un nouveau super meme" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    bestmeme : 6
}
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/members/waifus/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récupérer les waifus d'un membre" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
[{
    "id": "1bf6fa74-17e3-481c-9c05-35ca9343c05e",
    "level": 0,
    "exp": 0,
    "rarety": 1,
    "waifu": {
        "id": 48,
        "name": "Mrs. Puff",
        "description": "elle est monitrice de permis dans les tréfond à Bikini Bottom",
        "origin": "Bob l'éponge",
        "rare": 1,
        "epic": 0,
        "legendary": 0
    }
}, {
    "id": "327c5bb8-112f-4bef-8a4f-022bbeb7d4ab",
    "level": 0,
    "exp": 0,
    "rarety": 0,
    "waifu": {
        "id": 499,
        "name": "Sibylle Trelawney",
        "description": "Sibylle Patricia Trelawney est le professeur de divination à Poudlard. On pourrait croire qu'elle n'a aucun don pour la divination mais au premier cours qu'elle a donné à la classe de Harry, elle a fait plusieurs prédictions qui se sont réalisées. Certaines prédictions qu'elle a faites se révèlent être d'une importance capitale. Elle est l'arrière-arrière-petite-fille de la grande voyante Cassandra Trelawney. Elle est l'auteur du livre Mes Yeux et comment voir au-delà d'eux",
        "origin": "Harry Potter",
        "rare": 0,
        "epic": 0,
        "legendary": 0
    }
}]
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/members/waifus/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="attraper une waifu " %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" required="true" name="authorization" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    "id": "1bf6fa74-17e3-481c-9c05-35ca9343c05e",
    "level": 0,
    "exp": 0,
    "rarety": 1,
    "waifu": {
        "id": 48,
        "name": "Mrs. Puff",
        "description": "elle est monitrice de permis dans les tréfond à Bikini Bottom",
        "origin": "Bob l'éponge",
        "rare": 1,
        "epic": 0,
        "legendary": 0
    }
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}

{% swagger-response status="425: Too Early" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/members/inventory/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récupérer l'inventaire d'une personne" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/members/inventory/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="ajouter un item a l'inventaire" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/members/id/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="changer le nom d'un member" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" %}
token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}
