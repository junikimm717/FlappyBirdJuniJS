
function startgame(pipetime) {
    const motionconst = {
        acc : 550,
        gr : 300,
        t : 5,
        obmove : 100,
        scale : null,
        exp : 1/9,
        geninterval : 3000,
        gameover : false,
    };

    let player = {
        y : 230,
        vy : 0,
        el : document.getElementById('player'),
        gameinterval : null,
        t : 5,
        jumpspeed : -350,
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
            (this.topint - 10 > player.y || this.bottomint - 10 < player.y + 30))
        }
        clearob() {
            this.reg1.style.visibility = "hidden";
            this.reg2.style.visibility = "hidden";
        }
    };

    function fail() {
        if (player.gameover)
            return;
        player.gameover = true;
        clearInterval(player.gameInterval);
        clearInterval(runner);
        document.body.removeEventListener("keydown", player.keyRegister, true);
        document.body.removeEventListener("click", player.jump, true);
        document.body.removeEventListener("touchstart", player.jump, true);
        for (let i = 0; i < curob.length; ++i) {
            curob[i].keepmove = false;
        }
        curob = [];
        player.y = 300;
        player.el.style.top = "300px";
        console.log("function has been run.");
        let failmessage = document.createElement("Div");
        failmessage.innerHTML = '<h2 id = "failmessage"></h2>';
        document.body.appendChild(failmessage);

    }
    document.body.innerHTML = "";
    document.body.removeEventListener("keydown", player.keyRegister, true);
    document.body.removeEventListener("click", player.jump, true);

    // creating DOM elements.
    let gamehtml = document.createElement("Div");
    gamehtml.innerHTML = '<div id = "topBorder"></div>';
    document.body.appendChild(gamehtml);

    gamehtml = document.createElement("Div");
    gamehtml.innerHTML = '<div id = "player"></div>';
    document.body.appendChild(gamehtml);

    gamehtml = document.createElement("Div");
    gamehtml.innerHTML = '<div id = "bottomBorder"></div>';
    document.body.appendChild(gamehtml);

    gamehtml = document.createElement("Div");
    gamehtml.innerHTML = '<div id = scores></div>';
    document.body.appendChild(gamehtml);

    gamehtml = document.createElement("Div");
    gamehtml.innerHTML = '<a id = "startbutton" onclick = "startgame(3000)"><button> click to restart </button> </a>';
    document.body.appendChild(gamehtml);

    player.el = document.getElementById('player');

    motionconst.gameinterval = pipetime;

    // creating eventlisteners so that the bird will respond to jumps.
    document.body.addEventListener("keydown", player.keyRegister, true);


    if ('ontouchstart' in window) {
        document.body.addEventListener("touchstart", player.jump, true);
        motionconst.scale = Math.min(screen.width, screen.height)/704;
        player.jumpspeed *= motionconst.scale**motionconst.exp;
        motionconst.acc *= motionconst.scale**motionconst.exp;
    }
    else {
        document.body.addEventListener("click", player.jump, true);
        motionconst.scale = 1;
    }

    let curob = [];
    player.el.style.top = "230px";
    player.el.style.left = "100px";
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
    }, motionconst.geninterval);
}






/*


obstacles class :
generate random interval to parse out.








*/
