myForm = {
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
	    chrome.storage.sync.get('formData', function(obj){
            var name = input.name;
            var save = {
                'formData': {
                    [name]: input.value,
                    getDataFromStorage () {
                        for(key in obj.formData){
                            if(key !== name && key !== 'getDataFromStorage') this[key] = obj.formData[key];
                        }
                    },
                }
            };
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
                console.log(key);
                if(key !== 'getDataFromStorage' && key !== 'output')document.getElementById(key).value = obj.formData[key];
                if(key !== 'getDataFromStorage' && key === 'output')document.getElementById('outputLast').value = obj.formData[key];
            }
	    });
	}
};

