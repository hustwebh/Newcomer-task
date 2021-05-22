class Human {

}

class Woman extends Human {
    isHeLoval(boyfriend) {
        return boyfriend.girlFans ? false : true;
    }
}

class GirlFans {
    _fansnum = 0;
    unSeeFans = 0;

    constructor() { }

    get fansnum() {
        return this._fansnum;
    }
}

const Superman = (() => {

    const weakmap = new WeakMap();

    class Superman {
        //让girlfans变为私有属性
        // #girlFans= new GirlFans();   //在属性前加上#即可实现，如果不支持可换用其他方式实现
        // girlFans=this.#girlFans;
        girlFans = new GirlFans();//定义私有成员
        constructor(girlFans,weakmap){
            this.girlFans=girlFans;
            weakmap.get(this).girlFans=girlFans;
        }
        amILoyal() {
            return this.girlFans ? false : true;
        }
    }
    return Superman;
})();


const clark = new Superman();
clark.amILoyal()//false

const lois = new Woman();
lois.isHeLoyal(clark)//true