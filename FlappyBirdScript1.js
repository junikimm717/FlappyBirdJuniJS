
const motionconst = {
    acc : 600,
    gr : 300,
    t : 5,
    obmove : 100,
    scale : null,
    exp : 1/9,
};

let player = {
    y : 230,
    vy : 0,
    el : document.getElementById('player'),
    gameinterval : null,
    t : 5,
    jumpspeed : -400,
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
        player.y = motionconst.gr;
        player.vy = 0;
        fail();
    },
    // if the top is reached.
    top : function () {
        player.y = 0;
        player.vy = 0;
        fail();
    },
};

class obstacle {
    constructor() {
        this.topint = Math.floor(50 + 175 * Math.random());
        this.bottomint = this.topint + 75;
        this.pos = 600;
        this.keepmove = true;
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
                curscore++;
                let x = localStorage.getItem("maxscore")
                localStorage.setItem("maxscore", Math.max(x, curscore));
                document.getElementById('scores').innerHTML = "score : " + curscore + " maxscore : " +
                localStorage.getItem("maxscore");
                this.keepmove = false;
            }
            if (this.detect()) {
                this.keepmove = false;
                fail();
                this.clearob();
            }
            if (!this.keepmove) {
                clearInterval(this.interval);
                this.clearob();
            }
        }, motionconst.t);
    }
    detect() {
        return ((100 < this.pos && this.pos < 130) &&
        (this.topint > player.y || this.bottomint < player.y + 30))
    }
    clearob() {
        this.reg1.style.visibility = "hidden";
        this.reg2.style.visibility = "hidden";
    }
};

function fail() {
    clearInterval(player.gameInterval);
    document.body.removeEventListener("keydown", player.keyRegister, true);
    document.body.removeEventListener("click", player.jump, true);
    for (let i = 0; i < curob.length; ++i) {
        curob[i].keepmove = false;
    }
    curob = [];
    player.y = 300;
    player.el.style.top = "300px";
    clearInterval(runner);
    document.getElementById('failmessage').innerHTML = "Fail! Retry by clicking the button."
}

document.addEventListener("keydown", player.keyRegister);

if ('ontouchstart' in window) {
    document.addEventListener("touchstart", player.jump);
    motionconst.scale = Math.min(screen.width, screen.height)/704;
    player.jumpspeed *= motionconst.scale**motionconst.exp;
    motionconst.acc *= motionconst.scale**motionconst.exp;
}
else {
    document.addEventListener("click", player.jump);
    motionconst.scale = 1;
}

document.getElementById('failmessage').innerHTML = "";




let curob = [];
document.getElementById('player').style.top = "230px";
player.y = 230;


if (localStorage.getItem("maxscore") === null)
    localStorage.setItem("maxscore", 0);
let curscore = 0;

document.getElementById('scores').innerHTML = "score : " + curscore + " maxscore : " +
localStorage.getItem("maxscore");

let runner = setInterval(() => {
    curob.push(new obstacle());
    let len = curob.length;
    for (let i = 0; i < len; ++i) {
        if (!curob[0].keepmove)
            curob.shift();
    }
}, 3000);




/*


obstacles class :
generate random interval to parse out.








*/
