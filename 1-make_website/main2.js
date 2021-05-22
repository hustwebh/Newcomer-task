let List = document.getElementsByClassName("List")[0] //轮播图容器
let prev = document.getElementById("prev") //左
let next = document.getElementById("next") //右
let wrapIndex = 1;

next.onclick = function () {
    if (wrapIndex === 3) { //如果到了最后一张
        List.style.transitionDuration = "0s";
        // List.style.left=`0%`;
        List.style.transform = 'translateX(0)'; // 闪现回第一张
        // List.style.transform = `translatX(0)`;
        //之所以选择使用transform而不是直接改变left的值;是因为考虑到一切有关于长度位置等的变化都会导致浏览器触发
        //回流，极大的提升浏览网页的性能消耗，而transform只是实现视觉上的效果，换言之
        setTimeout(() => {

        // requestAnimationFrame(()=>{
            // requestAnimationFrame(()=>{
                List.style.transitionDuration = "";
                wrapIndex = 1;
                wrapIndex++;
                //滑动动画
                // List.style.left = `${-(wrapIndex - 1) * 100}%`;
                List.style.transform = `translateX(${-(wrapIndex - 1) * 100}%)`; // 闪现回第一张
            // })
        // })
       
        },30)

    } else {
        wrapIndex++;
        //滑动动画
        // List.style.left = `${-(wrapIndex - 1) * 100}%`;
        List.style.transform = `translateX(${-(wrapIndex - 1) * 100}%)`; // 闪现回第一张

    }



}
prev.onclick = function () {
    if (wrapIndex === 0) {
        List.style.transition = "0s";
        // List.style.left=`-100%`;
        List.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            List.style.transitionDuration = "";
            wrapIndex = 2;
            wrapIndex--;
            // List.style.left = `${-(wrapIndex - 1) * 100}%`;
            List.style.transform = `translateX(${-(wrapIndex - 1) * 100}%)`;
        }, 30)

    } else {
        wrapIndex--;
        // List.style.left = `${-(wrapIndex-1)*100}%`;
        List.style.transform = `translateX(${-(wrapIndex - 1) * 100}%)`;
    }
}
