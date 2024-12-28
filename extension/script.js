const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
const apiURL = 'http://localhost:3000';
let activeSite = null;
await fetch(apiURL + "/api/activeSite?site=" + tab.url).then(response => response.json()).then(data => {
    if(data.status === "success") {
        console.log(data);
        activeSite = true
    }else{
        activeSite = false
    }
});

if(activeSite){
    document.body.innerHTML = '<button id = "findExtensions">Click me</button>';
    document.getElementById('findExtensions').addEventListener('click', async () => {
        chrome.tabs.sendMessage(tab.id, {message: 'findExtensions', url: tab.url}, (response) => {
            
        });
    });
}else{
    document.body.innerHTML = '<h1>Site is not active</h1>';
}