chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab){
    
    

    let myURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAt81lOA3dFSY_DGBiWPD253989mlwanh0-y4woqInuNlqR_hpagdf6oGab2WZDXkqFJKyWHbpFkJF/pub?gid=2048388156&single=true&output=tsv"
    
    fetch(myURL).then(r => r.text()).then(result =>{
        
        var msg = result.split(/\r?\n/);


        console.log(msg);
        chrome.tabs.sendMessage(tab.id, msg)
    })



    
}

