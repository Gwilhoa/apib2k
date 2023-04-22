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

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

{% endswagger-response %}
{% endswagger %}
