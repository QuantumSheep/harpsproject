"use strict";

const acceptedType = [
    "jpg",
    "jpeg",
    "png"
];
let cropper;

function editPicture() {
    let reader = new FileReader();

    if (cropper) cropper.destroy();

    reader.onload = (ev) => {
        Modal.open(document.getElementById("modal-ppinput"));

        document.getElementById("imagecropper").setAttribute("src", ev.target.result);

        cropper = new Cropper(document.getElementById("imagecropper"), {
            aspectRatio: 1,
            dragMode: 'none',
            multiple: false,
            dashed: false,
            viewMode: 1,
            zoomable: 0
        });
    };

    reader.readAsDataURL(document.forms["profilpic"].ppinput.files[0]);
}

document.getElementById("avatar-upload").addEventListener('click', (e) => {
    document.forms["profilpic"].ppinput.click();
});

document.forms["profilpic"].ppinput.addEventListener('change', (e) => {
    editPicture();
}, false);

document.getElementById("avatar-upload").addEventListener('dragenter', (e) => {
    e.stopPropagation();
    e.preventDefault();
}, false);

document.getElementById("avatar-upload").addEventListener('dragover', (e) => {
    e.stopPropagation();
    e.preventDefault();

    document.getElementById("avatar-hovertxt").classList.add("notvisible");
    document.getElementById("avatar-hovertxtdrop").classList.remove("notvisible");
    document.getElementById("avatar-upload").classList.add("focused");
}, false);

document.getElementById("avatar-upload").addEventListener('dragleave', (e) => {
    e.stopPropagation();
    e.preventDefault();

    document.getElementById("avatar-hovertxtdrop").classList.add("notvisible");
    document.getElementById("avatar-upload").classList.remove("focused");

    setTimeout(() => {
        document.getElementById("avatar-hovertxt").classList.remove("notvisible");
    }, 300);
}, false);

document.getElementById("avatar-upload").addEventListener('drop', (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    document.getElementById("avatar-hovertxtdrop").classList.add("notvisible");
    document.getElementById("avatar-upload").classList.remove("focused");
    setTimeout(() => {
        document.getElementById("avatar-hovertxt").classList.remove("notvisible");
    }, 300);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        let extension = new RegExp(/^.*\.(.*)$/i).exec(e.dataTransfer.files[0].name);

        if (extension && acceptedType.indexOf(extension[1]) > -1) {
            document.forms["profilpic"].ppinput.files = e.dataTransfer.files;
            editPicture();
        }
    }
}, false);

document.forms["modal-ppinput"].addEventListener('submit', (e) => {
    e.preventDefault();

    Helpers.imgResizeFromUri(cropper.getCroppedCanvas().toDataURL(), 128, 128).then((dataURI) => {
        // Get the blob from Base64 string
        let block = dataURI.split(";");
        let contentType = block[0].split(":")[1];
        let realData = block[1].split(",")[1];
        let blob = Helpers.b64toBlob(realData, contentType);

        // Creating the FormData and loading the blob in it
        let data = new FormData();
        data.append("file", blob);

        // Starting the HTTP request
        let req = new XMLHttpRequest();
        req.open("POST", `/avatars/update?_csrf=${document.forms["profilpic"]._csrf.value}`, true);

        req.addEventListener('error', (err) => {}, false);

        req.addEventListener('load', (e) => {
            switch (req.responseText) {
                case "done":
                    document.getElementById("avatar").setAttribute("src", `${document.getElementById("avatar").getAttribute("src")}?${new Date().getTime()}`);
                    document.getElementById("pic").style.backgroundImage = `url('${document.getElementById("avatar").getAttribute("src")}?${new Date().getTime()}')`;
                    break;
                case "FILETOOHEAVY":
                    alert("Error: This file was too heavy!");
                    break;
                case "FILEERROR":
                    alert("Error: File not reconized!");
                    break;
                case "INVALIDFILETYPE":
                    alert("Error: Unvalid file type!");
                    break;
            }
        }, false);

        req.send(data);
    });

    Modal.close(document.getElementById("modal-ppinput"));
    cropper.destroy();
});