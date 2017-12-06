document.addEventListener('DOMContentLoaded', () => {
    var prefix = document.getElementById('prefix');
    var sufix = document.getElementById('sufix');
    var domain = document.getElementById('domain');
    var output = document.getElementById('output');
    var outputLast = document.getElementById('outputLast');
    var copyLastEmail = document.getElementById('copyLastEmail');
    var copy = document.getElementById('copy');
    var hotKey = document.getElementById('hotKey');

    generateEmail = document.getElementById('gen');
    // var container = document.getElementById('container');
    getChanges();
});

var hotKeyArr = [
"ctrl",
"alt",
"shift"
]

var hotKeyCompArr = [
"Control",
"Alt",
"Shift"
]


function changeEmail(prefix, sufix, domain, output) {
    var d = new Date();
    output.value = prefix + d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getHours() + '.' + d.getMinutes() + '.' + d.getSeconds() + '.' + Math.round(d.getMilliseconds()/1000*(10 - 1) + 1) + sufix + '@' + domain;
}

function copyEmail (output){
    output.select();
    document.execCommand("Copy");
}

function getChanges() {
    chrome.storage.sync.get('emailSave', function (obj) {
        console.log(obj);
        document.getElementById('prefix').value = obj.emailSave.prefix;
        document.getElementById('sufix').value = obj.emailSave.sufix;
        document.getElementById('domain').value = obj.emailSave.domain;
        document.getElementById('outputLast').value = obj.emailSave.output;
    });
}

function saveChanges(prefix, sufix, domain, output){
    var save = {
        'emailSave': {
            'prefix': prefix,
            'sufix': sufix,
            'domain': domain,
            'output': output
        }
    };

    chrome.storage.sync.set(save);
}

window.onload = function () {
    var firstKey = "";
    var secondKey = "";
    var keyPressed = {};
    hotKey.addEventListener('input', () => {
//        console.log(firstKey);
        for(var i = 0; i < hotKeyArr.length; i++) {
            if(hotKey.value.indexOf(hotKeyArr[i]) > -1) {
                firstKey = hotKeyCompArr[i];
                console.log(firstKey);
                secondKey = hotKey.value.split(hotKeyArr[i] + " + ")[1];
                console.log(secondKey);
            }
        }
    });


    copy.addEventListener('click', () => {
        copyEmail(output);
    });


    document.addEventListener('keydown', (e) => {
        keyPressed[e.key] = true;
        if(keyPressed[firstKey] && keyPressed[secondKey]){
            changeEmail(prefix.value, sufix.value, domain.value, output);
            saveChanges(prefix.value, sufix.value, domain.value, output.value);
            copyEmail(output);
            getChanges();
        }
    }, false);
    document.addEventListener('keyup', (e) => {
       keyPressed[e.key] = false;
    }, false);



    copyLastEmail.addEventListener('click', () => {
        copyEmail(outputLast);
    });
    generateEmail.addEventListener('click', () => {
        changeEmail(prefix.value, sufix.value, domain.value, output);
        //      copyEmail(output);
        saveChanges(prefix.value, sufix.value, domain.value, output.value);
    });



}

