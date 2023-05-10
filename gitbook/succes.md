# Succès

{% swagger method="get" path="/achievement" baseUrl="https://api.bitume2000.fr/v2" summary="récupérer tout les succès" %}
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

{% swagger method="post" path="/achievement" baseUrl="https://api.bitume2000.fr/v2" summary="créer un succès" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="nom" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="desciption" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" %}

{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}

{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/achievement/id/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="récupérer un succès selon son id" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/achievement/id/{id}" baseUrl="https://api.bitume2000.fr/v2" summary="supprimer un succès" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access_token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}

{% endswagger-response %}
{% endswagger %}

