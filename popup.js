var prefix = document.getElementById('prefix');
var sufix = document.getElementById('sufix');
var domain = document.getElementById('domain');
var output = document.getElementById('output');
var outputLast = document.getElementById('outputLast');
var copyLastEmail = document.getElementById('copyLastEmail');
var copy = document.getElementById('copy');
var hotKey = document.getElementById('hotKey');
var generateEmail = document.getElementById('gen');
var generatePhoneNum = document.getElementById('genPhone');
var outputPhone = document.getElementById('outputPhone');
var myNumber = document.getElementById('number');
var firstKey = "";
var secondKey = "";

hotKey.addEventListener('keydown', () => {
    if(hotKey.value.search(" ") > -1) {
        firstKey = hotKey.value.split(" ")[0];
        if (firstKey = "Control"){
            firstKey = 17;
        }
        hotKey.addEventListener('keydown', (e) => {
            secondKey = e.keyCode;
        })
    }
});

copy.addEventListener('click', () => {myForm.copyInput(output)});

var keyPressed = {};
document.addEventListener('keydown', (e) => {
    keyPressed[e.key] = {};
    keyPressed[e.key][e.keyCode] = true;
    if(keyPressed[e.key][firstKey] && keyPressed[e.key][secondKey]) {
        myForm.changeEmail(prefix.value, sufix.value, domain.value, output);
        myForm.saveToStorage(output);
        myForm.copyInput(output);
        myForm.getFromStorage();
    }
});
document.addEventListener('keyup', (e) => {
   keyPressed[e.key][e.keyCode] = false;
});

copyLastEmail.addEventListener('click', () => {myForm.copyInput(outputLast)});

generateEmail.addEventListener('click', () => {
    myForm.changeEmail(prefix.value, sufix.value, domain.value, output);
    myForm.saveToStorage(output);
    myForm.getFromStorage();
});

if(!myNumber.value)myNumber.value = 7;
generatePhoneNum.addEventListener('click', () => {
    myForm.generatePhone(myNumber.value, outputPhone);
    myForm.copyInput(outputPhone);
    myForm.saveToStorage(outputPhone);
});
