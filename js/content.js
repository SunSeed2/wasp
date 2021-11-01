//// Default lists

// String List
let myString  = ["cat","dog","fox","This is test link","Visual experience composer","Set Default URL"];

// Tag List
let myTagList = ["p","h1","h2","h3","h4","h5","label","a", "span","button"];
// Attribute List
let myAttributeList = ["aria-label"];

////

//// Loop functions

function tagLister(taglist){ //Go through each tag from provided Tag List
	for(let i=0; i<taglist.length;i++)
		{
			
			let collection = getAllElementByTag(taglist[i]);
			for(let k=0;k<collection.length;k++){
				stringCompare(myString,collection[k]);
				
			}
			
		}
}

function attributeLister(attributeList){ //Go through each tag that have provided Attibutes from Attribute List
	for(let i=0; i<attributeList.length;i++)
		{
			
			let collection = document.querySelectorAll('[' + attributeList[i] + ']');
			
			for(let k=0;k<collection.length;k++){
				stringCompareAttribute(myString,collection[k],attributeList[i]);
				
			}
			
		}
}

function stringCompare(stringlist, compareContent){ // Compare string from Strinbg List with Tag content
	
	for(let i=0; i<stringlist.length;i++)
		{
			if(stringlist[i] == compareContent.innerHTML){
				
				compareContent.classList.add('alite_tag');
				
			}
		}

}

function stringCompareAttribute(stringlist, compareContent,attributeName){ // Compare string from String List with Tag content that have Attribute
	
	for(let i=0; i<stringlist.length;i++)
		{
			if(stringlist[i] == compareContent.getAttribute(attributeName)){
				
				compareContent.classList.add('alite_attibute');
				
			}
		}

}

function getAllElementByTag(tag_name){ // Collect all element that have Tag name
	let collection  = document.getElementsByTagName(tag_name);
	return collection;
}

////


//// iFrames

function getAllIFrames(){
	let collection = document.querySelectorAll("iframe");

	return collection;
}

function getAllElementByTagFromIFrame(tagname, iframe){

	let innerDoc = iframe.contentWindow || iframe.contentWindow.document
	let tagCollection = innerDoc.querySelectorAll(tagname);

	return tagCollection;

}

function callShadowDOM(element){
	let collection = document.querySelector(element);

	return collection;
}

////

//// Cleaners

function cleanCustomClasses(className){
	let collection = document.querySelectorAll("." + className);

	for(let i=0; i<collection.length; i++){
		collection[i].classList.remove(className);
	}
	console.log("All " + collection.length + " classes are removed");
}

//// 

//// Wasp runner

function runWasp(){
	tagLister(myTagList);
	attributeLister(myAttributeList);
	//stringCompare(myString,"fox");
	//console.log("Wasp triggered");
}

runWasp();


setInterval(function(){runWasp()}, 2000);

////

//// Add styles

/*
let myStyles = document.createElement('link');
myStyles.href = '../css/content.css';
myStyles.rel = 'stylesheet';

document.body.appendChild(myStyles);
*/
////

