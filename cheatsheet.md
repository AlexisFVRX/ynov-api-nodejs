# Javascript/Node.JS CheatSheet

Le but de cette documentation est de vous fournir les ressources principales pour "être à l'aise sur Node.JS/JS"

## Javascript

### Variables

```javascript
const myVar = 0; // Number
let myVar1 = "0"; // String
var myObject = {
    "prop1": true // boolean
}; // object

myVar = 2; // ERROR, une variable const ne peut pas être ré-assignée
myVar1 = "2"; // Ok, String qui vaut "2"
myVar1 = 2; // Ok, changement de type de variable, Number qui vaut 2
```

```javascript
function testingLet() {
    let myVar = 0;
    if (myVar === 0) {
        let myVar = 1;
        console.log(myVar); // 1
    }
    console.log(myVar); // 0
}

function testingVar() {
    var myVar = 0;
    if (myVar === 0) {
        var myVar = 1;
        console.log(myVar); // 1
    }
    console.log(myVar); // 1
}
```

### Fonctions

```javascript
// définition
function name(param1, param2) {
    console.log(param1, param2);
}

// appel
name("a", "b"); // va afficher dans la console : "a, b";

// définition
function sum(param1, param2) {
    return param1 + param2;
}

// appel
sum(2, 2); // Retourne 4, mais n'affichera rien car le retour n'est pas utilisé
const result = sum(2, 2); // ici, result vaudra 4
console.log(result); // affichera 4

// différentes syntaxes similaires
const sum2 = (a, b) => { // Fonction nommée multilignes
    console.log('Je fais la somme');
    return a + b;
}
sum2(2, 2); // Affichera "Je fais la somme" mais vaudra 4

const sum3 = (a, b) => a+b; // Retourne automatiquement le resultat de l'expression, 1 LIGNE MAX
console.log(sum3(2, 2)); // 4
```

### Comparaisons

```javascript
const myVar = 2;
const myVar2 = "2";

console.log(myVar === myVar2); // => FALSE car myVar est de type Number alors que myVar2 est de type String
console.log(myVar == myVar2); // => VRAI
// L'opérateur === permet de vérifier le type ET la valeur
```

```javascript
function estMajeur(age) {
    let majeur = false; // ici j'utilise let car je veux changer l'état plus tard
    if (age >= 18) {
        majeur = true;
    } else {
        majeur = false;
    }
    return majeur;
}

// Version "switch" (généralement quand on doit tester plus de 3 cas, ne permet de comparer que l'égalité)
function estMajeur(age) {
    let majeur;
    switch (age) {
        case 18:
            majeur = true;
            break; // IMPORTANT
        case 19:
            majeur = true;
            break; // IMPORTANT
        default:
            majeur = false;
    }
    return majeur;
}

// Version "optimisée"
const estMajeur = (age) => age >= 18;
```

### Boucles

```javascript
for (let i = 0; i < 10; i++) {
    console.log(i); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}

const alphabet = ["A", "B", "C", "D"]; // Array
alphabet.forEach(letter => {
    console.log(letter); // Multilignes
});
alphabet.forEach(letter => console.log(letter)); // 1 seule ligne

const books = [{id: 1, title: "A"}, {id: 2, title: "B"}];
books.forEach(book => {
    console.log(book.id);
    console.log(book.title);
});
```

### Operations

```javascript
const myString = "test";
console.log(myString.length); // 4

const alphabet = ["A", "B", "C"];
console.log(alphabet.length); // 3

const object = {
    id: 1,
    prop: "test"
}

console.log(object.id); // 1
console.log(object.prop); // "test"
console.log(object.ok); // undefined
// Pour check si une propriété existe et est non null/undefined/false : 
if (object.ok) {
    console.log("ma propriété est définie");
} else {
    console.log("ma propriété n'était pas définie");
}
```

### Exports/Require

```javascript
// math.js
exports.sum = function(a, b) {
    return a + b;
}
exports.divide = (a, b) => a / b;

// index.js
const math = require('./math'); // Tout le module est importé
console.log(math.sum(2, 2)); // 4
console.log(math.divide(2 ,2)) // 1

const { sum, divide } = require('./math'); // Seules certaines fonctions sont importées
console.log(sum(2, 2)); // 4
console.log(divide(2, 2)); // 1
```

### Aysnchrone/synchrone/promesses

```javascript
const { sendMail } = require('sendmail'); // J'importe un module qui enverrait des mails
function envoiMail(destinataire, titre, contenu) {
    console.log('envoiMail');
    sendMail(destinataire, titre, contenu)
}

envoiMail("toto", "titre", "contenu");
console.log('suite');

/** Dans la console vous verrez : 
envoiMail
suite
**/
```
Ici le code est synchrone, il est exécuté de haut en bas et si la fonction envoiMail est bloquante ou sollicite trop le CPU, votre application sera bloquée.

```javascript
const { sendMailPromise } = require('sendmail'); // Mon module me fournit une promesse
function envoiMail(destinataire, titre, contenu) {
    sendMailPromise(destinataire, titre, contenu).then((resultat) => {
        console.log("Mon mail a été envoyé");
    }).catch((error) => {
        console.log("Mon mail n'a pas été envoyé");
    });
}

envoiMail("toto", "titre", "contenu");
console.log('suite');

/** Dans la console vous verrez : 
suite
Mon mail a été envoyé ou Mon mail n'a pas été envoyé

L'ordre ici n'est pas garanti, car vous appelez une fonction asynchrone et vous ne forcez pas l'attente du résultat
**/
```
Ici le code est asynchrone, votre coeur d'application continue de tourner (et parfois tourne avant) que votre envoi de mail ait été finit.

```javascript
const { sendMailPromise } = require('sendmail'); // Mon module me fournit une promesse

async function envoiMail(destinaire, titre, contenu) {
    const retour = await envoiMail(destinaire, titre, contenu);
    console.log(retour); // mon retour d'envoi de mail (vrai ou faux par exemple)
    
    const retour2 = envoiMail(destinaire, titre, contenu);
    console.log(retour2); // Promise <Pending OR Resolved>
}

envoiMail("toto", "titre", "contenu")
```

Ici, grâce au mot clé `await` je peux garantir l'ordre d'exécution de mes appels aysnchrones et attendre leur retour.  
Je ne peux utiliser ce mot clé que lorsque je suis dans une fonction préfixée `async`  
Aujourd'hui on préfère utiliser `async/await` que chainer les promesses avec les then/catch.  
Il est toujours possible de catch les erreurs d'un await, en l'entourant d'un block `try/cach`

## Node.JS

### Executer un fichier
`node file_name.js` dans votre terminal

### Initialiser un package.json
`npm init` dans le dossier de votre application

### Installer un module depuis npmjs
`npm install --save (ou --save-dev) module_name`  
Si vous aviez défini un package.json (via npm init), la dépendance sera enregistrée dedans