const address_input = document.getElementById("address_input")
const block = document.getElementById("block_btn")
const checkbox = document.getElementById("checkbox")
const save = document.getElementById("save")
const settings = document.getElementById("settings_btn")

settings.addEventListener("click", () => {
    window.location.href = 'settings.html';
})


block.addEventListener("click", () => {
    const blocked = address_input.value;
    chrome.storage.local.set({ blocked })
    console.log(blocked);
    address_input.value = "";
})

save.addEventListener("click", () => {
})

checkbox.addEventListener("change", () => {
})


let listContainer = document.createElement("p")
listContainer.id = "append-list"
document.body.appendChild(listContainer)


