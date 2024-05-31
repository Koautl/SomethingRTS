

class rts extends Phaser.Scene {
    
    constructor() {
        super({ key: 'rts' });
        this.enemyDamageCounter=0;
        this.counter=0;
        this.gold = 0; 
        this.goldTimer = null; 
        this.EnemyTimer=null;
        this.goldPerSecond = 2;
        this.easystar = new EasyStar.js()
        this.barracklimit=0;
        this.hpValue=100;
        this.enemyHP=100;
        this.grid = [
            [0, 1, 1, 1, 1,1,1,1,1,1],
            [1, 1, 1, 1, 1,1,1,1,1,1],
            [1, 1, 1, 1, 1,1,1,1,1,1],
            [1, 1, 1, 1, 1,1,1,1,1,1],
            [1, 1, 1, 1, 1,1,1,1,1,1],
            [1, 1, 1, 1, 1,1,1,1,1,0],
            [1, 1, 1, 1, 1,1,1,1,1,1],
            [1, 1, 1, 1, 1,1,1,1,1,1],
            [1, 1, 1, 1, 1,1,1,1,1,1],
            [1, 0, 1, 1, 1,1,1,1,1,0],
        ];
        this.easystar.setGrid(this.grid); 
        this.easystar.enableDiagonals();
       
       
    }
    
    
    preload ()
    {
        this.load.image('HQ','images/SomethingRTSHQICON-Recovered.jpeg');
        this.load.image('Ranger','images/RangerUseThis.jpeg');
        this.load.image('Melee','images/SomethingRTSMELEEICON.jpeg');
        this.load.image('Tank','images/SomethingRTSTANKICON.jpeg');
        this.load.image('Barracks','images/SomethingRTSBARRACKSICON-Recovered.jpeg');
        this.load.image('Miner','images/SomethingRTSMINERICON-Recovered.jpeg');
        this.load.image('HQ1','images/HEADQUARTERS.jpg');
        this.load.image('Barracks1','images/BarracksArt.png');
        this.load.image('GoldNode','images/Gold Node.jpeg');
        this.load.image('EnemyHQ','images/EnemeyHQ.jpeg');
        this.load.image('Replay','images/newgame.jpg')

    }

