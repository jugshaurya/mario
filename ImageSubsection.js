class ImgSubsection {
  // Subsectioning the tile image from complete img
  constructor(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawSingle(x, y, width, height) {
    // first Four are position (x, y, width, height)
    // last Four is the subsection from (0,0) to (16,16)
    image(this.img, x, y, width, height, this.x, this.y, this.width, this.height);
  }

  // (x, y, width, height) same as drawSingle for a single image + sheetLength with (x2, y2, width2, height2) properties  
  drawSheet(x, y, width, height, x2, y2, width2, height2){
    const x_boxes = Math.ceil(width2 / width)
    const y_boxes = Math.ceil(height2 / height)
    for (let i = 0; i < x_boxes; i++) {
      for (let j = 0; j < y_boxes; j++) {
        image(this.img, x2 + width*i, y2 + height*j, width, height, this.x, this.y, this.width, this.height);
      }
    }
  }
}
