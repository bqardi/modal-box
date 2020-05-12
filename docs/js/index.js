document.addEventListener("DOMContentLoaded", event => {
    const galleryItems = document.querySelectorAll(".gallery__item");

    //#region RANDOM IMAGE ORDER
    let arrIndexes = uniqueArrayValues(0, galleryItems.length);

    const delay = 0; //Sæt et delay for at simulere en blande funktion.
    const repeats = 2;

    reorder();

    function reorder() {
        if (delay == 0) {
            for (let i = 0; i < galleryItems.length; i++) {
                setOrder(galleryItems[i], arrIndexes[i]);
            }
        } else {
            i = 0;
            let repeatCount = 0;
            let interval = setInterval(() => {
                if (i >= galleryItems.length) {
                    if (repeatCount >= repeats) {
                        clearInterval(interval);
                        return;
                    } else {
                        i = 0;
                        repeatCount++;
                        arrIndexes = uniqueArrayValues(0, galleryItems.length);
                    }
                }
                setOrder(galleryItems[i], arrIndexes[i]);
                i++;
            }, delay);
        }
    }

    function setOrder(elm, order) {
        elm.style.order = order;
    }

    function uniqueArrayValues(min, max) {
        let arr = [];
        while (arr.length < (max - min)) {
            let rnd = randomInteger(min, max);
            if (arr.indexOf(rnd) === -1) arr.push(rnd);
        }
        return arr;
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //#endregion RANDOM IMAGE ORDER

    //#region MODAL
    const galleryItemLinks = document.querySelectorAll(".gallery__item .gallery__item-link");
    const modal = document.getElementById("modal");
    const modalBox = document.getElementById("modal-box");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalClose = document.getElementById("modal-close");

    galleryItemLinks.forEach(galleryItemLink => {
        galleryItemLink.addEventListener("click", function(evt) {
            const img = galleryItemLink.querySelector(".gallery__item-image");
            setImage(img.src, img.alt, img.alt);
            openModal(evt);
        });
    });

    modal.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal);
    modalBox.addEventListener("click", stopProp);
    document.addEventListener("keydown", function(evt) {
        if (evt.key == "Escape") {
            closeModal(evt);
        }
    });

    function stopProp(evt) {
        evt.stopPropagation();
    }

    function setImage(src, alt, title) {
        modalImage.src = src;
        modalImage.alt = alt;
        modalTitle.textContent = title;
        let width = 80 * modalImage.offsetWidth / modalImage.offsetHeight;
        modalBox.style.width = width + "vh";
    }

    function openModal(evt) {
        evt.preventDefault();
        modal.classList.add("js-active");
    }

    function closeModal(evt) {
        evt.preventDefault();
        modal.classList.remove("js-active");
    }
    //#endregion MODAL
});