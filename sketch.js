var globalImg, tile, sky, singleSky, singleTile, skySheet, tileSheet;

function setup() {

  createCanvas(windowWidth, windowHeight)
  background(0)

  // setup for one image - [x,y,width,height]
  singleTile = [0, windowHeight - 50, 50, 50]
  singleSky = [0, 0, 50, 50]
  // setup for sheet
  skySheet = [0, 0, windowWidth, windowHeight]
  tileSheet = [0, windowHeight - 50, windowWidth, 50]

  globalImg = loadImage('tiles.png')

  tile = new ImgSubsection(globalImg, 0, 0, 16, 16)
  sky = new ImgSubsection(globalImg, 49, 365, 14, 14)
}

function draw() {
  sky.drawSheet(...singleSky, ...skySheet)
  tile.drawSheet(...singleTile, ...tileSheet)
}