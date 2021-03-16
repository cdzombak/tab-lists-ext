function toList(theList) {
  return theList.join('\n\n');
}

function makeTabsList(tabs) {
  return toList(tabs.map((tab) => `${tab.title}\n${tab.url}`));
}

/**
 * @param {chrome.tabs.QueryInfo} query
 */
function queryTabs(query) {
  // optimistic -- user should have already granted 'tabs' permission on installation.
  return new Promise((resolve) => {
    chrome.tabs.query(query, resolve);
  });
}

export async function allTabs() {
  const tabs = await queryTabs({ currentWindow: true });
  return makeTabsList(tabs);
}

export async function highlightedTabs() {
  const tabs = await queryTabs({ currentWindow: true, highlighted: true });
  return makeTabsList(tabs);
}
