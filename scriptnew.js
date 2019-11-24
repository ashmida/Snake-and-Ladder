window.rollDice = ()=>{

  class Tile {
  constructor(x, y, wh, index, next) {
    this.x = x
    this.y = y
    this.wh = wh
    this.index = index;
    this.next = next;
    this.snadder = 0;


    //board
    if (this.index % 2 == 0) {
      this.color = 0;
    }
      else{
      this.color = 255;
    }
  }

  getCenter(){
    let cx= this.x + this.wh/2;
    let cy= this.y + this.wh/2;
    return [cx, cy];
  }

  show(){
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.wh, this.wh);
  }

  highlight(){
    fill(0, 255, 0, 100);
    noStroke();
    rect(this.x, this.y, this.wh, this.wh);
  }

    //snake and ladders
    showSnadders(){
      if(this.snadder != 0 ){
        let myCenter = this.getCenter();
        let nextCenter = tiles[this.index + this.snadder].getCenter();
        strokeWeight(10);
        if(this.snadder < 0 ){
          //snake
            stroke(255,0,0);
        } else{
          //ladders
          stroke(50,205,50);}
        line(myCenter[0], myCenter[1], nextCenter[0], nextCenter[1])
      }
    }
}

class Player {
  constructor() {
    this.reset();
  }

  rollDie(){
    this.roll = Math.random(0,6);
    this.next = this.spot + this.roll;
  }

  move(){
    this.spot = this.next;
  }

  showPreview(){
    let start = max(0, this.spot);
    let end = min(this.next, tiles.length - 1);
    for(let i = start; i <= end ; i++){
      tiles[i].highlight();
    }
  }

  isSnadder(){
    let tile = tiles[this.spot];
    return(tile && tile.snadder !==0)
  }

  moveSnadder(){
    let tile = tiles[this.spot];
    this.spot += tile.snadder;
  }

  reset(){
    this.spot = -1;
    this.rolls= -1;
    this.next = - 1;
  }

  show(){
    let current = tiles[this.spot];
    if( !current) return;
    fill(255);
    let center = current.getCenter();
    ellipse(center[0], center[1], 32);
  }
}


}
