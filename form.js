myForm = {
    init () {
        window.addEventListener('input', this.saveToStorage.bind(this));
        document.addEventListener("DOMContentLoaded", this.getFromStorage);
    },

    changeEmail (prefix, sufix, domain, output) {
        let d = new Date();
        output.value = prefix + d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getHours() + '.' + d.getMinutes() + '.' + d.getSeconds() + '.' + Math.round(d.getMilliseconds()/1000*(10 - 1) + 1) + sufix + '@' + domain;
    },

    generatePhone (num, outputPhone) {
        let currentDate = new Date();
        let unixTime = Date.parse(new Date()).toString();
        let x = 0
        if (currentDate.getMilliseconds() > 99){
            x = '0.' + currentDate.getMilliseconds();
            x = Math.round(x * 100);
        } else if (currentDate.getMilliseconds() < 10) {
            x = '0' + currentDate.getMilliseconds();
        } else {
            x = currentDate.getMilliseconds();
        }
        let unixTimeWithMiliseconds = unixTime.slice(0, 11) + x;
        let extractNum = num - unixTimeWithMiliseconds.length;
        outputPhone.value = unixTimeWithMiliseconds.slice(-extractNum);
    },

    copyInput (input) {
        input.select();
        document.execCommand("Copy");
    },

    /*save input data to storage*/
    saveToStorage (input) {
        chrome.storage.sync.get('formData', function(obj){
            let save = {
                'formData': {
                    checkSentInput () {
                        if(input.srcElement !== undefined){
                            this[input.srcElement.name] = input.srcElement.value;
                            return input.srcElement.name;
                        } else {
                            this[input.name] = input.value;
                            return input.name;
                        }
                    },

                    getDataFromStorage () {
                        for(key in obj.formData){
                            if(key !== checkCurrentInput && key !== "getDataFromStorage" && key !== "checkSentInput"){
                                this[key] = obj.formData[key];
                            }
                        }
                    }
                }
            };
            let checkCurrentInput = save.formData.checkSentInput();
            save.formData.getDataFromStorage();
            chrome.storage.sync.set(save);
            console.log(save)
        });
    },

    /*get data from storage and fill input fields*/
    getFromStorage () {
        chrome.storage.sync.get('formData', function(obj){
            for(key in obj.formData){
                if(key && key !== "getDataFromStorage" && key !== "checkSentInput" && key !== "output")document.getElementById(key).value = obj.formData[key];
                if(key && key === "output")document.getElementById('outputLast').value = obj.formData[key];
            }
        });
    }
};

myForm.init();