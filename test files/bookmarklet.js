(function() {

  console.log("test");

  let paragraphs = document.getElementsByTagName("p");
	console.log(paragraphs);
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].innerHTML = 'csds';
  }

})();

