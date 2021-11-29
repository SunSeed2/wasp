// Test data

let AEP = {
  name: "AEP",
  URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPDawiHeUO-CLD5sD7yjUPMA-OjubqnPT_eWPmSgm6vQLu_KVnv-K4KruinaLjdSGaGliKukCp1k8t/pub?gid=2058234248&single=true&output=tsv",
  status: "0",
  stringList: [],
};

let Analytics = {
  name: "Analytics",
  URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSC8-2jyH0VMDt5m7_X18o0L18ZjT_8b-BA3EDYBw-S7GH-HlCDOaHm_kuQfMpNbBDxMgK6_UlBPr6K/pub?gid=198003932&single=true&output=tsv",
  status: "1",
  stringList: [],
};

let Target = {
  name: "Target",
  URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAt81lOA3dFSY_DGBiWPD253989mlwanh0-y4woqInuNlqR_hpagdf6oGab2WZDXkqFJKyWHbpFkJF/pub?gid=2048388156&single=true&output=tsv",
  status: "1",
  stringList: [],
};

let TestData = {
  name: "Test Project",
  URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6K757OpLLoz3LooGW531zWUGxaIWmTUkP5dqKrF166jP1XOzz-7l4n8IjkIw0ljBgWDY-5FVnGH83/pub?gid=1210195179&single=true&output=tsv",
  status: "0",
  stringList: [],
};


// GLOBALS
const projectList = [];
let totalStringList = [];


// Project actions
function addProject(project) {
  projectList.push(project);
  refreshProjectListInSync();
  /*chrome.storage.sync.set(
    { projectListGlobal: projectList },
    function (result) {
      //console.log("qwe");
    }
  );*/
}

function deleteProject(projectList, projectName) {
  for (let i = 0; i < projectList.length; i++) {
    if (projectList[i].name === projectName) {
      projectList.splice(i, 1);
    }
  }
  refreshProjectListInSync();
  //return projectList;
}

function refreshProjectListInSync() {
  chrome.storage.sync.set(
    { projectListGlobal: projectList },
    function (result) {
      //console.log("qwe");
    }
  );
}


async function updateStringListInProject(projectQ) {
  try {
    let response = await fetch(projectQ.URL);
    let data = await response.text();
    data = data.split(/\r?\n/);
    projectQ.stringList = data;
    console.log(projectQ.name + " string list is updated.");
  } catch (error) {
    console.log(error);
  }
}

// Runner /////////////////////////////////////////////////////////////////////////////
addProject(AEP);
addProject(Analytics);
addProject(Target);
addProject(TestData);

//deleteProject(projectList, Target.name);

for (let b = 0; b < projectList.length; b++) {
  updateStringListInProject(projectList[b]);  
}




setInterval(function () {
  //addStringListFromURL(Target.URL);
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

function fullFillStringList() { //
  totalStringList = [];
  for (let b = 0; b < projectList.length; b++) {
    if (projectList[b].status === "1") {
      for (let n = 0; n < projectList[b].stringList.length; n++) {
        totalStringList.push(projectList[b].stringList[n]);
      }
    }
  }

  chrome.runtime.sendMessage({message: "stringListUpdated"}, (response) => {
    //console.log(response.message);
  });

}

function stringMerger(original, extend) {
  let result = [];
  for (let i = 0; i < extend.length; i++) {
    result.concat(addStringListFromURL(extend[i].URL));
  }

  return result;
}


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    
    switch(request.message){

      case "getStringValue":
        
        fullFillStringList() ;
        sendResponse({message: totalStringList});
      break;

      case "onlyStrings":
        sendResponse({message: totalStringList});
      break;

      case "syncProjects":
        for (let b = 0; b < projectList.length; b++) {
          updateStringListInProject(projectList[b]);  
        }
        sendResponse({message: "Synced in progress"});
      break;
        

      default:
        console.log("Message with no value");

      break;

      

    }

    
      
  });