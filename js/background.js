class Background {

  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize

    this.background = new Image();
    this.background.src = "../img/background_temp.jpg";

      this.backgroundPos = {
          x: 0,
          y: 0
    }

  }

  drawBackground() {

      this.ctx.drawImage(this.background, this.backgroundPos.x, this.backgroundPos.y, this.canvasSize.w, this.canvasSize.h);
  }
  
}