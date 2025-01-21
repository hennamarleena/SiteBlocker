chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(["websites"], (result) => {
        const websites = result.websites || [];

        const rules = websites.map((url, index) => ({
            id: index + 1,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: `*://${url}/*`,
                resourceTypes: ["main_frame"]
            }
        }));

        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: rules,
            removeRuleIds: []
        }, () => {
            if (chrome.runtime.lastError) {
                console.error("Virhe sääntöjen lisäämisessä:", chrome.runtime.lastError);
            } else {
                console.log("Säännöt lisätty onnistuneesti.");
            }
        }
    ) 
    });
});
