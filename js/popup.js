document.addEventListener("DOMContentLoaded", function () { // trigger when Loaded
  
	
	function addVisibilityOption() { // Add Show/Hide functions to navigation buttons 
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
