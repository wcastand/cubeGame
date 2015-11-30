var canvas;
var ctx;
var play = false;
var timerCubes;
var jumping = false;
var speedup = false;
//game
var cubes = new Array;
var player;
var gravity = 0.8;
var score = 0;

ready(function(){
  canvas = document.querySelector('#world');
  ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  player = new Block(20, 20, 6, true);

  var playButton = document.querySelector('#play');
  playButton.addEventListener("click", function(){
    if(play){
      play = false;
      this.classList.remove('icon-pause');
      this.classList.add('icon-play');
      clearInterval(timerCubes);
    }
    else{
      play = true;
      this.classList.remove('icon-play');
      this.classList.add('icon-pause');
      if(!cubes.length)
        createBlock();
      else
        timerCubes = window.setTimeout(createBlock, randomRange(500, 2000));
    }
    return false;
  });
});

window.onresize = function(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

Mousetrap.bind(['right', 'd'], function(evt) { speedup = true; }, 'keydown');
Mousetrap.bind(['right', 'd'], function(evt) { speedup = false; }, 'keyup');
Mousetrap.bind(['up', 'space'], function(evt) { jumping = true; }, 'keydown');
Mousetrap.bind(['up', 'space'], function(evt) { jumping = false; }, 'keyup');

function update(){
  ctx.lineWidth="2";
  ctx.strokeStyle = 'rgba(0,0,0,1)';
  ctx.font="18px Helvetica";

  if(play){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.update(canvas.width, canvas.height, gravity);
    for (var i = 0; i < cubes.length; i++) {
      if(cubes[i].update(canvas.width, canvas.height, gravity)){
        ctx.rect(cubes[i].pos.x, cubes[i].pos.y, cubes[i].width, cubes[i].height);
        if(player.collision(cubes[i])){
          score = 0;
          cubes.splice(i, 1);
        }
      }
      else{
        cubes.splice(i, 1);
        score++;
      }
    }
    ctx.fillText("Score : " + score,25, canvas.height - 40);
  }
  //draw score
  //draw player and cubes
  ctx.rect(player.pos.x, player.pos.y, player.width, player.height);
  ctx.stroke();
  //draw line ground
  ctx.beginPath();
  ctx.strokeStyle="rgba(0,0,0,1)";
  ctx.moveTo(0,canvas.height - 80);
  ctx.lineTo(canvas.width, canvas.height - 80);
  ctx.stroke();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

function createBlock(){
  var block = new Block(null ,null, 8, false);
  cubes.push(block);
  timerCubes = window.setTimeout(createBlock, randomRange(500, 2000));
}
