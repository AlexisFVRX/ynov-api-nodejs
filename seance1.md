# Séance 1 - Résumé

## Qu'est-ce qu'une API ?

Une API est une interface de programmation prévue par les développeurs afin de faciliter l'échange de données entre 2 applications.

Au sein de ce module, nous parlerons plutôt d'APIs web REST qui manipulent les données (en entrée / sortie) grâce au format JSON

## API Web ?

Grâce à une URI (URL + URN), nous identifions une ressource et nous pouvons effectuer des opérations (le plus souvent du CRUD).

### Paramètres URI

- https://mon-api.com/ = aucun paramètre
- https://mon-api.com/?id=1 = `query parameter` `id` qui vaut `1`
- https://mon-api.com/user/:id/ = https://mon-api.com/user/1/ = `path parameter` ìd` qui vaut `1`
- https://mon-api.com/user/:id/?fields=name = combinaison de `path parameter` et de `query parameter`

### Verbes HTTP
- GET = accéder à une ressource
- POST = créer une ressource
- PUT = remplacer/modifier une ressource
- PATCH = modifier une ressource
- DELETE = supprimer une ressource

### Codes de retours

https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP

- 2XX = tout s'est bien passé
  - 200 = OK
  - 201 = Created (la plupart du temps quand vous avez réussi à créer une ressource)
- 3XX = redirection
- 4XX = request errors
  - 404 = Not Found (page not found, ressource not found, etc.)
  - 400 = Bad request, vos paramètres ou votre body ne permettent pas d'effectuer l'opération. Si vous changez ces paramètres vous devriez réussir à obtenir une 2XX
  - 401 = Authentification nécessaire
  - 403 = Accès refusé (manque d'autorisation)
- 5XX = server errors
  - 500 = Server error (problème technique, votre serveur n'est plus en mesure de répondre)

## JSON ?

```json
{
  "property": "value",
  "boolean": true,
  "number": 0,
  "object": {
    "subProperty": "yes"
  },
  "array": [1, 2, 3],
  "arrayOfObjects": [
    {"id": 1, "title": "test"},
    {"id": 2, "tilte": "test2"}
  ]
}
```
Exemples de manipulation :
- $.property = "value"
- $.boolean = true
- $.object.subProperty = "yes"
- $.array.length = 3
- $.array[0] = 1
- $.arrayOfObjects.length = 2
- $.arrayOfObjects[0].id = 1

## Postman ?

- Outil qui permet d'exécuter des requêtes APIs sur des URI
- Une collection permet de stocker un ensemble de requêtes
- Permet d'exécuter du code avant et après les requêtes
- Permet d'exécuter des variables : d'environnement, de collection ou temporaires
- Permet de réaliser des tests d'API sur les retours obtenus et sur les paramètres d'entrée
- Permet de générer des exemples de code de votre requête