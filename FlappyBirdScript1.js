function rungame() {
    const motionconst = {
        acc : 500,
        gr : 300,
        t : 5,
        obmove : 100,
    };

    let player = {
        y : 150,
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
            return ((100 < this.pos + 30 && this.pos + 30 < 130) &&
            (this.topint > player.y || this.bottomint < player.y + 30))
        }
        clearob() {
            this.reg1.style.visibility = "hidden";
            this.reg2.style.visibility = "hidden";
        }
    };

    let curob = [];
    player.el.style.top = "150px";
    player.y = 150;
    let returnval = false;
    document.getElementById("startbutton").onclick = "";
    document.getElementById("startbutton").style.visibility = "hidden";
    document.addEventListener("keydown", player.keyRegister);
    document.addEventListener("click", player.jump);
    let runner = setInterval(() => {
        curob.push(new obstacle());
        let len = curob.length;
        for (let i = 0; i < len; ++i) {
            if (!curob[0].keepmove)
                curob.shift();
        }
    }, 3000);
    

    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
            end = new Date().getTime();
        }
    }

    function fail() {
        returnval = true;
        document.body.removeEventListener("keydown", player.keyRegister, true);
        document.body.removeEventListener("click", player.jump, true);
        document.getElementById("startbutton").onclick = "rungame()";
        document.getElementById("startbutton").style.visibility = "visible";
        for (let i = 0; i < curob.length; ++i) {
            curob[i].reg1.style.visibility = "hidden";
            curob[i].reg2.style.visibility = "hidden";
            curob[i].keepmove = false;
        }
        clearInterval(player.gameInterval);
        player.y = 150;
        player.el.style.top = "150px";
        curob = [];
        clearInterval(runner);
        return;
    }

}


/*


obstacles class :
generate random interval to parse out.








*/
