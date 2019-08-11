class NonLivingCharacter {

  constructor(img, height = 50, width = 50) {
    this.img = img
    this.width = width
    this.height = height
  }

  drawSingle(x, y) {
    image(this.img, x, y, this.width, this.height);
  }

  // (width, height) for a single character
  // sheetLength with (x, y, sheet_width, sheet_height) properties  
  drawSheet(x, y, sheet_width, sheet_height){
    const x_boxes = Math.ceil(sheet_width / this.width)
    const y_boxes = Math.ceil(sheet_height / this.height)
    for (let i = 0; i < x_boxes; i++) {
      for (let j = 0; j < y_boxes; j++) {
        this.drawSingle(x + this.width*i, y + this.height*j)
      }
    }
  }
}
