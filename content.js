window.onload = () => {

    const button = document.createElement('button');
    button.textContent = 'View profile';
    button.id = 'viewProfile';
    button.style.margin = "auto";
    button.style.display = "block";
    button.style.backgroundColor = "#21262d";

    document.querySelector('#js-pjax-container').prepend(button)


    button.addEventListener('click', () => viewProfile())
}

function viewProfile() {
    chrome.runtime.sendMessage({payload: 'viewProfile'})
}


