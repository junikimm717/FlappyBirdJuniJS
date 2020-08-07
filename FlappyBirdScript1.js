const motionconst = {
    acc : 500,
    gr : 300,
    t : 5,
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

class obstacles {
    constructor() {
        this.topint = Math.floor(50 + 200 * Math.random());
        this.bottomint = topint + 50;
    }

};



/*


obstacles class :
generate random interval to parse out.








*/
