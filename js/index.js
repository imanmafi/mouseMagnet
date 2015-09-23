var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = window.innerWidth;
var ch = c.height = window.innerHeight;

var rad = Math.PI / 180;
var howMany = 2000;
var p = []; // points array
var X, Y;
var mP;// mouse position

function Point() {
  this.w = 3;
  this.color = "hsl(" + (~~(Math.random() * 30) + 1) + ",99%, 65%)";
  this.A = ~~(Math.random() * 360) + 1;
  this.a = this.A;
  this.r = ~~(Math.random() * cw) + 1
  this.x = mP.x + this.r * Math.cos(this.a * rad);
  this.y = mP.y + this.r * Math.sin(this.a * rad);
}

function buildRy() {
  mP = {
    x: cw / 2,
    y: ch / 2
  }
  for (var i = 0; i < howMany; i++) {
    p[i] = new Point;
  }
}

function updateRy() {

  for (var i = 0; i < p.length; i++) {
    X = p[i].x - mP.x;
    Y = p[i].y - mP.y;
    p[i].r = Math.sqrt(X * X + Y * Y);
    p[i].a = Math.atan2(Y, X) / rad;

    p[i].w = 4;

  }

}

function Draw() {
  ctx.fillStyle = "rgba(0,0,0,.07)";
  ctx.fillRect(0, 0, cw, ch);

  for (var i = 0; i < p.length; i++) {

    if (p[i].r > 0) {
      p[i].r -= Math.random() * 2;
      p[i].a += (50 / p[i].r) * (Math.random() < 0.5 ? -1 : 1); // plus or minus
    } else {
      p[i].r = cw;
      p[i].a = p[i].A;
    };
    p[i].x = mP.x + p[i].r * Math.cos(p[i].a * rad);
    p[i].y = mP.y + p[i].r * Math.sin(p[i].a * rad);

    ctx.fillStyle = p[i].color;
    ctx.fillRect(p[i].x, p[i].y, p[i].w, p[i].w);

  }
  requestId = window.requestAnimationFrame(Draw);
}



// helpers
function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

function randomIntFromInterval(mn, mx) {
  return ~~(Math.random() * (mx - mn + 1) + mn);
}

// events
window.addEventListener("mousemove", function(e) {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
  }
  mP = oMousePos(document.getElementById("c"), e);
  updateRy();
  requestId = window.requestAnimationFrame(Draw);
}, false);

window.addEventListener("mouseout", function(e) {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
  }
  mP = {
    x: cw / 2,
    y: ch / 2
  }
  updateRy();
  requestId = window.requestAnimationFrame(Draw);
}, false);

window.addEventListener("resize", function(e){
	 if (requestId) {window.cancelAnimationFrame(requestId);}
	 cw = c.width = window.innerWidth;
    ch = c.height = window.innerHeight;
	 mP = {x:cw/2, y:ch/2}
	 updateRy();
	 requestId = window.requestAnimationFrame(Draw);
	 },false);	 

window.addEventListener("load", function() {
  buildRy();
  requestId = window.requestAnimationFrame(Draw);
}, false);