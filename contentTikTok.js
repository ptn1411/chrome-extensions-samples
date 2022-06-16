window.onload = () => {
    window.addEventListener("scroll", (event) => {
        setButtonDownload();
    });

    function setButtonDownload() {
        document.querySelectorAll("div").forEach((value, key) => {
            if (
                document
                    .querySelectorAll("div")
                    [key].className.includes("InfoContainer")
            ) {
                if (
                    !document
                        .querySelectorAll("div")
                        [key].innerText.includes("Download")
                ) {
                    const download = document.createElement("button");
                    download.textContent = " Download";
                    download.style.backgroundColor = "#f44336";
                    download.style.color = "white";
                    download.style.textAlign = "center";
                    download.style.textDecoration = "none";
                    download.style.display = "inline-block";
                    document.querySelectorAll("div")[key].prepend(download);
                    download.addEventListener("click", () => downloadVideo());
                }
            }
        });
    }

    setButtonDownload();
};

function downloadVideo() {
    let video = document.getElementsByTagName("video");
    let dodai = video.length;
    let url = `${video[dodai - 1].src}`;

    const arr = { download: url };
    getVideo(url);
    chrome.runtime.sendMessage({ payload: arr });
}
function getVideo(a) {
    fetch(a)
        .then((resp) => resp.blob())
        .then((blob) => {
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
