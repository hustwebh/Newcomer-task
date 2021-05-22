class GirlFans {
    Fansnumber=0;
    unSeeFans=Fansnumber;
    Fans=[];
                                   
    constructor(name, favorability,Fans) {
        this.name=name;
        this.favorability=favorability;
        Fans.push(this.meet(name, favorability));
    }

    meet(name, favorability) {
        let fans={};
        fans.name=name;
        fans.favorability=favorability;
        this.Fansnumber++;
        unSeeFans=Fansnumber;
        this.Fans.push(fans)
        return fans;
    }

    date() {
        let mostfavoriteFans = Fans[0]
        for (let i = 1; i < Fans.length; i++) {
            if (Fans[i].favorability > mostfavoriteFans.favorability) {
                mostfavoriteFans = Fans[i];
            }
        }
        mostfavoriteFans.favorability = 0;
        //和一个粉丝约会成功
        this.unSeeFans--;
    }
    howMany() {
        return this.unSeeFans;
    }
}

class Kryptonian {
    fly() {
        console.log("I can fly!");
    }
}

class Superman extends Kryptonian {
    whoami() {
        console.log("I am superman!")
    }
    _hp = 100; //初始的体力
    // hp = 100;
    //_hp为只读项目，仅设置get而不设置set
    //hp为只写项目，仅设置set而不设置get？
    get hp() {
        return this._hp;
    }

    //static定义静态方法会让实例不能继承，但可以直接通过类以及其子类来调用
    //在本次中直接static在Kryptontion中的方法可以直接被Superman调用，但不能被clark调用

    takeDamage(amount) {
        if (amount == undefined) {
            this._hp = 0;
        }
        else {
            if (this._hp >= amount) {
                this._hp -= amount;
            } else {
                this._hp = 0;
            }
        }
    }

    heal(amount) {
        if (amount == undefined) {
            this._hp = 100;
        } else {
            if (this._hp + amount >= 100) {
                this._hp = 100;
            } else {
                this._hp += amount;
            }
        }
    }

    areYouOk() {
        if (this._hp <= 20) {
            return false;
        } else {
            return true;
        }
    }
    girlFans = new GirlFans();//让superman类有girlfans类的实例
}

const clark = new Superman();
clark.whoami();
clark.fly();
clark.takeDamage(30);
clark.heal(10);
console.log(clark.areYouOk());
clark.takeDamage();
console.log(clark.areYouOk());