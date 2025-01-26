window.addEventListener('DOMContentLoaded', () => {
    const website_address = document.getElementById("website_address");
    const options = document.getElementById("options_btn");
    const noWebsiteMsg = document.getElementById("no-website-msg");
    const blockButton = document.getElementById("block_btn");
    const blockCurrentButton = document.getElementById("block_current_btn");
    const listOfBlockedSites = document.getElementById("list_of_blocked_sites");

    options.addEventListener("click", () => {
        window.location.href = 'options.html';
    });

    // Lisää estettävä sivu
    async function setWebsites(url){
        let storedWebsites = await getStoredWebsites();
        if (!storedWebsites.includes(url)) {
            storedWebsites.push(url);
            chrome.storage.local.set({ websites: storedWebsites });
            return true; 
        } else return false
    }

    // Nouda estetyt sivut
    function getStoredWebsites() {
        return new Promise((resolve) => {
            chrome.storage.local.get(["websites"], (result) => {
                resolve(result.websites || []);
            });
        });
    }

    // Päivittää estettyjen sivujen listan popupissa
    async function initializeBlockedSites() {
        const storedWebsites = await getStoredWebsites();
        listOfBlockedSites.innerHTML = "";
            
        if (storedWebsites.length > 0) {
            noWebsiteMsg.style.display = "none";

            storedWebsites.forEach((website, index) => {
                const listItem = document.createElement("li");
                listItem.classList.add("list_item");

                const textSpan = document.createElement("span");
                textSpan.textContent = website;

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete_button");
                deleteButton.textContent = "❌";
                deleteButton.addEventListener("click", () => deleteWebsite(index));

                listItem.appendChild(textSpan);
                listItem.appendChild(deleteButton); 
                listOfBlockedSites.appendChild(listItem);
            });

            } else {
                noWebsiteMsg.style.display = "block";
            }
    };
        
        // Lisää estettävä sivu manuaalisesti
        blockButton.addEventListener("click", async () => {
            const url = website_address.value.trim();
            const added = await setWebsites(url);
            if (added) {
                initializeBlockedSites()
            }
            website_address.value = "";
        });

        // Lisää nykyinen välilehti estettäväksi
        blockCurrentButton.addEventListener("click", async () => {
            try {
                let [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
                const url = currentTab.url; 
                const added = await setWebsites(url);
                if (added) {
                    initializeBlockedSites();
                }
        } catch(error) {
            console.error(error);
        }
        });

        // Poistaa estetyn sivun listalta
        async function deleteWebsite(index) {
            const storedWebsites = await getStoredWebsites();
            storedWebsites.splice(index, 1);
            chrome.storage.local.set({ websites: storedWebsites });
            initializeBlockedSites();
        };
    
        initializeBlockedSites();
        
    }
);
