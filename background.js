chrome.runtime.onInstalled.addListener(() => {
    console.log("Remove Adblock Thing installed.");
    checkForUpdate();
});

function checkForUpdate() {
    const scriptUrl = 'https://raw.githubusercontent.com/GuilhermeTiede/RemoveAdBlockThing/main/manifest.json';

    fetch(scriptUrl)
        .then(response => response.text())
        .then(data => {
            const match = data.match(/@version\s+(\d+\.\d+)/);
            if (!match) {
                console.error("Unable to extract version from the GitHub script.");
                return;
            }

            const githubVersion = parseFloat(match[1]);
            chrome.storage.local.get("scriptVersion", result => {
                const currentVersion = result.scriptVersion ? parseFloat(result.scriptVersion) : 0;

                if (githubVersion > currentVersion) {
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'icons/icon.png',
                        title: 'Remove Adblock Thing Update',
                        message: 'A new version is available. Please update your extension.'
                    });

                    chrome.storage.local.set({ scriptVersion: githubVersion });
                }
            });
        })
        .catch(error => {
            console.error("Error checking for updates:", error);
        });
}
