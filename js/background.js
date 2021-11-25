let Target = {
  name: "target",
  URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAt81lOA3dFSY_DGBiWPD253989mlwanh0-y4woqInuNlqR_hpagdf6oGab2WZDXkqFJKyWHbpFkJF/pub?gid=2048388156&single=true&output=tsv",
  status: "1",
};

let TestData = {
  name: "test data",
  URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6K757OpLLoz3LooGW531zWUGxaIWmTUkP5dqKrF166jP1XOzz-7l4n8IjkIw0ljBgWDY-5FVnGH83/pub?gid=1210195179&single=true&output=tsv",
  status: "1",
};

const projectList = [];
const totalStringList = [];

function addProject(project) {
  projectList.push(project);

  chrome.storage.sync.set({ projectListGlobal: projectList }, function (result) {
   
    console.log("qwe");
  });

}

function deleteProject(projectList, projectName) {
  for (let i = 0; i < projectList.length; i++) {
    if (projectList[i].name === projectName) {
      projectList.splice(i, 1);
    }
  }

  return projectList;
}

// Runner /////////////////////////////////////////////////////////////////////////////
addProject(Target);
addProject(TestData);

setInterval(function () {
  addStringListFromURL(Target.URL);
}, 300000); //1000 ms = 1 second.
/////////////////////////////////////////////////////////////////////////////

async function addStringListFromURL(URL) {
  try {
    let response = await fetch(URL);
    let data = await response.text();
    data = data.split(/\r?\n/);

    let asd = { q: "qwe" };

    chrome.storage.sync.set({ waspStringList: data }, function (result) {
      console.log("Pass");

      /*chrome.storage.sync.get(['waspStringList'],function(result){
     
    console.log(result.waspStringList);
    })*/
    });

    //  tempStorage.assign(asd);
  } catch (error) {
    console.log(error);
  }
}


function stringMerger(original, extend) {
  let result = [];
  for (let i = 0; i < extend.length; i++) {
    result.concat(addStringListFromURL(extend[i].URL));
  }

  return result;
}

function addToStringList(key, value) {}

function stringListCompiler(stringObject) {}

/*chrome.storage.sync.set({waspStringList: "qwe"}, function() {
    console.log("q")
});*/

chrome.storage.sync.get(["waspStringList"], function (result) {
  //QWE = result.waspStringList;
  //console.log(result.waspStringList);
});

/////////////////////////////////////////////////////////////////////////////
/*chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab){
    
    console.log("click");

    fetch(myURL).then(r => r.text()).then(result =>{
        
        var msg = result.split(/\r?\n/);

        
          
        console.log(msg);


        myStringW = [];

        for (let i = 0; i<msg.length; i++){
            myStringW.push(msg[i]);
        }

        chrome.storage.local.set({waspStringList: myStringW}, function() {
            console.log(myStringW);
          });

        chrome.tabs.sendMessage(tab.id, msg)

    })


   

    
	
	
	
    
}*/
/////////////////////////////////////////////////////////////////////////////
