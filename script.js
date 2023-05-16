// Declaration

class element{
    constructor(HTMLelement, frameAmount = 1, imageSrc = ""){
        this.HTMLelement = HTMLelement
        this.rect = this.HTMLelement.getBoundingClientRect()
        this.originalTop = this.rect.top 
        this.originalBottom = this.rect.bottom 
        this.scrollValue = 0
        this.frameAmount = frameAmount
        this.currentFramePercentage = 0
        this.imageSrc = imageSrc
        this.image = new Image()
        this.image.src = this.imageSrc
        this.attemptedMovement = 0
        this.scrollBuffer = 0
        this.isApplyingEffect = true
    }
}

const headerCollection = document.getElementsByTagName("header")
const header = headerCollection.item(0)
const headerRect = header.getBoundingClientRect()

const leviImg = new element(document.getElementById("levi"), 74, './images/levi roll 74.png')
const logoImg = new element(document.getElementById("logo-img"))

const foundingImg = new element(document.getElementById("founding"), 174, './images/the rumbling eren eye zoom - 174.png')

const freedomImg = document.getElementById("freedom")

const scrollYCounter = document.getElementById("scrollYCounter")

const review1 = document.getElementById("review1")
const review2 = document.getElementById("review2")

const navBar = document.getElementById('nav')

// Code

window.onbeforeunload = function () {
    changeClassBeforeLoad()
    window.scrollTo(0, 0);
}

window.onload = function (){
    changeClassOnLoad()
}

function changeClassBeforeLoad(){
    logoImg.HTMLelement.classList.add("coolTransition")

    review1.classList.add("hidden")
    review2.classList.add("hidden")
    review1.classList.remove("resetTranslate")
    review2.classList.remove("resetTranslate")
}

function changeClassOnLoad(){
    setTimeout(() => {
        logoImg.HTMLelement.classList.remove("coolTransition")
    }, 200);
}

/*-------------------------------------------------------------------------------*/

let poopy = true

let accurateScrollY = 0
let lastScrollY = 0

function showNavOnScroll(){
    if (lastScrollY >= accurateScrollY) {
        navBar.style.top = "0";
    } else {
        navBar.style.top = "-1000px";
    }
}

function frameLoop(){
    // Primary code that runs constantly, not only on scroll
    if(window.innerWidth > 1000){
        showNavOnScroll()
        delaySticky(foundingImg, 2, true, 1) 
        showOnLastFrame(leviImg, review1)
        showOnLastFrame(leviImg, review2, 200)
        if(foundingImg.currentFramePercentage >= 100 && foundingImg.imageSrc == './images/the rumbling eren eye zoom - 174.png'){
            freedomImg.style.opacity = 1
            foundingImg.HTMLelement.style.position = "sticky"
            foundingImg.isApplyingEffect = false  
        }
    } 
}

setInterval(frameLoop, 10)

document.addEventListener("scroll", function(){
     // Primary code that runs only on scroll
    if(window.innerWidth > 1000){
        delaySticky(leviImg, 1.5, 4)
        delaySticky(logoImg, 1.5, 2) 
         
        animateOnScroll(leviImg, 2)
        if(foundingImg.isApplyingEffect == true)
        animateOnScroll(foundingImg, 1)
    }
    lastScrollY = accurateScrollY
})

function updateScrollY(){
    //Updates scrollY more often by taking the top of an object from the top of the page, gives more accurate readings
    accurateScrollY = -scrollYCounter.getBoundingClientRect().top
}

setInterval(updateScrollY, 0.1)


function ifOnScreen(element, partVisible = 2){
    const rect = element.HTMLelement.getBoundingClientRect()
    if(rect.top - window.innerHeight/partVisible <= 0 && rect.top + window.innerHeight/partVisible >= 0){
        return true
    }else{
        return false
    }
}

function delaySticky(element, rate, partVisible = 2){
    if(ifOnScreen(element, partVisible)){
        if(element.scrollBuffer == 0)
            element.scrollBuffer = accurateScrollY
        element.scrollValue = ((accurateScrollY)-element.scrollBuffer)/rate 
        if(element.scrollValue > 0)
            element.HTMLelement.style.marginTop = element.scrollValue + 'px'
    }
}

function animateOnScroll(element, rate, partVisible = 2){
    if(ifOnScreen(element, partVisible)){
        moveFrames(element, rate)
    }
}

function moveFrames(element, rate){
    element.attemptedMovement += 1
    if(element.attemptedMovement % rate == 0){
        if(element.currentFramePercentage >= 98){
            element.currentFramePercentage = 100
        }else if(element.currentFramePercentage < 0){
            element.currentFramePercentage = 0
        }else{
            if(accurateScrollY >= lastScrollY){
                element.currentFramePercentage += ((element.image.width/(element.frameAmount-1))/element.image.width)*100
            }else if(element.currentFramePercentage != 0){
                element.currentFramePercentage -= ((element.image.width/(element.frameAmount-1))/element.image.width)*100
            } 
        }
        element.HTMLelement.style.backgroundPosition = element.currentFramePercentage + "%"
    }  
}

function showOnLastFrame(animatedElement, hiddenElement, delayTime = 0){
    if(animatedElement.currentFramePercentage >= 98){
        if(delayTime == 0){
            hiddenElement.style.opacity = 1
        }else{
            setTimeout((element) => {
                element.style.opacity = 1
            }, delayTime, hiddenElement);
        }    
    }
}

function changeVisibilityNav() {
    const links = document.getElementById("links");
    if (links.style.display === "block") {
      links.style.display = "none";
    } else {
      links.style.display = "block";
    }
}



