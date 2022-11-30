function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flagPc = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flagPc = false;
            break;
        }
    }
    return flagPc;
}
var flagZt = IsPC();
console.log(flagZt) //true为PC端，false为手机端
if(!flagZt){
    $('.demo0 .floor').style.width = '70%';
    $('.demo1 .minipeople').style.width = '100%';
    $('.demo1 .minipeople').style.height = '100%';
    for(let x of $('.sec_title')){
        x.style.fontSize = '30px';
    }
    $('.demo2 .fireworkArea').style.width = '100%';
    // $('.demo1 .fireworkArea').style.height = '100%';
}
$('.demo1 .minipeople').style.width = '100%';
$('.demo1 .minipeople').style.height = '100%';
let color = ['#e1bee7','#bbdefb','#000000','#292B25'];
let sectionTopArr = [];
let index = 0;
let flag = true;
for (let x of $('section')) {
    sectionTopArr.push(x.offsetTop);
    console.log(x.offsetTop);
}

function scroll1(e) {
    console.log(e.deltaY, e.target);
    if (e.deltaY > 0) {
        if (index < sectionTopArr.length - 1)
            index++;
    } else {
        if (index > 0)
            index--;
    }
    console.log(index);
    scroll2();
}

function scroll2() {
    if (index < sectionTopArr.length) {
        setTimeout(() => {
            $('.scroll_box').scrollTo({
                top: sectionTopArr[index],
                behavior: "smooth"
            });
        }, 1)

    }
}

// window.onwheel = (e) => scroll1(e);

// $('.scroll_box').onscroll = () => {
//     if(Math.abs($('.scroll_box').scrollTop - sectionTopArr[index]) > 1){
//         window.onwheel = () => scroll2();
//         console.log(1);
//     }else{

//         window.onwheel = (e) => scroll1(e);
//     }

// }

window.addEventListener("resize", watchWindowSize);

function watchWindowSize() {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    console.log(w,h);
    sectionTopArr = [];
    for (let x of $('section')) {
        sectionTopArr.push(x.offsetTop);
        console.log(x.offsetTop);
    }
    $('.scroll_box').scrollTo({
        top: sectionTopArr[index]
    });
}

window.ontouchstart = (e) => {
    let y1 = e.changedTouches[0].clientY;
    window.ontouchend = (e) => {
        let y2 = e.changedTouches[0].clientY;
        if (y2 - y1 < -10) {
            if (index < sectionTopArr.length - 1)
                index++;
                $('.slide li')[index].onclick();
        } else if(y2 - y1 > 10){
            if (index > 0)
                index--;
                $('.slide li')[index].onclick();
        }
        console.log(index);
        // scroll2();
        // $('.scroll_box').style.backgroundColor = color[index];
        
    }
}

//侧边导航栏
for (let i = 0; i < $('.slide li').length; i++) {
    $('.slide li')[i].onclick = () => {
        for(let x of $('.slide li')){
            x.classList.remove('active');
            x.style.animation = ''
        }
        $('.slide li')[i].classList.add('active');
        $('.scroll_box').scrollTo({
            top: sectionTopArr[i],
            behavior: "smooth"
        });
        $('.scroll_box').style.backgroundColor = color[i];
        index = i;
        // titleAni(i);
        $('.slide li')[i].style.animation = 'jello-horizontal 0.9s linear';
    }
}

function titleAni(index){
    if(index == 3) {
        $('.sec_title').style.color = '#fff';
    }else{
        $('.sec_title').style.color = '#000';
    } 
}




