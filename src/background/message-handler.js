import * as BrowserTabsList from './browser-tabs-list.js';
import copy from './clipboard-access.js';
import flashBadge from './badge.js';

function browserName() {
  // borrowed from https://stackoverflow.com/a/41820692

  // Opera 8.0+ (tested on Opera 42.0)
  const isOpera = (!!window.opr && !!opr.addons) || !!window.opera
                  || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+ (tested on Firefox 45 - 53)
  const isFirefox = typeof InstallTrigger !== 'undefined';

  // Internet Explorer 6-11
  //   Untested on IE (of course). Here because it shows some logic for isEdge.
  const isIE = /* @cc_on!@ */false || !!document.documentMode;

  // Edge 20+ (tested on Edge 38.14393.0.0)
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1+ (tested on Chrome 55.0.2883.87)
  // This does not work in an extension:
  // const isChrome = !!window.chrome && !!window.chrome.webstore;
  // The other browsers are trying to be more like Chrome, so picking
  // capabilities which are in Chrome, but not in others is a moving
  // target.  Just default to Chrome if none of the others is detected.
  const isChrome = !isOpera && !isFirefox && !isIE && !isEdge;

  // Blink engine detection (tested on Chrome 55.0.2883.87 and Opera 42.0)
  const isBlink = (isChrome || isOpera) && !!window.CSS;

  if (isOpera) {
    return 'Opera';
  } if (isFirefox) {
    return 'Firefox';
  } if (isIE) {
    return 'Internet Explorer';
  } if (isEdge) {
    return 'Edge';
  } if (isChrome) {
    return 'Google Chrome';
  } if (isBlink) {
    return 'Blink';
  }
  return 'browser';
}

async function handleAction(action) {
  /** @type {string} */
  let text;
  const thingsTaskTitle = `URL List from ${browserName()} (${new Date().toLocaleString()})`;

  switch (action) {
    case 'all-tabs-to-things': {
      text = await BrowserTabsList.allTabs();
      const thingsURL = `things:///add?show-quick-entry=true&title=${encodeURIComponent(thingsTaskTitle)}&notes=${encodeURIComponent(text)}`;
      chrome.tabs.update({ url: thingsURL });
      break;
    }

    case 'all-tabs-to-clipboard': {
      text = await BrowserTabsList.allTabs();
      await copy(text);
      break;
    }

    case 'highlighted-tabs-to-things': {
      text = await BrowserTabsList.highlightedTabs();
      const thingsURL = `things:///add?show-quick-entry=true&title=${encodeURIComponent(thingsTaskTitle)}&notes=${encodeURIComponent(text)}`;
      chrome.tabs.update({ url: thingsURL });
      break;
    }

    case 'highlighted-tabs-to-clipboard': {
      text = await BrowserTabsList.highlightedTabs();
      await copy(text);
      break;
    }

    default: {
      throw new TypeError(`Unknown action: ${action}`);
    }
  }

  return text;
}

export default async function messageHandler({ topic = '', params = {} }) {
  switch (topic) {
    case 'run-tabs-list': {
      try {
        await handleAction(params.action);
        await flashBadge('success');
        return true;
      } catch (e) {
        await flashBadge('fail');
        throw e;
      }
    }

    case 'badge': {
      return flashBadge(params.type);
    }

    default: {
      throw TypeError(`Unknown message topic '${topic}'`);
    }
  }
}
