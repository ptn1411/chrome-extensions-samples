window.onload = () => {
    chrome.storage.local.get('profile', function (result) {
        if (result.profile) {
            const {name, avatar_url, location, public_repos, html_url} = JSON.parse(JSON.parse(result.profile));

            document.getElementById('root').innerHTML = `
            <h2 style="text-align:center">User Profile Card</h2>

<div class="card">
  <img src="${avatar_url}" alt="${name}" style="width:100%">
  <h1>${name}</h1>
  <p class="title">${location}</p>
  <p>Public repos: ${public_repos}</p>

  <p><button>${html_url}</button></p>
</div>
            `
        }

    });
    chrome.storage.local.get('video', function (result) {
        if (result.video) {
            document.getElementById('video').innerHTML = `

<div class="card">
<button id="myDownloadVideo">Download Video</button>
<video id="videoDownload" autoplay controls>
  <source src="${result.video}" type="video/mp4">
</video>
</div>
`
            const video = document.getElementById('videoDownload');
            video.volume = 0;
            const butonDownload = document.getElementById('myDownloadVideo');
            butonDownload.onclick = function myDownloadVideo() {
                fetch(result.video).then((resp) => resp.blob()).then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const b = document.createElement("a");
                    b.style.display = "none";
                    b.href = url;
                    b.setAttribute("download", "namdeptrai.mp4");
                    b.download = "namdeptrai.mp4";
                    document.body.appendChild(b);
                    b.click();
                    window.URL.revokeObjectURL(url);
                });
            }


        }

    });
    const file = document.getElementById('fileinput');

    function upload(file) {
        const reader = new FileReader()
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {

            const url = 'https://script.google.com/macros/s/AKfycbxhFCCy9P9YPZhQANX2dXvnie54mOB67VNM7DzDKRPMUoTw7j6xWWS36J_reu_96qv6/exec'
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: evt.target.result
            })
                .then(res => {
                    console.log(JSON.stringify(res))
                })
                .catch(e => console.error(e));
        }
        reader.onerror = function (evt) {
            console.log(evt)
            alert('error')
        }
    }

    const buttonFile = document.getElementById('fileinputButton');

    buttonFile.onclick = function () {
        upload(file.files[0])
    }
}