const apiURL = 'http://localhost:3000';
const databaseURL = 'raw.githubusercontent.com/BrightTheBackpack/ketchup/refs/heads/main'
chrome.runtime.addListener(async (message, sender, sendResponse) => {
    if(message.message === 'findExtensions'){
        console.log('Message received');
       coupons(message)
    }
    return true
});

async function coupons(message){
    console.log('Message received');
    let siteID = null;
    let siteData = null;
    let couponData = null;
    await fetch(databaseURL + "/codes/00000_siteref.json").then(response => response.json()).then(data => {
       siteID = data[message.url]

    });
    await fetch(databaseURL + "/codes/" + siteID['File']).then(response => response.json()).then(data => {
        siteData = data['site']
        couponData = []
        for(coupon in data['coupons']){
            couponData.push(data['coupons'][coupon])
            //can probably skip this step somehow, i just added to sort the data :shrug:
        }
        for(i = 0; i < couponData.length; i++){
            if(couponData[i]['value'].includes('%')){
                //handle percentage amounts

            }else{
                //handle dollar amounts
            
        }

    });
    if(siteData['couponInputType'] === 'byID' && siteData['errorMessageType'] === 'byID'){
        for(coupon in couponData){
            document.getElementById(siteData['couponInputID']).value = couponData[coupon]['code']
            let error = document.getElementById(siteData['errorMessageID'])//itll probably (throw) an error if it doesn't exist, and it might change every time, i wonder how honey mangages it... probably using apis? i'll have to investigate
            if(error){
                continue
            }else{
                return
            }
        }
    }else if(siteData['couponInputType'] === 'relative' && siteData['errorMessageType'] === 'relative'){
       for(coupon in coupondData){
        document.getElementById(siteData['couponInputID']) //i forgot how to do htis
        
       }
    }

}