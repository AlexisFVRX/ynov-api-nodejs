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
function sum(a, b) {
    console.log(`somme de ${a} + ${b}`);
    const retour = a + b;
    console.log(retour);
    return retour;
}

sum(2, 2); // 4 et affiche 'somme de 2 + 2' puis '4'
console.log('main');

/** Dans la console vous verrez : 
somme de 2 + 2
4
main
**/
```
Ici le code est synchrone, il est exécuté de "haut en bas"

```javascript
function sumPromise(a ,b) {
    return new Promise((resolve, reject) => {
        resolve(a+b);
    });
}

function sum2(a, b) {
    sumPromise(a, b).then((result) => {
        console.log(result); // a + b
    });
}

sum2(2, 2);
console.log('main');

/** Dans la console vous verrez : 
main
4

Votre programme continue de s'exécuter pendant que votre tâche asynchrone s'exécute, et son retour s'affiche donc après
**/
```

```javascript
function sumPromise(a ,b) {
    return new Promise((resolve, reject) => {
        resolve(a+b);
    });
}

async function sum2(a, b) {
    const retour = await sumPromise(2, 2);
    console.log(retour); // 4

    const retour2 = sumPromise(2, 2);
    console.log(retour2); // Promise { 4 }
}

sum2(2, 2);
console.log('main');

// La console retournera d'abord "main" puis "4" puis "Promise { 4 }"
```

- Ici, grâce au mot clé `await` je peux garantir l'ordre d'exécution de mes appels aysnchrones et attendre leur retour.  
- Je ne peux utiliser ce mot clé que lorsque je suis dans une fonction préfixée `async`  
- Aujourd'hui on préfère utiliser `async/await` que chainer les promesses avec les then/catch.  
- Il est toujours possible de catch les erreurs d'un await, en l'entourant d'un block `try/cach`  
- Une `async function` convertit toujours son retour en `Promise`

```javascript
async function sum(a, b) {
    console.log(`somme de ${a} + ${b}`);
    return a + b;
}

const entiers = [1, 2, 3];
entiers.forEach(async entier => {
    const retour = await sum(entier, entier);
    console.log(retour);
});
```
Ici, votre console, affichera d'abord toutes les 'somme de x + x', puis tous les résultats, même en utilisant `await` à cause de l'utilisation de `.forEach`

Si vous voulez conserver l'ordre, vous pouvez utiliser une boucle classique :
```javascript
async function sum(a, b) {
    console.log(`somme de ${a} + ${b}`);
    return a + b;
}

async function somme(entiers) {
    for (const index in entiers) {
        const entier = entiers[index];
        const retour = await sum(entier, entier);
        console.log(retour);
    }
}

const entiers = [1, 2, 3];
somme(entiers);

// somme de 1 + 1
// 2
// somme de 2 + 2
// 4
// somme de 3 + 3
// 6
```

Vous pouvez aussi utiliser `Promise.all` (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

## Node.JS

### Executer un fichier
`node file_name.js` dans votre terminal

### Initialiser un package.json
`npm init` dans le dossier de votre application

### Installer un module depuis npmjs
`npm install --save (ou --save-dev) module_name`  
Si vous aviez défini un package.json (via npm init), la dépendance sera enregistrée dedans