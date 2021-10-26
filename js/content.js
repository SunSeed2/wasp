let myString  = ["cat","dog","fox","This is test link"];

let myTagList = ["p","h1","h2","h3","h4","h5","label","a"];
let myAttributeList = ["aria-label","href"];



function tagLister(taglist){
	for(let i=0; i<taglist.length;i++)
		{
			
			let collection = getAllElementByTag(taglist[i]);
			for(let k=0;k<collection.length;k++){
				stringCompare(myString,collection[k]);
				
			}
			
		}
}

function attributeLister(attributeList){
	for(let i=0; i<attributeList.length;i++)
		{
			
			let collection = document.querySelectorAll('[' + attributeList[i] + ']');
			console.log(collection);
			for(let k=0;k<collection.length;k++){
				stringCompareAttribute(myString,collection[k],attributeList[i]);
				
			}
			
		}
}


function stringCompare(stringlist, compareContent){
	
	for(let i=0; i<stringlist.length;i++)
		{
			if(stringlist[i] == compareContent.innerHTML){
				
				compareContent.classList.add('alite_tag');
				
			}
		}

}

function stringCompareAttribute(stringlist, compareContent,attributeName){
	
	for(let i=0; i<stringlist.length;i++)
		{
			if(stringlist[i] == compareContent.getAttribute(attributeName)){
				
				compareContent.classList.add('alite_attibute');
				
			}
		}

}

function getAllElementByTag(tag_name){
	let collection  = document.getElementsByTagName(tag_name);
	return collection;
}

/////

tagLister(myTagList);
attributeLister(myAttributeList);
//stringCompare(myString,"fox");

// Add styles
//
//
//
let myStyles = document.createElement('link');
myStyles.href = '../css/content.css';
myStyles.rel = 'stylesheet';

document.body.appendChild(myStyles);
///////
