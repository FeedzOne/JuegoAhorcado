const words = ["CASA", "JUEGO", "AHORCADO", "MANZANA", "HELICOPTERO", "GANAR", "DIVERSION", "DESAFIO", "ALURA", "ORACLE", "JAVASCRIPT", "HTML", "ORNITORRINCO", "ESTERNOCLEIDOMASTOIDEO"];
const word = words[Math.floor(Math.random()*words.length)];
let wordWithUnderscore = word.replace(/./g, "_ ");
const gameOver = "Fin del juego"
const winner = "Ganaste, felicidades!!"
const info = "No son admitidas letras en minúsculas, numeros, ni caracteres especiales.";
const addError = "No se puede agregar la palabra, porque no es mayor a 2 caracteres, menor a 25 o no está escrita en mayusculas."
const addSuccess = "La palabra se agregó correctamente."

var imgArray = ["img/ahorcado1.png", "img/ahorcado2.png", "img/ahorcado3.png",  "img/ahorcado4.png", "img/ahorcado5.png", "img/ahorcado6.png", "img/ahorcado7.png"];
var errors = 0;
var incorrectLetters = [];

String.prototype.replaceAt=function(index, character) { return this.substr(0, index) + character + this.substr(index+character.length); }  

function validatecharacters (texttovalidate) {
    var allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //<--criterios de aceptación de la cadena de caracteres.
    if(texttovalidate.length == 1) {
        var validcharacter = false;
        for (var j = 0; j < allowed.length; j++) {
            if (texttovalidate[0] == allowed[j]) {
                validcharacter = true;
                break;
            }
        }
        if (validcharacter == false) {
            return false;
        } 
    }else{
        return validcharacter = false;
    }
    return true;
} 


function validateString (texttovalidate) {
    var allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //<--criterios de aceptación de la cadena de caracteres.
    if(texttovalidate.length < 25 && texttovalidate.length > 1){
         for (var i = 0; i < texttovalidate.length; i++) {

        var validcharacter = false;
        for (var j = 0; j < allowed.length; j++) {
            if (texttovalidate[i] == allowed[j]) {
                validcharacter = true;
                break;
            }
        }
        if (validcharacter == false) {
            return false;
        } 
    }
    return true;
    }
   
} 

function alertGameOver(){
    Swal.fire({
        icon: 'error',
        title: "<h5 style='color:red'>" + gameOver + "</h5>",
        text: 'La palabra secreta era: ' + word + '!!', 
        showDenyButton: true,
        confirmButtonText: 'Jugar de Nuevo',
        denyButtonText: 'Salir',
        footer: 'Intenta de nuevo!',
      }).then((result) => { 
        if(result .isConfirmed){
            restart();
        }else if(result.isDenied){
            Swal.fire('Entendido!', '', 'Gracias por Jugar')
        }

      })
}

function addingError(){
    Swal.fire({
        icon: 'warning',
        title: "<h5 style='color:red'>" + "No se puede agregar" + "</h5>",
        text: 'Ooooops' + addError + '!!', 
        confirmButtonText: 'Aceptar',
        footer: 'Intenta de nuevo!',
      })
}

function addingSuccess(){
    Swal.fire({
        icon: 'success',
        title: "<h5 style='color:green'>" + addSuccess + "</h5>",
        text: 'La palabra ' + addWord + "fué agregada.", 
        confirmButtonText: 'Aceptar',
      })
}

function alertWin(){
    Swal.fire({
        icon: 'success',
        title: "<h5 style='color:green'>" + winner + "</h5>",
        text: 'Adivinaste la palabra secreta!!', 
        confirmButtonText: 'Aceptar',
      })
}

function alertInfo(){
    Swal.fire({
        icon: 'info',
        title: "<h5 style='color:yellow'>" + info + "</h5>",
        confirmButtonText: 'Aceptar',
      })
}

function play(){
    var count = 0;
    var letter = document.querySelector('#tryLetter').value;
    if(validatecharacters(letter) == true){
        for(const i in word){
            if(letter == word[i]){
                wordWithUnderscore = wordWithUnderscore.replaceAt(i*2, letter);
                count = 1;
                document.getElementById("tryLetter").value = "";
            }
        }
        if(count == 0){
            if(incorrectLetters.indexOf(letter) == -1){
                incorrectLetters.push(letter);
            }
            errors = errors+1;
            changeImage(errors);
            document.getElementById("incorrectLetters").innerHTML = incorrectLetters.toString();
            document.getElementById("tryLetter").value = "";

        }
        document.getElementById("underscoreWord").innerHTML = wordWithUnderscore;
    }
    else{
        alertInfo();
        document.getElementById("tryLetter").value = "";
    }
    checkforwin();   
}

function changeImage(errors){
    var myImage = document.getElementById('mainImage');
    myImage.setAttribute("src", imgArray[errors]);
}

function checkforwin(){
    let a = wordWithUnderscore.toString();
    c = a.replace(/\s+/g, '');
    let b = word.toString();
    result = c.localeCompare(b);
    if(errors < 6){
        if(result == 0){
        alertWin();
        }
    }
    else{
        alertGameOver();
        document.getElementById("underscoreWord").innerHTML = word;
    }
}

function restart(){
    location.replace("game.html")
}


function startGame(){
    location.replace("game.html")
}

function addWord(){
    var newWord = document.querySelector('#addWord').value;
    var result = validateString(newWord);
    if(result == true){
        words.push(newWord);
        Swal.fire({
            icon: 'success',
            title: "<h5 style='color:green'>" + addSuccess + "</h5>",
            text: 'La palabra ' + newWord + " fué agregada.", 
            confirmButtonText: 'Aceptar',
          })
        document.getElementById("addWord").value = "";
    }
    else{
        Swal.fire({
            icon: 'warning',
            title: "<h5 style='color:red'>" + "No se puede agregar" + "</h5>",
            text: 'Ooooops, ' + addError + '!!', 
            confirmButtonText: 'Aceptar',
            footer: 'Intenta de nuevo!',
          })
        document.getElementById("addWord").value = "";
    }
}

function gotohomepage(){
    location.replace("index.html")
}