class LivingCharacter {
  
  constructor(img, x, y, width = 50, height = 50, xspeed = 5, yspeed = 5) {
    this.img = img;
    this.x = x
    this.y = y
    this.width = width;
    this.height = height;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
  show() {
    image(this.img, this.x , this.y , this.width, this.height);
    this.x = constrain(this.x, 0, windowWidth-100)

  }

  jump () {
    this.y -= this.yspeed
  }

  // accelarate / decelarate
  move (dir) {
    this.x += this.xspeed * dir
  }

}