chrome.runtime.onInstalled.addListener(async () => {
    console.log('install done')
    // let url = chrome.runtime.getURL('options.html')
    // await chrome.tabs.create({'url': url});
});

chrome.runtime.onMessage.addListener(async (request, sender) => {

    if (request.payload === 'viewProfile') {
        let url = chrome.runtime.getURL('options.html')
        await chrome.tabs.create({'url': url});
    }
    if (request.payload.download) {
        chrome.storage.local.set({'video': request.payload.download}, () => {
            console.log('url')
        })
        // let url = chrome.runtime.getURL('options.html')
        // await chrome.tabs.create({'url': url});
    }

})

chrome.contextMenus.create({
    title: "View ",
    contexts: ["all"],
    id: "parent1",
});
chrome.contextMenus.create({
    title: "View Profile Github",
    contexts: ["all"],
    parentId: "parent1",
    id: "child1",
});
chrome.contextMenus.create({
    title: "Search Google",
    contexts: ["all"],
    parentId: "parent1",
    id: "child2",
});

chrome.contextMenus.create({
    title: "Search Instagram",
    contexts: ["all"],
    parentId: "parent1",
    id: "child3",
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
    if (tab) {
        if (info.menuItemId === "child1") {
            let url = chrome.runtime.getURL('options.html')
            await chrome.tabs.create({'url': url});
        }
        if (info.menuItemId === "child2") {
            let newURL = 'https://www.google.com/search?q=' + encodeURIComponent(info.selectionText);
            await chrome.tabs.create({url: newURL});
        }
        if (info.menuItemId === "child3") {
            let newURL = 'https://www.instagram.com/' + encodeURIComponent(info.selectionText);
            await chrome.tabs.create({url: newURL});
        }
    }
});

