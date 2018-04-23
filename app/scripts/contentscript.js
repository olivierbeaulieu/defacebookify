// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

const MESSENGER_URL = 'https://www.messenger.com/';

function sendBackgroundMessage(message, callback) {
  chrome.runtime.sendMessage(message, {}, callback);
}

function isRedirectEnabled(callback) {
  sendBackgroundMessage({
    type: 'IS_REDIRECT_ENABLED',
  }, callback);
}


// Validate that we aren't in an iframe and that we are indeed on facebook.com
// The manifest enforces facebook already, but additional assurances can't hurt.
if (window.top === window.self && location.hostname === 'www.facebook.com') {
  isRedirectEnabled((isEnabled) => {
    if (isEnabled === true) {
      location.href = MESSENGER_URL;
    }
  });
}