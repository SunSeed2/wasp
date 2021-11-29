document.addEventListener("DOMContentLoaded", function () {
  // trigger when Loaded

  function addVisibilityOption() {
    // Add Show/Hide functions to navigation buttons
    let qq = document.querySelectorAll("[data-displayparent]");

    for (let i = 0; i < qq.length; i++) {
      qq[i].addEventListener("click", function () {
        let ee = document.querySelectorAll("section:not(.secHidden)");

        for (let j = 0; j < ee.length; j++) {
          ee[j].classList.add("secHidden");
        }
        let tt = "#" + qq[i].dataset.displayparent;

        let rr = document.getElementById(qq[i].dataset.displayparent);
        rr.classList.remove("secHidden");
      });
    }
  }

  addVisibilityOption(); // Trigger Navigations
  
});

var vGetCurrentStrings = document.getElementById("aGetCurrentStrings");
vGetCurrentStrings.addEventListener("click", function () {
  
  chrome.runtime.sendMessage({message: "getStringValue"}, (response) => {
    console.log(response.message);
  });
  /*chrome.storage.sync.get(["waspStringList"], function (result) {
    console.log(result.waspStringList);
  });*/
});


var vSyncStrings = document.getElementById("aSyncStrings");
vSyncStrings.addEventListener("click", function () {
  chrome.runtime.sendMessage({message: "syncProjects"}, (response) => {
    console.log(response.message);
  });
  /*chrome.storage.sync.get(["projectListGlobal"], function (result) {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.addStringListFromURL(result.projectListGlobal[0].URL);
  });*/
  
});


let projectList = [];
chrome.storage.sync.get(["projectListGlobal"], function (result) {
  projectList = result;  
  for(let i =0; i<projectList.projectListGlobal.length; i++){
    addProjectRow(projectList.projectListGlobal[i]);
    
  }

});
  
  
function addProjectRow(projectObject){
  let table = document.getElementById("projectTable");

  let row = document.createElement("div");
  let projectName = document.createElement("div");
  let projectStatus = document.createElement("div");
  let projectEdit = document.createElement("div");
  let projectDelete = document.createElement("div");
  
  row.classList.add("row");
  row.setAttribute('data-projectname', projectObject.name)

  projectName.classList.add("cell");  
  projectName.textContent = projectObject.name;

  projectStatus.classList.add("cell");  
  projectStatus.setAttribute('data-projectname', projectObject.name)
  if(projectObject.status === '1'){
    projectStatus.textContent = "ON";
  } else {
    projectStatus.textContent = "OFF";
  }
  

  projectEdit.classList.add("cell");  
  projectEdit.setAttribute('data-projectname', projectObject.name)
  projectEdit.innerHTML = ' <a href="#"> <img src="img/Edit_icon.svg" alt="Edit" height="16px" ></a>';

  projectDelete.classList.add("cell");  
  projectDelete.setAttribute('data-projectname', projectObject.name)
  projectDelete.innerHTML = ' <a href="#"><img src="img/icons8-delete-64.png" alt="Delete" height="16px" ></a>';

  row.appendChild(projectName);
  row.appendChild(projectStatus);
  row.appendChild(projectEdit);
  row.appendChild(projectDelete);
  

  projectEdit.addEventListener('click',function(){
    chrome.runtime.sendMessage({message: "getStringValue"}, (response) => {
      console.log(response.message);
    });
  })

  table.appendChild(row);

}
