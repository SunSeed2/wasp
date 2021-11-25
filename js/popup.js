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
  chrome.storage.sync.get(["waspStringList"], function (result) {
    console.log(result.waspStringList);
  });
});

/*var vSyncStrings = document.getElementById("aSyncStrings");
vSyncStrings.addEventListener("click", function () {});*/

var vSyncStrings = document.getElementById("aSyncStrings");
vSyncStrings.addEventListener("click", function () {
  /*let TestData = {
    name: "test data",
    URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6K757OpLLoz3LooGW531zWUGxaIWmTUkP5dqKrF166jP1XOzz-7l4n8IjkIw0ljBgWDY-5FVnGH83/pub?gid=1210195179&single=true&output=tsv",
    status: "1",
  };*/

  chrome.storage.sync.get(["projectListGlobal"], function (result) {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.addStringListFromURL(result.projectListGlobal[1].URL);
  });

  
});


  
  
  

