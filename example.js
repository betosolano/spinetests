var app = new PIXI.Application({width: 1000, height: 800});


document.body.appendChild(app.view);


PIXI.loader
    .add('goblins', 'https://raw.githubusercontent.com/betosolano/spinetests/master/alien.json')
    .load(onLoaded);

var goblin;
// Handle the load completed
function onLoaded (loader,res) {

    goblin = new PIXI.spine.Spine(res.goblins.spineData);

    // set current skin
    //goblin.skeleton.setSkinByName('skeleton');
    goblin.skeleton.setSlotsToSetupPose();

    // set the position
    goblin.x = 450;
    goblin.y = 600;
    goblin.scale = {x: 0.4, y:0.4}
    // play animation
    goblin.state.setAnimation(0, 'death', true);
    app.stage.addChild(goblin);

    app.stage.on('pointertap', onClick);
    
}

function onClick () {
    console.log("x");
}