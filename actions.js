window.addEventListener('DOMContentLoaded', () => {
    const website_address = document.getElementById("website_address");
    const options = document.getElementById("options_btn");
    const noWebsiteMsg = document.getElementById("no-website-msg");
    const blockButton = document.getElementById("block_btn");
    const listOfBlockedSites = document.getElementById("list_of_blocked_sites");

    options.addEventListener("click", () => {
        window.location.href = 'options.html';
    });

    // pushaa
    function setWebsites(url){
        let storedWebsites = localStorage.getItem("website");
        storedWebsites = storedWebsites ? JSON.parse(storedWebsites) : [];
        storedWebsites.push(url);
        localStorage.setItem("website", JSON.stringify(storedWebsites));
        return storedWebsites;
    }

    // noutaa
    function getStoredWebsites(){
        const storedWebsites = localStorage.getItem("website");
        return JSON.parse(storedWebsites) || [];
    }
   
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
                deleteButton.addEventListener("click", () => deleteWebsite(index));
    
                listItem.appendChild(deleteButton);
                listOfBlockedSites.appendChild(listItem);
                });
            } else {
                noWebsiteMsg.style.display = "block";
            }
    };
    
        blockButton.addEventListener("click", () => {
            const url = website_address.value.trim();
            if (url) {
                chrome.storage.local.set({ url });
                setWebsites(url);
                initializeBlockedSites();
                website_address.value = "";
            }
        });
    
        const deleteWebsite = (index) => {
            let storedWebsites = getStoredWebsites();
            storedWebsites.splice(index, 1);
            localStorage.setItem("website", JSON.stringify(storedWebsites));
            initializeBlockedSites();
        };
    
        initializeBlockedSites();
    }
);

