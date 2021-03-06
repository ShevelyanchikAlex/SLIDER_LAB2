const imagesArr = ["assets/images/mount1.jpg", "assets/images/mount2.jpg", "assets/images/mount4.jpg"];

let curSlideIndex = localStorage.getItem("cur_slide_index") === null ? 1 : parseInt(localStorage.getItem("cur_slide_index"));
let isAutoShowOn = localStorage.getItem("cur_slide_index") === null ? 1 : parseInt(localStorage.getItem("is_auto_show_on"));
let timer = 0;

initSliderAndDotsSection(imagesArr);
initBtnValue();
showSlide(curSlideIndex);
addEventListener("keydown", handlePress);

function initSliderAndDotsSection(imagesArr) {
    let slider_section = document.getElementById("slider_section");
    let dots_section = document.getElementById("dots");
    for (let i = 0; i < imagesArr.length; i++) {
        slider_section.insertAdjacentHTML('afterend', '<div class="my_slides fade"><img class="current_image" src=' + imagesArr[i] + '></div>');
        dots_section.insertAdjacentHTML('afterbegin', '<span class="dot" onclick="changeCurrentSlide(' + (imagesArr.length - i) + ')"></span>');
    }
}

function changeNextSlide(delta) {
    showSlide(curSlideIndex += delta);
}

function changeCurrentSlide(numOfSlide) {
    showSlide(curSlideIndex = numOfSlide);
}

function initBtnValue() {
    const btn = document.getElementById("auto_slide_btn");
    btn.value = isAutoShowOn === 1 ? "Stop" : "Start";
}

function showSlide(numOfSlide) {
    const slidesArr = document.getElementsByClassName("my_slides");
    const dotsArr = document.getElementsByClassName("dot");

    checkCurrentSlideIndex(numOfSlide, slidesArr);
    changeDisplayStyle(slidesArr, dotsArr);

    slidesArr[curSlideIndex - 1].style.display = "block";
    dotsArr[curSlideIndex - 1].className += " active";
    localStorage.setItem("cur_slide_index", (curSlideIndex).toString());
    if (isAutoShowOn === 1) autoShow();
}


function checkCurrentSlideIndex(numOfSlide, slidesArr) {
    if (numOfSlide > slidesArr.length) {
        curSlideIndex = 1;
    } else {
        if (numOfSlide < 1) {
            curSlideIndex = slidesArr.length;
        }
    }
}

function changeDisplayStyle(slidesArr, dotsArr) {
    for (let i = 0; i < slidesArr.length; i++) {
        slidesArr[i].style.display = "none";
        dotsArr[i].className = dotsArr[i].className.replace("active", "");
    }
}

function autoShow() {
    clearInterval(timer);
    timer = setInterval(function () {
        curSlideIndex++;
        showSlide(curSlideIndex);
    }, 4000);
}

function changeSlideOption() {
    const btn = document.getElementById("auto_slide_btn");
    if (btn.value === "Start") {
        localStorage.setItem("is_auto_show_on", (1).toString());
        document.location.reload();
    } else {
        localStorage.setItem("is_auto_show_on", (0).toString());
        document.location.reload();
    }
}

function handlePress(e) {
    switch (e.key) {
        case "ArrowLeft":
            changeNextSlide(-1);
            break;
        case "ArrowRight":
            changeNextSlide(1);
            break;
        default:
            break;
    }
}