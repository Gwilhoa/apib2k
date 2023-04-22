---
description: Les équipes du Bitume2000
---

# Escouades

{% swagger method="delete" path="/squads" baseUrl="https://api.bitume2000.fr/v2" summary="Supprimer une escouade" %}
{% swagger-description %}
Supprimer une escouade
{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
success
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}
unknown identifiant
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
unauthorized
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/squads" baseUrl="https://api.bitume2000.fr/v2" summary="Récuperer toutes les escouades" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
key_access
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
[
    {
    "id": "8646111351351351355135135",
    "name":"Gryffondor",
    "ManualPoint":0,
    "PointsTotal":2985598,
    "color":"-1671646"
    },
    {
    "id":"101376630915623323654543",
    "name":"Serpentard",
    "ManualPoint":0,
    "PointsTotal":1169995,
    "color":"-14653804"
    },
    {
    "id":"101376646320464289713544",
    "name":"Poufsouffle",
    "ManualPoint":0,
    "PointsTotal":2407577,
    "color":"-4201231"
    }
]
```


{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="bad authorization" %}
unauthorized
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/squads" baseUrl="https://api.bitume2000.fr/v2" summary="créer une escouade" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
key_access
{% endswagger-parameter %}

{% swagger-parameter in="body" name="id" type="String" required="true" %}
identifiants de l'ecouade :&#x20;

lié a un role discord
{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
nom de l'escouade
{% endswagger-parameter %}

{% swagger-parameter in="body" name="color" type="String" %}
couleur de l'escouade (défaut : noir)
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}
```json
{
    "id":"101376646320464289713544",
    "name":"Poufsouffle",
    "ManualPoint":0,
    "PointsTotal":0,
    "color":"-4201231",
    "members":[]
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="les informations attendue sont pas bonne" %}
invalid argument
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="bad authorization" %}
unauthorized
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/squads/id/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="Récuperer une escouade selon son identifiants" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
key_access
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    "id": "8646111351351351355135135",
    "name":"Gryffondor",
    "ManualPoint":0,
    "PointsTotal":2985598,
    "members":[],
    "color":"-1671646"
}
```
{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}
Unknown Identitfiant
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="bad authorization" %}
unauthorized
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/squads/id/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="donner / enlever des points manuel à une escouade" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" type="String" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="points" type="Number" required="true" %}
adding number
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
    "id":"101376646320464289713544",
    "name":"Poufsouffle",
    "ManualPoint":10,
    "PointsTotal":0,
    "color":"-4201231",
    "members":[]
}
```


{% endswagger-response %}

{% swagger-response status="204: No Content" description="" %}
Unknown Identifiant
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
invalid argument / number format exception
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
unauthorized
{% endswagger-response %}
{% endswagger %}
