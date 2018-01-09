myForm = {
    init () {
        window.addEventListener('input', this.saveToStorage.bind(this));
        document.addEventListener("DOMContentLoaded", this.getFromStorage());
    },

	changeEmail (prefix, sufix, domain, output) {
	    var d = new Date();
	    output.value = prefix + d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getHours() + '.' + d.getMinutes() + '.' + d.getSeconds() + '.' + Math.round(d.getMilliseconds()/1000*(10 - 1) + 1) + sufix + '@' + domain;
	},

	copyInput (input) {
	    input.select();
	    document.execCommand("Copy");
	},

	/*save input data to storage*/
	saveToStorage (input) {
//	    console.log(input);
	    chrome.storage.sync.get('formData', function(obj){
            var save = {
                'formData': {
                    checkSentInput () {
                        if(input.srcElement !== undefined){
                            this[input.srcElement.name] = input.srcElement.value;
                            return input.name;
                        } else {
//                            console.log(this.input);
                            this[input.name] = input.value;
                            return input.name;
                        }
                    },

                    getDataFromStorage () {
                        for(key in obj.formData){
                            if(key !== checkCurrentInput && key !== "getDataFromStorage" && key !== "checkEvent"){
                                this[key] = obj.formData[key];
                            }
                        }
                    }
                }
            };
            var checkCurrentInput = save.formData.checkSentInput();
            save.formData.getDataFromStorage();
            chrome.storage.sync.set(save);
            console.log(save)
        });
	},

	/*get data from storage and fill input fields*/
	getFromStorage () {
	    chrome.storage.sync.get('formData', function(obj){
	        console.log(obj);
            for(key in obj.formData){
//                console.log(key);
                if(key !== "getDataFromStorage" && key !== "checkEvent" && key !== "output")document.getElementById(key).value = obj.formData[key];
                if(key === "output")document.getElementById('outputLast').value = obj.formData[key];
            }
	    });
	}
};

myForm.init();