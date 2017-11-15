document.addEventListener('DOMContentLoaded', () => {
    var prefix = document.getElementById('prefix');
    var sufix = document.getElementById('sufix');
    var domain = document.getElementById('domain');
    var output = document.getElementById('output');
    var outputLast = document.getElementById('outputLast');
    var copyLastEmail = document.getElementById('copyLastEmail');
    var copy = document.getElementById('copy');
    generateEmail = document.getElementById('gen');
    // var container = document.getElementById('container');
    getChanges();
    myFunction();
});

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
    copy.addEventListener('click', () => {
        copyEmail(output);
    });


    document.addEventListener('keydown', (e) => {
        if(e.ctrlKey && e.keyCode == 67) {
            changeEmail(prefix.value, sufix.value, domain.value, output);

        if(prefix.value && sufix.value && domain.value){
            saveChanges(prefix.value, sufix.value, domain.value, output.value);
        }
            copyEmail(output);
            getChanges();
        }
    });
    copyLastEmail.addEventListener('click', () => {
        copyEmail(outputLast);
    });
    generateEmail.addEventListener('click', () => {
        changeEmail(prefix.value, sufix.value, domain.value, output);
        //      copyEmail(output);
        if(prefix.value && sufix.value && domain.value){
             saveChanges(prefix.value, sufix.value, domain.value, output.value);
        }
    });
}


