chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status==='loading' && changeInfo.url) {
    // Make a network call here
    // On the backend it will check the current session, check the websites,
    // check to see if the user is on task and then update accordingly
    var postUrl = "https://taskbee.byu.edu/index.php/checkWebsite";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    }
    request.open("POST", postUrl, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("url=" + changeInfo.url);
  }
});
