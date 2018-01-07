"use strict";

document.getElementById("avatar").addEventListener('click', (ev) => {
    document.forms["profilpic"].ppinput.click();
});

document.forms["profilpic"].ppinput.addEventListener('change', (ev) => {
    document.getElementById("modal-ppinput").classList.add("show", "active");
});

document.forms["profilpic"].addEventListener('submit', (ev) => {
    ev.preventDefault();

    let data = new FormData();

    if (document.forms["profilpic"].ppinput.files[0].size > 20 * 1024 * 1024) {
        alert("Error: This file is too heavy! 20MB maximum autorized.");
        return;
    }

    data.append("file", document.forms["profilpic"].ppinput.files[0]);

    let req = new XMLHttpRequest();

    req.open("POST", `/avatars/update?_csrf=${document.forms["profilpic"]._csrf.value}`, true);

    req.addEventListener('error', (err) => {}, false);

    req.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            var percentComplete = (e.loaded / e.total) * 100;
            document.getElementById("progress").value = percentComplete;
        }
    }, false);

    req.addEventListener('load', () => {
        switch (req.responseText) {
            case "done":
                alert("Upload of file '" + data.get("file").name + "' finished");
                break;
            case "FILETOOHEAVY":
                alert("Error: This file was too heavy!");
                break;
            case "INVALIDFILETYPE":
                alert("Error: Unvalid file type!");
                break;
        }
    }, false);

    req.send(data);
}, false);