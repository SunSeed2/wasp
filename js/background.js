// JavaScript Document

let color = '#3aa757';

chrome.action.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.scripting.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});