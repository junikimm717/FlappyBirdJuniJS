const motionconst = {
    acc : 450,
    gr : 300,
    t : 5,
    obmove : 100,
};

let player = {
    y : 300,
    vy : 0,
    el : document.getElementById('player'),
    gameinterval : null,
    t : 5,
    jumpspeed : -300,
    // when key is pressed.
    keyRegister : function () {
        let keyPressed = event.keyCode ? event.keyCode : event.which;
        if (!(keyPressed === 32 || keyPressed === 87))
            return;
        player.jump(event);
    },
    // motions.
    jump : function (event) {
        player.vy += player.jumpspeed;
        clearInterval(player.gameinterval);
        player.gameinterval = setInterval(player.frame, motionconst.t);
    },
    frame : function() {
        if (player.y > motionconst.gr) {
            player.bottom();
            return;
        }
        if (player.y < 0) {
            player.top();
            return;
        }
        player.vy += (motionconst.t/1000) * motionconst.acc;
        player.y += player.vy * (motionconst.t/1000);
        player.el.style.top = player.y + "px";
    },
    // if the bottom is reached.
    bottom : function() {
        clearInterval(player.gameinterval);
        player.y = motionconst.gr;
        player.vy = 0;
    },
    // if the top is reached.
    top : function () {
        player.y = 0;
        player.vy = 100;

    },
};
document.addEventListener("keydown", player.keyRegister);
document.addEventListener("click", player.jump);

class obstacle {
    constructor() {
        this.topint = Math.floor(50 + 175 * Math.random());
        this.bottomint = this.topint + 75;
        this.pos = 600;
        this.reg1 = document.createElement("Div");
        this.reg2 = document.createElement("Div");
        this.reg1.style = `
            position : absolute;
            top : 0px;
            left : 600px;
            background-color : blue;
            width : 30px;
            height : ${this.topint}px;
        `;
        this.reg2.style = `
            position : absolute;
            top : ${this.bottomint}px;
            left : 600px;
            background-color : blue;
            width : 30px;
            height : ${340 - this.bottomint}px;
        `;
        document.body.appendChild(this.reg1);
        document.body.appendChild(this.reg2);
        this.move();
    }
    move() {
        this.interval = setInterval(() => {
            this.pos -= (motionconst.t/1000) * motionconst.obmove;
            this.reg1.style.left = this.pos + "px";
            this.reg2.style.left = this.pos + "px";
            if (this.pos < 30) {
                clearInterval(this.interval);
                this.clearob();
            }
        }, motionconst.t);
    }
    clearob() {
        this.reg1.style.visibility = "hidden";
        this.reg2.style.visibility = "hidden";
    }
};







/*


obstacles class :
generate random interval to parse out.








*/
