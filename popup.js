//function changeEmail(prefix, sufix, domain, output) {
//    var d = new Date();
//    output.value = prefix + d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getHours() + '.' + d.getMinutes() + '.' + d.getSeconds() + '.' + Math.round(d.getMilliseconds()/1000*(10 - 1) + 1) + sufix + '@' + domain;
//}
//
//function copyEmail (output){
//    output.select();
//    document.execCommand("Copy");
//}
//
//function getChanges() {
//    chrome.storage.sync.get('emailSave', function (obj) {
//        console.log(obj);
//        document.getElementById('prefix').value = obj.emailSave.prefix;
//        document.getElementById('sufix').value = obj.emailSave.sufix;
//        document.getElementById('domain').value = obj.emailSave.domain;
//        document.getElementById('outputLast').value = obj.emailSave.output;
//        document.getElementById('hotKey').value = obj.emailSave.hotKey;
//    });
//}
//
//function saveChanges(prefix, sufix, domain, output, hotKey){
//    var save = {
//        'emailSave': {
//            'prefix': prefix,
//            'sufix': sufix,
//            'domain': domain,
//            'output': output,
//            'hotKey': hotKey
//        }
//    };
//
//    chrome.storage.sync.set(save);
//}

var prefix = document.getElementById('prefix');
var sufix = document.getElementById('sufix');
var domain = document.getElementById('domain');
var output = document.getElementById('output');
var outputLast = document.getElementById('outputLast');
var copyLastEmail = document.getElementById('copyLastEmail');
var copy = document.getElementById('copy');
var hotKey = document.getElementById('hotKey');
var generateEmail = document.getElementById('gen');
//var title = document.getElementById('title');
// var container = document.getElementById('container');
myForm.getFromStorage();

console.log(prefix);
prefix.addEventListener('keyup', () => {
    myForm.saveToStorage(prefix);
});
sufix.addEventListener('keyup', () => {
    myForm.saveToStorage(sufix);
});
domain.addEventListener('keyup', () => {
    myForm.saveToStorage(domain);
});
hotKey.addEventListener('keyup', () => {
    myForm.saveToStorage(hotKey);
});

var firstKey = "";
var secondKey = "";
document.addEventListener('keydown', () => {
    if(hotKey.value.search(" ") > -1) {
        firstKey = hotKey.value.split(" ")[0];
        secondKey = hotKey.value.split( " ")[1];
    }
});

copy.addEventListener('click', () => {
    myForm.copyEmail(output);
});

var keyPressed = {};
document.addEventListener('keydown', (e) => {
    keyPressed[e.key] = true;
    if(keyPressed[firstKey] && keyPressed[secondKey]) {
        myForm.changeEmail(prefix.value, sufix.value, domain.value, output);
        myForm.saveToStorage(output);
        myForm.copyInput(output);
        myForm.getFromStorage();
    }
}, false);
document.addEventListener('keyup', (e) => {
   keyPressed[e.key] = false;
}, false);

copyLastEmail.addEventListener('click', () => {
    myForm.copyInput(outputLast);
});

generateEmail.addEventListener('click', () => {
    myForm.changeEmail(prefix.value, sufix.value, domain.value, output);
    //      copyEmail(output);
    myForm.saveToStorage(output);
    myForm.getFromStorage();
});

