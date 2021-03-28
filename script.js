let curSlideIndex = localStorage.getItem("cur_slide_index") === null ? 1 : parseInt(localStorage.getItem("cur_slide_index"));
let isAutoShowOn = localStorage.getItem("cur_slide_index") === null ? 1 : parseInt(localStorage.getItem("is_auto_show_on"));
let timer = 0;
initBtnValue();
showSlide(curSlideIndex);
addEventListener("keydown", handlePress);

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
    if (isAutoShowOn === 1) {
        timer = setInterval(function () {
            curSlideIndex++;
            showSlide(curSlideIndex);
        }, 4000);
    }
}

function changeSlideOption() {
    const btn = document.getElementById("auto_slide_btn");
    if (btn.value === "Start") {
        btn.value = "Stop";
        localStorage.setItem("is_auto_show_on", (1).toString());
        document.location.reload();
    } else {
        btn.value = "Start";
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