# Exemple de test unitaire express avec jest/supertest

- Installer jest et supertest `npm install --save-dev jest supertest`
- Bien séparer votre application avec un `app.js` et un `server.js`
  - Le `app.js` contient uniquement vos require à vos différents routeurs, définit votre application express, utilise `app.use(express.json)` et exporte le module app :
```javascript
const express = require('express');
const app = express();

app.use(express.json());

const bookController = require('./controller/books');
app.use('/books', bookController);
// Vos autres routers (users, reviews, etc..)

module.exports = app;
```
  - Le `server.js` contient uniquement l'exposition du serveur sur un port : <br>
```javascript
const app = require('./app');

app.listen(3000, () => {
    console.log('Server running on port 3000 !');
})
```

## Exemple d'écriture de test pour le controller/books.js
- Votre controller définit donc différentes routes (un GET /books, un POST /books, etc.)
- Il fait appel à votre logique métier (service)
- Le but du controller est d'uniquement vérifier la requête en entrée et de répondre en fonction de la requête et du retour du service

Un example de TU serait donc : 
```javascript
// current file : test/controller/books.test.js
const request = require('supertest'); // Ici on importe le module supertest au lieu de jest
const app = require('../../app'); // doit pointer vers votre module app exporté

describe('get books endpoint', () => { // Définit un bloc de test (ici tout ce qui concerne les appels GET
    test('should return collection of books', async () => { // ASYNC est obligatoire ici car on doit faire la requête en asynchrone
        const resp = await request(app).get('/books'); // Vous simulez un appel à votre /books en GET
        expect(resp.statusCode).toEqual(200); // Vous pouvez tester la réponse
    });

    test('should fail when book not found', async () => {
        const resp = await request(app).get('/books/10'); // Vous simulez un appell GET à /books/10
        expect(resp.statusCode).toEqual(404); // Vous pouvez tester la réponse, dans ce cas le livre n'existe pas donc un 404 est retourné
    });
});
```