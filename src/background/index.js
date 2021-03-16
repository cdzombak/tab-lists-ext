import messageHandler from './message-handler.js';

// listen to messages from popup
chrome.runtime.onMessage.addListener(async (message) => {
  await messageHandler(message);

  // To avoid an error related to port closed before response
  return true;
});
