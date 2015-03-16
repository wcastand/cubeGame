var Block = function(w, h, s, isPlayer){
  this.width     = (w) ? w : randomRange(40,90);
  this.height    = (h) ? h : randomRange(20,45);
  this.speed     = (s) ? s : 15;
  this.jumping   = false;
  this.velocity  = { x: 0, y : 0 };
  this.isPlayer  = (isPlayer) ? isPlayer : false;
  if(isPlayer)
    this.pos     = { x : 50, y : window.innerHeight - this.height - 81 };
  else
    this.pos     = { x : window.innerWidth + 50, y : window.innerHeight - this.height - 81 };
};

Block.prototype.update = function(w, h, gravity){
  var self = this;
  if(self.isPlayer){
    if(jumping && !player.jumping){
      player.jumping = true;
      player.velocity.y = -player.speed * 2;
    }
    if(speedup)
      self.velocity.y += gravity * 1.3;
    else
      self.velocity.y += gravity;
    self.pos.y += self.velocity.y;

    if(self.pos.y >= (h - 81) - self.height){
      self.pos.y = (h - 81) - self.height;
      self.jumping = false;
    }
  }
  else{
    if(speedup)
      self.pos.x -= self.speed * 2;
    else
      self.pos.x -= self.speed;
    if((self.pos.x + self.width) < 0)
      return false;
  }
  return true;
};

Block.prototype.collision = function(item) {
  return (this.pos.x < item.pos.x + item.width && this.pos.x + this.width > item.pos.x &&
    this.pos.y < item.pos.y + item.height && this.height + this.pos.y > item.pos.y);
}
