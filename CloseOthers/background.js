function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

const menuItemParams = {
  id: "close_right",
  title: browser.i18n.getMessage("contextItemTitle"),
  contexts: ["tab"]
};
browser.contextMenus.create(menuItemParams, onCreated);

function closeTabs(tabs) {
    var ids = [];
    for (var tab of tabs) {
        if (!tab.pinned && !tab.highlighted) {
            ids.push(tab.id);
        }
    }
    if (ids.length > 0) {
        browser.tabs.remove(ids);
    }
}

browser.contextMenus.onClicked.addListener(function(info, sender) {
    var querying = browser.tabs.query({currentWindow: true});

    querying.then(closeTabs.bind(sender));
});