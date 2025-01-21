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

    // Pushaa URL talteen localStorageen
    function setWebsites(url){
        let storedWebsites = getStoredWebsites();
        if (!storedWebsites.includes(url)) {
            storedWebsites.push(url);
            localStorage.setItem("website", JSON.stringify(storedWebsites));
        }
        return storedWebsites;
    }

    // Hae estetyt sivut localStoragesta
    function getStoredWebsites(){
        const storedWebsites = localStorage.getItem("website");
        return JSON.parse(storedWebsites) || [];
    }
   
    // Alustaa estettyjen sivujen näyttämisen
    function initializeBlockedSites() {
        const storedWebsites = getStoredWebsites();
        listOfBlockedSites.innerHTML = "";
            
        if (storedWebsites.length > 0) {
            noWebsiteMsg.style.display = "none";
            storedWebsites.forEach((website, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = website;
    
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.style.marginLeft = "5px"
                deleteButton.addEventListener("click", () => deleteWebsite(index));
    
                listItem.appendChild(deleteButton);
                listOfBlockedSites.appendChild(listItem);
                });
            } else {
                noWebsiteMsg.style.display = "block";
            }
    };
        
        // Lisää estettävä sivu manuaalisesti
        blockButton.addEventListener("click", () => {
            const url = website_address.value.trim();
            if (url) {
                setWebsites(url);
                initializeBlockedSites();
                website_address.value = "";
            }
        });

        // Lisää nykyinen välilehti estettäväksi
        blockCurrentButton.addEventListener("click", async () => {
            try {
                let queryOptions = { active: true, lastFocusedWindow: true };
                let [currentTab] = await chrome.tabs.query(queryOptions);
                const url = currentTab.url; 
                setWebsites(url);
                initializeBlockedSites();
        } catch(error) {
            console.error("Virhe aktiivisen välilehden URL:n käsittelyssä:", error);
        }
        });

        // Poistaa estetyn sivun listalta
        const deleteWebsite = (index) => {
            let storedWebsites = getStoredWebsites();
            storedWebsites.splice(index, 1);
            localStorage.setItem("website", JSON.stringify(storedWebsites));
            initializeBlockedSites();
        };
    
        initializeBlockedSites();
        
    }
);
