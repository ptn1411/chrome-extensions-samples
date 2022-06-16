const requestSender = new XMLHttpRequest();

requestSender.onreadystatechange = apiHandler;

 function apiHandler(response) {

    if (requestSender.status === 200) {
        chrome.storage.local.set({'profile':JSON.stringify(response.target.response)},()=>{
            console.log(requestSender.status )
        })
    }
}

const username = window.location.href.split('/')[3];
requestSender.open('GET', `https://api.github.com/users/${username}`, true)
requestSender.send()