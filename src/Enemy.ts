///<reference path="objects/SpaceShip"/>
class Enemy extends SpaceShip{
	state:PlayState
	
	moveWeight:number=0;
	moveRelease:number=0;
	accelaration:number=0;
	maxSpeed:number=0;
	constructor(state:PlayState,sprite_id:string,maxSpeed:number=100,accelaration:number=50){
		super(state.game);
		this.maxSpeed=maxSpeed;
		this.accelaration=accelaration;
		this.state=state;
		
		this.shipBody = new Phaser.Sprite(state.game,0,0,sprite_id);
		state.physics.enable(this.shipBody,Phaser.Physics.ARCADE);
		this.shipBody.anchor.setTo(0.5,0.5);

		this.addChild(this.shipBody);

		
		

	}

	init(){

	}
	getSpeed():number{
		return Math.sqrt(Math.pow(this.shipBody.body.velocity.x,2)+Math.pow(this.shipBody.body.velocity.x,2));
	}
	update(){
		 //console.log(this.state.hero.physics_body.position.x,this.body.body.position.x);
		 //this.body.body.position.x=this.state.hero.physics_body.position.x-(this.body.width/2);
		// this.body.body.position.y=this.state.hero.physics_body.position.y-(this.body.height/2);
		 //this.body.body.velocity.x=this.state.hero.physics_body.position.x-(this.getX()+this.moveWeight);
		 //this.body.body.velocity.y=this.state.hero.physics_body.position.y-(this.getY()+this.moveWeight);
		 //var vY=this.state.hero.physics_body.position.y-this.body.body.position.y-this.moveWeight;
		 //this.body.body.velocity.y=vY//> this.moveRelease?vY:this.moveRelease;

		 var a = this.state.hero.getX()-this.getX();
		 var b = this.state.hero.getY()-this.getY();

		 var vx=this.accelaration*Math.sin(Math.atan2(a,b));
		 var vy=this.accelaration*Math.cos(Math.atan2(a,b));

		
		
		this.shipBody.body.velocity.y=vy;
		this.shipBody.body.velocity.x=vx;
		// if(this.getSpeed()>this.maxSpeed){
		// 	console.log(this.getSpeed());
		//  	this.shipBody.body.acceleration.y=0;
		// 	this.shipBody.body.acceleration.x=0;
		// }else{

		// }
		
		// if(Math.abs(this.shipBody.body.velocity.y)>this.maxSpeed){
		//   	this.shipBody.body.acceleration.y=0;
		//   	this.shipBody.body.velocity.y=vy;
		// }
		// if(Math.abs(this.shipBody.body.velocity.x)>this.maxSpeed){
		//   	this.shipBody.body.acceleration.x=0;
		//   	this.shipBody.body.velocity.x=vx;
		// }
		//console.log(this.shipBody.body.velocity.y);
		 this.shipBody.body.rotation=Math.atan2(a,b)*(-180 / Math.PI);
		 
		 
		
		 this.game.physics.arcade.overlap(this.shipBody, this.state.hero.gun.bullets, this.collisionHandler, null, this);
	}

	collisionHandler(enemy:Phaser.Sprite,bullet:Phaser.Sprite){
		bullet.kill();
		var explosion=new Phaser.Sprite(this.state.game,this.getX(),this.getY(),'explosion');
		explosion.anchor.setTo(0.5,0.5);
		explosion.animations.add('explosion');
		explosion.animations.getAnimation('explosion').play(30,false,true);
		this.state.enemyLayer.add(explosion);
		
		this.destroy(true);
		console.log("COLLISION bullet");
	}
}