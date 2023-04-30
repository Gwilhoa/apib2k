# Authentification

{% swagger method="get" path="/auth/login" baseUrl="https://api.bitume2000.fr/v2" summary="" %}
{% swagger-description %}
permet d'avoir un token d'accès a l'API si vous etes developpeur vous aurez une clé de 1 jour 
{% endswagger-description %}

{% swagger-parameter in="body" name="password" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="username" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
  "message_code": "success",
  "token": "knsdfwsQSDSQDsqdQSdQSDsqDqsDqsDQSdQSDsqSdQSdqsDqsD"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```json
{
  "message_code": "user not found"
}
```
{% endswagger-response %}
{% endswagger %}
