let ListPartul = document.getElementById(`ListPartul`);
let prev1 = document.getElementById("prev1") //左
let next1 = document.getElementById("next1") //右
let Index=1;

next1.onclick = function () {
    if (Index === 4) {
        ListPartul.style.transitionDuration = "0s";
        // ListPartul.style.left=`0px`;
        ListPartul.style.transform = 'translateX(451px)';
        setTimeout(() => {
            ListPartul.style.transitionDuration = "";
            Index = 0;
            Index++;
            //滑动动画
            ListPartul.style.transform = `translateX(${-(Index - 1) * 451}px)`;
            // ListPartul.style.left = `${-(Index - 1) * 451}px`;
        },30)
    } else {
        Index++;
        //滑动动画
        // ListPartul.style.left = `${-(Index - 1) * 451}px`;
        ListPartul.style.transform = `translateX(${-(Index - 1) * 451}px)`;
        console.log(Index);
    }
}

prev1.onclick = function () {
    if (Index === -1) {
        ListPartul.style.transition = "0s";
        // List.style.left=`0%`;
        ListPartul.style.transform = 'translateX(-902px)';
        // List.style.transform = `translatX(0)`;
        //之所以选择使用transform而不是直接改变left的值;是因为考虑到
        setTimeout(() => {
            ListPartul.style.transitionDuration = "";
            Index = 3;
            Index--;
            //滑动动画
            // List.style.left = `${-(wrapIndex - 1) * 100}%`;
            ListPartul.style.transform = `translateX(${-(Index - 1) * 451}px)`; // 闪现回第一张

        },20)
    } else {
        Index--;
        //滑动动画
        // List.style.left = `${-(wrapIndex - 1) * 100}%`;
        ListPartul.style.transform = `translateX(${-(Index - 1) * 451}px`; // 闪现回第一张

    }
}