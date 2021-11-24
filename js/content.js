//// Default lists

// String List
let qqq = [
  "cat",
  "dog",
  "fox",
  "This is test link",
  "Visual experience composer",
  "Set Default URL",
];

var myString = [
  "cat",
  "dog",
  "fox",
  "This is test link",
  "Visual experience composer",
  "Set Default URL",
];

// Tag List
let myTagList = [
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "label",
  "a",
  "button",
  "textarea",
];
// Attribute List
let myAttributeList = ["aria-label", "placeholder"];

/// Messaging ////////////
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponce) {
  chrome.storage.local.get(["waspStringList"], function (result) {
    myString = result.key;
    console.log(result.key);
  });

  /*
	console.log(message);
	myStringW = [];

	for (let i = 0; i<message.length; i++){
		myStringW.push(message[i]);
	}

	chrome.storage.sync.set({key: myStringW}, function() {
		console.log(myStringW);
	  });
	
	  myString = myStringW;*/
}

////

//// Loop functions

function tagLister(taglist) {
  //Go through each tag from provided Tag List
  for (let i = 0; i < taglist.length; i++) {
    let collection = getAllElementByTag(taglist[i]);
    for (let k = 0; k < collection.length; k++) {
      stringCompare(myString, collection[k]);
    }
  }
}

function attributeLister(attributeList) {
  //Go through each tag that have provided Attibutes from Attribute List
  for (let i = 0; i < attributeList.length; i++) {
    let collection = document.querySelectorAll("[" + attributeList[i] + "]");

    for (let k = 0; k < collection.length; k++) {
      stringCompareAttribute(myString, collection[k], attributeList[i]);
    }
  }
}

function tagWrapper(element, className) {
  let parent = element.parentNode;
  let wrapper = document.createElement("span");
  wrapper.classList.add(className);

  if (parent.classList.contains(className)) {
    return;
  } else {
    //parent.replaceChild(wrapper,element);

    parent.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }
}

function stringCompare(stringlist, compareContent) {
  // Compare string from Strinbg List with Tag content

  for (let i = 0; i < stringlist.length; i++) {
    if (stringlist[i] == compareContent.innerHTML) {
      tagWrapper(compareContent, "alite_tag");
      //compareContent.classList.add('alite_tag');
    }
  }
}

function stringCompareAttribute(stringlist, compareContent, attributeName) {
  // Compare string from String List with Tag content that have Attribute

  for (let i = 0; i < stringlist.length; i++) {
    if (stringlist[i] == compareContent.getAttribute(attributeName)) {
      tagWrapper(compareContent, "alite_attibute");
      //compareContent.classList.add('alite_attibute');
    }
  }
}

function getAllElementByTag(tag_name) {
  // Collect all element that have Tag name
  let collection = document.getElementsByTagName(tag_name);
  return collection;
}

////

//// iFrames

function getAllIFrames() {
  let collection = document.querySelectorAll("iframe");

  return collection;
}

function getAllElementByTagFromIFrame(tagname, iframe) {
  let innerDoc = iframe.contentWindow || iframe.contentWindow.document;
  let tagCollection = innerDoc.querySelectorAll(tagname);

  return tagCollection;
}

function callShadowDOM(element) {
  let collection = document.querySelector(element);

  return collection;
}

////

//// Cleaners

function cleanCustomClasses(className) {
  let collection = document.querySelectorAll("." + className);

  for (let i = 0; i < collection.length; i++) {
    collection[i].classList.remove(className);
  }
}

////

//// Wasp runner

function runWasp() {
  cleanCustomClasses("alite_tag");
  cleanCustomClasses("alite_attibute");
  listUpdated();
  tagLister(myTagList);
  attributeLister(myAttributeList);
}

runWasp();

setInterval(function () {
  runWasp();
}, 2000);
/*setInterval(function () {
  listUpdated();
}, 10000);*/
/*setInterval(function () {
  console.log(myString);
}, 5000);*/

function listUpdated() {
  chrome.storage.sync.get(["waspStringList"], function (result) {
    myString = [];
    myString = result.waspStringList;
  });
}

////