    create ()
    {
       

    
    this.goldText = this.add.text(725, 16, 'Gold: 0', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
    this.EnemyText = this.add.text(50, 8, 'Enemy HP: 0', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
    this.startGoldTimer();
    this.startEnemyTimer();
    const EnemyHQ = this.add.image(20, 20, 'EnemyHQ');
    const button = this.add.image(200, 300, 'HQ');
    const RangerButton = this.add.image(615, 765, 'Ranger');
    const MeleeButton = this.add.image(650, 765, 'Melee');
    const TankButton = this.add.image(685, 765, 'Tank');
    const BarracksButton = this.add.image(685, 800, 'Barracks');
    const MinerButton = this.add.image(650, 800, 'Miner');
    const HQ = this.add.image(750,750,'HQ1');
    const GoldNode = this.add.image(125,755,'GoldNode');
    const GoldNode2 = this.add.image(755,445,'GoldNode');
    const Barrack = this.add.image(750,670,'Barracks1');
     this.NewGame = this.add.image(400,400,'Replay');
    button.setVisible(false);
        
   Barrack.setVisible(false);

    HQ.setInteractive();
    let hpValue = 100;
    let enHPvalue =100;
   
    this.HQHP = this.add.text(725, 40, 'HP: ' + hpValue, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' });
    
    BarracksButton.setVisible(false);
    MinerButton.setVisible(false);
   
    HQ.on('pointerdown', function() {
        MinerButton.setVisible(!MinerButton.visible);
        BarracksButton.setVisible(!BarracksButton.visible);
       
    });
    
    BarracksButton.setInteractive();
        BarracksButton.on('pointerdown',this.createBarracks.bind(this));
        BarracksButton.on('pointerdown',function(){

            Barrack.setVisible(!Barrack.visible)

        });
       
    MinerButton.setInteractive();
        MinerButton.on('pointerdown',this.createMiner.bind(this));
        
    Barrack.setInteractive();
   
        RangerButton.setVisible(false);
        MeleeButton.setVisible(false);
        TankButton.setVisible(false);

        Barrack.on('pointerdown',function(){

            RangerButton.setVisible(!RangerButton.visible);
            MeleeButton.setVisible(!MeleeButton.visible);
            TankButton.setVisible(!TankButton.visible);

        });
    

        RangerButton.setInteractive();
        RangerButton.on('pointerdown',this.createRanger.bind(this));

        MeleeButton.setInteractive();
        MeleeButton.on('pointerdown',this.createMelee.bind(this));

        TankButton.setInteractive();
        TankButton.on('pointerdown',this.createTank.bind(this));


        this.NewGame.setVisible(false); 

      
        this.NewGame.setInteractive();
    
     
        this.NewGame.on('pointerup', () => {
        this.scene.restart(); 
        this.gold = 0;
        this.hpValue = 100;
        this.enemyHP = 100;
        this.goldPerSecond = 2;
        this.counter = 0;
        this.enemyDamageCounter=0;
        this.startGoldTimer();
       
        });
    
       
       

        
    }

    
    update() {
        this.EnemyText.setText('Enemy HP:'+this.enemyHP);
        this.goldText.setText('Gold: ' + this.gold);
        this.HQHP.setText('HP: ' + this.hpValue);
        if (this.enemyHP <= 0 || this.hpValue <= 0) {
           if(this.enemyHP <= 0){
            this.EnemyText.setText('Enemy HP:'+0);
           } else if(this.hpValue <= 0){
            this.HQHP.setText('HP: ' + 0);
           }
           
           this.NewGame.setVisible(!this.NewGame.visible);
            
        }
      
    }

    
    startGoldTimer() {
       this.gold=60;
        this.goldTimer = this.time.addEvent({
            delay: 1000, 
            callback: this.addGold, 
            callbackScope: this,
            loop: true 
        });
    }
    startEnemyTimer() {
        
         this.EnemyTimer = this.time.addEvent({
             delay: 4000, 
             callback: this.addEnenmy, 
             callbackScope: this,
             loop: true 
         });
     }
 
    addGold() {
        
        this.gold += this.goldPerSecond;
    }
    addEnenmy() {
        
        const enemy = new Enemy(this, 40, 40);
        this.enemy=enemy;
        
        this.enemy.move(700,700);
        console.log('Enemy created!');
    }

    createMiner() {
        const minerCost = 20; 
        
        
        if (this.gold < minerCost) {
            console.log('Not enough gold to create a miner!');
            return;
        }else {
        this.counter+=1;
        
        if(this.counter<5){
        this.gold -= minerCost;
        
        
        const miner = new Miner(this, 700, 730);
        this.miner = miner;
            if(this.counter==3){
                this.miner.move(-600,0-3);
                console.log(this.counter)
            }else if(this.counter==4){
            this.miner.move(-560,43);
            console.log(this.counter)
            }else if(this.counter==1){
                this.miner.move(70,-320);
                console.log(this.counter)
            }else if(this.counter==2){
                this.miner.move(20,-260);
                console.log(this.counter)
            }
   
        }else{
            console.log ("max miners reached!")
        }

        }
    }
    createRanger() {
        
        const rangerCost = 15; 
        if (this.gold < rangerCost) {
            console.log('Not enough gold to create a ranger!');
            return;
        }
        this.gold -= rangerCost;
        const ranger = new Ranger(this, 700, 710);
        this.ranger = ranger;
       

        this.ranger.move(-600,-600);
       

        console.log('Ranger created!');
    }
    createMelee() {
        
        const meleeCost = 10; 
        if (this.gold < meleeCost) {
            console.log('Not enough gold to create a melee unit!');
            return;
        }

        
        this.gold -= meleeCost;
        const melee = new Melee(this, 700, 710);
        this.melee = melee;
       

      this.melee.move(-680,-680);

        
        
       
        console.log('Melee created!');
    }
    createTank() {
        
        const tankCost = 25; 
        if (this.gold < tankCost) {
            console.log('Not enough gold to create a Tank!');
            return;
        }

        
        this.gold -= tankCost;

        const tank = new Tank(this, 700, 700);
        this.tank = tank;
       

        this.tank.move(-680,-680);
    }
    createBarracks(Barrack) {
        const BarrackCost = 5;
        
        if (this.barracklimit>0){

            console.log("You alreadly have a barracks")
            return;
        }

        
        if (this.gold < BarrackCost) {
            console.log('Not enough gold to create the barracks!');
            return;
        } else{


            this.gold -= BarrackCost;
        this.barracklimit=this.barracklimit+1;
       
       
            console.log(this.barracklimit)
       
           
        }
    }
    
}


class Miner {
    constructor(scene, x, y) {
        this.hp = 2;
        this.damage =0;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.graphics = scene.add.graphics();
      
        this.graphics.fillStyle(0xFFA500, 1); // Orange color
        this.graphics.fillRect(x, y, 10, 10);
    }

    move(moveToX, moveToY) {
      
        this.scene.tweens.add({
            targets: this.graphics,
            x: moveToX ,
            y: moveToY ,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
               
                this.x = moveToX;
                this.y = moveToY;
                this.scene.goldPerSecond+=1;
                
                
            }
        });
    }
    
}
class Enemy {
    
    constructor(scene, x, y) {
        this.scene = scene;
        this.hp=2;
        this.damage=1+this.scene.enemyDamageCounter;
        this.x = x;
        this.y = y;
        this.graphics = scene.add.graphics();
        this.width = 10;
        this.height = 10;
        this.graphics.fillStyle(0xFF0000, 1); 
        this.graphics.fillRect(x, y, this.width, this.height);
    }

    move(moveToX, moveToY) {
       

        this.scene.tweens.add({
            targets: this.graphics,
            x: moveToX ,
            y: moveToY ,
            duration: 10000,
            ease: 'Linear',
            onComplete: () => {
                
              if( this.scene.enemyDamageCounter>3){
                this.scene.enemyDamageCounter=3;
              }else{
              this.scene.enemyDamageCounter++;
              }
                this.graphics.destroy();
                this.scene.hpValue -= this.damage;
                console.log( this.scene.hpValue)
            }
        });
    }
}
class Melee {
    constructor(scene, x, y) {
        this.scene = scene;
        this.hp=2;
        this.damage=4;
        this.x = x;
        this.y = y;
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x0000FF0, 1); 
        this.graphics.fillRect(x, y, 10,10);
    }

    move(moveToX, moveToY) {
     
        this.scene.tweens.add({
            targets: this.graphics,
            x: moveToX ,
            y: moveToY ,
            duration:8000,
            ease: 'Linear',
            onComplete: () => {
             
                this.scene.enemyHP -= this.damage;
                
                this.graphics.destroy();
            }
        });
    }
}
class Tank {
    constructor(scene, x, y) {
        this.scene = scene;
        this.hp=2;
        this.damage=10;
        this.x = x;
        this.y = y;
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x800080, 1);
        this.graphics.fillRect(x, y, 10,10);
    }

    move(moveToX, moveToY) {
        
        this.scene.tweens.add({
            targets: this.graphics,
            x: moveToX ,
            y: moveToY ,
            duration: 8000*2,
            ease: 'Linear',
            onComplete: () => {

                this.scene.enemyHP -= this.damage;
                this.graphics.destroy();
            }
        });
    }
}
class Ranger {
    constructor(scene, x, y) {
        this.scene = scene;
        this.damage = 6;
        this.x = x;
        this.y = y;
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x00FF00, 1); 
        this.graphics.fillRect(x, y, 10, 10);
    }

    move(moveToX, moveToY) {
     

        this.scene.tweens.add({
            targets: this.graphics,
            x: moveToX ,
            y: moveToY ,
            duration: 8000,
            ease: 'Linear',
            onComplete: () => {
                this.scene.enemyHP -= this.damage;
               
                this.graphics.destroy();
            }
        });
    }
}


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: rts,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
};
const game = new Phaser.Game(config);



