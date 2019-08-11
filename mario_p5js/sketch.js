var globalImg, characterImg, tileImg, skyImg, marioImg

function preload(){
  globalImg = loadImage('tiles.png')
  characterImg = loadImage('characters.gif')
}

function setup() {
  createCanvas(windowWidth-50, windowHeight-50)
  background(0)

  // Croping Image
  tileImg = globalImg.get(0, 0, 16, 16)
  skyImg = globalImg.get(49, 365, 14, 14)
  marioImg = characterImg.get(275, 40, 16, 20)

  // Creating
  tile = new NonLivingCharacter(tileImg)
  sky = new NonLivingCharacter(skyImg)
  mario = new LivingCharacter(marioImg, 50, windowHeight - 200)
}

function draw() {
  drawBackgroundLayer(sky, tile)
  mario.show()
  
  if(keyIsDown(RIGHT_ARROW)){
    mario.move(1)
  }else if (keyIsDown(LEFT_ARROW)){
    mario.move(-1)
  }else if (keyIsDown(UP_ARROW)){
    mario.jump()
  }else if (keyIsDown(DOWN_ARROW)){
    // mario.jump()
  }
}

// Helper Functions
const drawBackgroundLayer = (sky, tile) => {

  skySheet = [0, 0, windowWidth-50, windowHeight-50]
  tileSheet = [0, windowHeight - 100-50, windowWidth-50, 100]

  sky.drawSheet(...skySheet)
  tile.drawSheet(...tileSheet)
}