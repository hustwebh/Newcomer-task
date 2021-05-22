let container = document.getElementById("container");
let imgs = document.getElementsByClassName("slide");
let game_prev = document.getElementById("game_prev");
let game_next = document.getElementById("game_next");
let points = document.getElementById("points");
let number = 1;

game_next.addEventListener("click",turnnext);
game_prev.addEventListener("click",turnprev);
// game_next.addEventListener("click",open);
// game_prev.addEventListener("click",open);
container.addEventListener("mouseenter",clear);
container.addEventListener("mouseout",open);



function turnnext() {
    Array.from(points.children).map(_ => _.className='point');
    if(number!=5){
        number++;
    }else{
        number=1;
    }
    change(number);
}

function turnprev() {
    Array.from(points.children).map(_ => _.className='point');
    console.log("prev!")
    if(number!=1){
        number--;
    }else{
        number=5;
    }
    change(number);
}

for(let j=0;j<Array.from(points.children).length;j++)
{
    points.children[j].onclick=function(){
        clear();
        setTimeout(open,3000)
        Array.from(points.children).map(_ => _.className='point');
        points.children[j].className="point selected";
        number=j+1;
        change(number);
    }
}

function change(number) {
    //
    console.log(number)
    switch (number) {
        case 1:          //case i  代表在在该种目标状态下，第i张图是中间的“活跃”图
            imgs[0].className="slide slide--active";
            imgs[1].className="slide slide--next1";
            imgs[2].className="slide slide--next2";
            imgs[3].className="slide slide--prev2";
            imgs[4].className="slide slide--prev1";
            points.children[0].className="point selected";
            break;
        case 2:
            imgs[0].className="slide slide--prev1";
            imgs[1].className="slide slide--active";
            imgs[2].className="slide slide--next1";
            imgs[3].className="slide slide--next2";
            imgs[4].className="slide slide--prev2";
            points.children[1].className="point selected";
            break;
        case 3:
            imgs[0].className="slide slide--prev2";
            imgs[1].className="slide slide--prev1";
            imgs[2].className="slide slide--active";
            imgs[3].className="slide slide--next1";
            imgs[4].className="slide slide--next2";
            points.children[2].className="point selected";
            break;
        case 4:
            imgs[0].className="slide slide--next2";
            imgs[1].className="slide slide--prev2";
            imgs[2].className="slide slide--prev1";
            imgs[3].className="slide slide--active";
            imgs[4].className="slide slide--next1";
            points.children[3].className="point selected";
            break;
        case 5:
            imgs[0].className="slide slide--next1";
            imgs[1].className="slide slide--next2";
            imgs[2].className="slide slide--prev2";
            imgs[3].className="slide slide--prev1";
            imgs[4].className="slide slide--active";
            points.children[4].className="point selected";
            break;
    }
}

let timeInter=setInterval(turnnext,2000);
function clear(){
    console.log("clows")
    clearInterval(timeInter);
    timeInter=NaN;
}
function open(){
    console.log("open")
    if(!timeInter){
        timeInter = setInterval(turnnext,2000);
    }
}