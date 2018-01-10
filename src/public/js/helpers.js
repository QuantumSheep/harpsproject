"use strict";

class Helpers {
    /**
     * Get a parameter from Query string
     * @param {string} name 
     * @param {string} url 
     */
    static getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /**
     * Convert Base64 to Blob
     * @param {string} b64Data 
     * @param {string} contentType 
     * @param {number} sliceSize 
     */
    static b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }

    /**
     * Resize an image from URI (Base64 / URL)
     * @param {string} uri 
     * @param {number} width 
     * @param {number} height 
     */
    static imgResizeFromUri(uri, width, height) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');

            img.onload = function () {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(this, 0, 0, width, height);

                let dataURI = canvas.toDataURL();

                resolve(dataURI);
            };

            img.src = uri;
        });
    }
}

class Modal {
    static init() {
        document.querySelectorAll("button[data-dismiss]").forEach((element) => {
            element.addEventListener('click', (e) => {
                this.close(element.closest(".modal"));
            });
        });
    }

    static open(element) {
        document.body.classList.add("modal-open");
        element.classList.add("active");
        setTimeout(() => {
            element.classList.add("show");
        }, 160);
    }

    static close(element) {
        document.body.classList.remove("modal-open");
        element.classList.remove("show");
        setTimeout(() => {
            element.closest(".modal").classList.remove("active");
        }, 160);
    }
}
Modal.init();