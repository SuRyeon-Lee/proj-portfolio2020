const body = document.querySelector('body');
const visualPart = document.querySelector('.visual-parts');
const introHighlight = document.querySelectorAll('.highlight');
const workPhoto = document.querySelectorAll('.work-photo');
const mainWork = document.querySelectorAll('.main-work');
const photos = 
    ['./images/sample1.jpg','./images/sample2.jpg',
     './images/sample3.jpg','./images/sample4.jpg',
     './images/sample5.jpg','./images/sample6.jpg',
     './images/sample7.jpg','./images/sample8.jpg']
const bgClips = document.querySelectorAll('.bg-clip');
const keywordsLine = document.querySelectorAll('.keywords');
const contactBtn = document.querySelector('.contact-btn');
const menuBtn = document.querySelector('.menu-btn');
const menuContainer = document.querySelector('.menu-container');
const menuBtnImg = document.querySelector('.menu');
let yOffset;
let menuCategory;
let tempPos;
let mousePos = {x:0, y:0}
// const cursor = document.querySelector('.cursor');

// body.addEventListener('mousemove',(e)=>{
//   body.style.cursor = `none`;
//   mousePos.x = e.pageX;
//   mousePos.y = e.pageY;
//   cursor.style.transform = `translate(${mousePos.x}px,${mousePos.y}px)`;
// })
function moveMenuBg(e){
  const menuBg = document.querySelector('.menu-bg');
  const menuTitle =  document.querySelector('.menu-title');
  const titleWidth = menuTitle.getClientRects()[0].width;
  let menuMousePos = -1 + (e.offsetX / titleWidth ) * 2;
  menuBg.style.transform = `translate(${menuMousePos*5-15}vw,-15vw)`
}

function changeMenuColor(){
  const menuTitle =  document.querySelector('.menu-title');
  const menuBg = document.querySelector('.menu-bg');
  menuTitle.addEventListener('mousemove',(e)=>{
    const menuContainer = document.querySelector('.menu-container');
    menuCategory = e.target.dataset.menu;
    menuContainer.dataset.menu = menuCategory;
    menuTitle.dataset.menu = menuCategory;
    menuBg.dataset.menu = menuCategory;
    moveMenuBg(e);
  });
  menuTitle.addEventListener('mouseout',()=>{
    menuContainer.dataset.menu = 0;
    menuTitle.dataset.menu = 0;
    menuBg.dataset.menu = 0;
  });
};


function closeMenu(){
  menuContainer.style.display = 'none';
  menuBtn.dataset.condition = "off";
  menuBtnImg.setAttribute('src',"./images/menu.svg");
}
function openMenu(){
  menuContainer.style.display = 'flex';
  menuBtn.dataset.condition = "on"
  menuBtnImg.setAttribute('src',"./images/close.svg");
  changeMenuColor();
}

menuBtnImg.addEventListener('click',(e)=>{
  if(menuBtn.dataset.condition == "on"){
    closeMenu();
  }else if(menuBtn.dataset.condition == "off"){
    openMenu();
  }
})
  

visualPart.addEventListener('mousemove',(e)=>{
  const mainVisual = document.querySelector('.main-visual');
  const circle = document.querySelector('.circle');
  let visualNum = e.target.getAttribute('data-number');
  let mousePos = { x:0, y:0 };
  
  (function changeBgColor(){
    mainVisual.setAttribute('data-number',`${visualNum}`)
  })();

  (function changeCircleColor(){
      circle.setAttribute('src',`./images/part${visualNum}.png`);
  })();

  const mainWidth = mainVisual.getBoundingClientRect().width;
  const mainHeight = mainVisual.getBoundingClientRect().height;

  (function moveCircle(){
    mousePos.x = -1 + (e.clientX / mainWidth) * 2;
    mousePos.y = 1 - (e.clientY / mainHeight) * 2;
    circle.style.transform = `translateX(${-mousePos.x*10}%) translateY(${mousePos.y*10}%)`
  })();

  (function moveTitle(){
    const mainTitle = document.querySelector('.title-logo');
    mousePos.x = -1 + (e.clientX / mainWidth) * 2;
    mousePos.y = 1 - (e.clientY / mainHeight) * 2;
    mainTitle.style.transform = `translateX(${mousePos.x*10}%) translateY(${-mousePos.y*10}%)`
  })();

});

