// create variable for all of the images
let galleryImages = document.querySelectorAll('.gallery-img');
// to track what the latest image is
let getLatestOpenedImg;
// get the toatl width of the browser window
let windowWidth = window.innerWidth;

// to check if we have got any images in our gallery
if (galleryImages) {
    // grab all the elements with the class attached to it
    galleryImages.forEach(function (image, index) {
        // index parameter counts each of elements that we have in .gallery-img container array
        image.onclick = function () {
            // alert();
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue('background-image');
            let getImgUrlPos = getFullImgUrl.split('/images/thumbs/');
            // set the path to the image
            let setNewImageUrl = getImgUrlPos[1].replace('")', '');
            // alert(setNewImageUrl)

            getLatestOpenedImg = index + 1;
            // to create a pop up window
            let container = document.body;
            let newImgWindow = document.createElement('div');
            container.appendChild(newImgWindow);
            // add class to the element created
            newImgWindow.setAttribute('class', 'img-window');
            newImgWindow.setAttribute('onclick', 'closeImg()');

            // append the new image into window
            let newImg = document.createElement('img');
            newImgWindow.appendChild(newImg);
            newImg.setAttribute('src', 'images/' + setNewImageUrl);
            // set a specific id for an image
            newImg.setAttribute('id', 'current-img');

            // to check the width of the new image to place the buttons in the right position
            newImg.onload = function () {
                let imgWidth = this.width;
                // get the distance between the image to the edge/border of the browser
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

                // create next/prev buttons
                // next btn
                let newNextBtn = document.createElement('a');
                let btnNextText = document.createTextNode('Next');
                // to insert text node into anchor  'a' tag
                newNextBtn.appendChild(btnNextText);

                // append an anchor 'a' tag into document
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute('class', 'img-btn-next');
                newNextBtn.setAttribute('onclick', 'changeImg(1)');

                newNextBtn.style.cssText = 'right: ' + calcImgToEdge + 'px';

                // prev btn
                let newPrevBtn = document.createElement('a');
                let btnPrevText = document.createTextNode('Prev');
                // to insert text node into anchor  'a' tag
                newPrevBtn.appendChild(btnPrevText);

                // append an anchor 'a' tag into document
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute('class', 'img-btn-prev');
                newPrevBtn.setAttribute('onclick', 'changeImg(0)');

                newPrevBtn.style.cssText = 'left: ' + calcImgToEdge + 'px';
            }
        }
    });
}

// to close a popup window
function closeImg() {
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();
}

// functions for next & prev buttons; changeImg()
function changeImg(changeDir) {
    document.querySelector('#current-img').remove();

    // create a new image depends on the image we deleted
    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if (changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if (changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }
    newImg.setAttribute('src', 'images/img' + calcNewImg + '.jpg');
    newImg.setAttribute('id', 'current-img');

    getLatestOpenedImg = calcNewImg;

    // change position of buttons according to the size of images
    newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector('.img-btn-next');
        nextBtn.style.cssText = 'right: ' + calcImgToEdge + 'px';

        let prevBtn = document.querySelector('.img-prev-next');
        prevBtn.style.cssText = 'left: ' + calcImgToEdge + 'px';
    }
}