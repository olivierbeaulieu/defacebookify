// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

const DISABLE_TIMEOUT = 5 * 60 * 1000;
let isRedirectEnabled = true;
let redirectDisabledTimeout = null;

// Enables the redirect, and cancels the timeout if there is one
function enableRedirect() {
  console.log('Redirection enabled.');

  clearTimeout(redirectDisabledTimeout);
  redirectDisabledTimeout = null;

  isRedirectEnabled = true;

  chrome.browserAction.setIcon({
    path: {
      '19': 'images/icon-19.png',
      '38': 'images/icon-38.png',
    },
  });
}

// Disables the redirect, and sets a timer to re-enable it automatically
function disableRedirectTemporarily() {
  console.log('Redirection disabled.');

  isRedirectEnabled = false;

  redirectDisabledTimeout = setTimeout(enableRedirect, DISABLE_TIMEOUT);

  chrome.browserAction.setIcon({
    path: {
      '19': 'images/icon-19-off.png',
      '38': 'images/icon-38-off.png',
    },
  });
}

// When the page action button is clicked, toggle the redirect
chrome.browserAction.onClicked.addListener(() => {
  if (isRedirectEnabled === true) {
    disableRedirectTemporarily();
  } else {
    enableRedirect();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse(isRedirectEnabled);
});