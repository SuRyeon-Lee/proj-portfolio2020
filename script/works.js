const contactBtn = document.querySelector('.contact-btn');
const menuBtn = document.querySelector('.menu-btn');
const menuContainer = document.querySelector('.menu-container');
const menuBtnImg = document.querySelector('.menu');
let mousePos = {x:0, y:0};
const worksContainer = document.querySelector('.works-container');

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
    tempPos = window.scrollY;
    if(menuBtn.dataset.condition == "on"){
      closeMenu();
    }else if(menuBtn.dataset.condition == "off"){
      openMenu();
    }
  });

  contactBtn.addEventListener('mousemove',(e)=>{
    const btnWidth = contactBtn.getBoundingClientRect().width;
    const btnHeight = contactBtn.getBoundingClientRect().height;
    let btnPos = { x:0, y:0 };
    btnPos.x = -1 + (e.clientX / btnWidth) * 2;
    btnPos.y = 1 - (e.clientY / btnHeight) * 2;
    contactBtn.style.transform = `translateX(${-btnPos.x*5}%) translateY(${btnPos.y*2}%)`
  })
    
