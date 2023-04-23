# Membres

{% swagger method="post" path="/members" baseUrl="https://api.bitume2000.fr/v2" summary="créer un membre au serveur" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}

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

{% swagger method="get" path="/members/id/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récuperer les informations d'un member" %}
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

{% swagger method="get" path="/members/achievement/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récuperer les succès gagné par quelqu'un" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" %}

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
