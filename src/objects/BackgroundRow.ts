class BackgroundRow extends Phaser.Group{
	game:Game;
	state:PlayState;
	constructor(bk:BackgroundBlock){
		super(bk.game);
		this.state=bk.state;
		this.game=bk.game;
		let columns=Math.ceil(this.game.globalWidth()/bk.blockWidth);
		for(var i:number=0;i<columns;i++){
			let s=new Phaser.Sprite(this.game,bk.blockWidth*i,0,'back_sprite',"bge_0"+Phaser.Math.between(1,8)+".png");
			this.addChild(s);
		}
		this.y=-bk.blockHeight;
	}

	update(){
		
		if(this.y>this.game.globalHeight()){
			this.destroy(true);
		}else{
			this.y+=this.state.levelData.background.speed;
		}
	}
}