function scrollLoop(){
  scrollSection();
  showLines();
  if( yOffset > window.innerHeight/2){
    for(let i=0; i<5; i++){
    introHighlight[i].classList.add('highlight-ani');
    }
  };
}

function floatText(){
  const textAni = document.querySelector('.text-animation');
  let x = 0;
  setInterval(
    ()=>{
      x += 0.1;
      textAni.style.left = `-${x}vw`;
      if(x > 200){
        x=0;
      }
    },10)
}

// function scalePhoto(ratio){
//   if(ratio < 0.35){
//     for(let i=0 ; i<3 ; i++){
//       workPhoto[i].style.transform = `scale(${1.5-ratio})`;
//     }
//   }else if(ratio > 0.35 && ratio < 0.6) {
//     for(let i=3 ; i<6 ; i++){
//       workPhoto[i].style.transform = `scale(${1.8-ratio})`;
//     }
//   }else if(ratio > 0.6 && ratio < 1) {
//     for(let i=5 ; i<8 ; i++){
//       workPhoto[i].style.transform = `scale(${2-ratio})`;
//     }
//   }
// }

function showLines(){
  
  let pageBottom = window.pageYOffset + window.innerHeight;
  const offsetTop = []
  const offsetBottom = []
  
  for(let i = 0; i < keywordsLine.length ; i++){
    offsetTop.push(keywordsLine[i].offsetTop);
    offsetBottom.push(keywordsLine[i].offsetBottom);
    if(pageBottom - 20 > offsetTop[i]){
      keywordsLine[i].classList.add('show-keys');
    } 
  }

}

function moveClips(ratio){
  bgClips[0].style.transform = `translate(${ratio*40}vw,${ratio*50}vw)`;
  bgClips[1].style.transform = `translate(${ratio*40}vw,${ratio*30}vw)`;
  bgClips[2].style.transform = `translate(${ratio*30}vw,${ratio*30}vw)`;
  bgClips[3].style.transform = `translate(${ratio*30}vw,${ratio*20}vw)`;
}

function scrollSection(){
  const mainWorks = document.querySelector('.main-works');
  const sectionHeight = mainWorks.getClientRects()[0].height;
  const sectionTop = mainWorks.offsetTop;
  const pageTop = window.pageYOffset;
  const pageBottom = pageTop + window.innerHeight;
  let currentScroll = pageBottom - sectionTop;
  let scrollRatio = currentScroll / sectionHeight;
  // 
  if(scrollRatio < 1 && scrollRatio >= 0 ){
    // if clients enter main-works section ...
    // scalePhoto(scrollRatio);
    moveClips(scrollRatio);
  }
}

contactBtn.addEventListener('mousemove',(e)=>{
  const btnWidth = contactBtn.getBoundingClientRect().width;
  const btnHeight = contactBtn.getBoundingClientRect().height;
  let btnPos = { x:0, y:0 };
  btnPos.x = -1 + (e.clientX / btnWidth) * 2;
  btnPos.y = 1 - (e.clientY / btnHeight) * 2;
  contactBtn.style.transform = `translateX(${-btnPos.x*5}%) translateY(${btnPos.y*2}%)`
})

function initPhoto(){
  for( let i=0; i <8; i++){
    workPhoto[i].style.backgroundImage = `url('${photos[i]}')`;   
  }
}

(function init(){

    for(let i=0; i<5; i++){
        const highlightColor = introHighlight[i].getAttribute('data-color');
        introHighlight[i].style.color=`#${highlightColor}`
    }

    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    
    floatText();
    // scrollPhoto();
    initPhoto();

})();