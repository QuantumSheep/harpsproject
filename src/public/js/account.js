"use strict";

const acceptedType = [
    "jpg",
    "jpeg",
    "png"
];
let cropper;

document.getElementById("avatar-upload").addEventListener('click', (e) => {
    document.forms["profilpic"].ppinput.click();
});

document.forms["profilpic"].ppinput.addEventListener('change', (e) => {
    let reader = new FileReader();

    document.body.classList.add("modal-open");
    document.getElementById("modal-ppinput").classList.add("show", "active");

    reader.onload = (ev) => {
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
    document.getElementById("avatar-hovertxt").classList.remove("notvisible");
    document.getElementById("avatar-upload").classList.remove("focused");
}, false);

document.getElementById("avatar-upload").addEventListener('drop', (e) => {
    e.stopPropagation();
    e.preventDefault();

    document.getElementById("avatar-upload").classList.remove("focused");

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        let extension = new RegExp(/^.*\.(.*)$/i).exec(e.dataTransfer.files[0].name);

        if (extension && acceptedType.indexOf(extension[1]) > -1) {
            document.forms["profilpic"].ppinput.files = e.dataTransfer.files;
        }
    }
}, false);

document.querySelectorAll("button[data-dismiss]").forEach((element) => {
    element.addEventListener('click', (e) => {
        document.body.classList.remove("modal-open");
        element.closest(".modal").classList.remove("show", "active");
    });
});

document.forms["modal-ppinput"].addEventListener('submit', (e) => {
    e.preventDefault();

    let ImageURL = cropper.getCroppedCanvas().toDataURL();
    let block = ImageURL.split(";");
    let contentType = block[0].split(":")[1];
    let realData = block[1].split(",")[1];
    let blob = b64toBlob(realData, contentType);

    let myReader = new FileReader();

    myReader.onload = function (e) {
        console.log(e.target);
    }

    myReader.readAsArrayBuffer(blob)

    let data = new FormData();

    data.append("file", blob);

    let req = new XMLHttpRequest();

    req.open("POST", `/avatars/update?_csrf=${document.forms["profilpic"]._csrf.value}`, true);

    req.addEventListener('error', (err) => {}, false);

    req.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            let percentComplete = (e.loaded / e.total) * 100;
            document.getElementById("progress").value = percentComplete;
        }
    }, false);

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

document.forms["profilpic"].addEventListener('submit', (e) => {
    e.preventDefault();

    let extension = new RegExp(/^.*\.(.*)$/i).exec(document.forms["profilpic"].ppinput.files[0].name);

    if (!extension || acceptedType.indexOf(extension[1]) < 0) {
        alert("Error: Unvalid file type!");
        return false;
    }


}, false);