var app = new PIXI.Application({width: 1000, height: 800});


document.body.appendChild(app.view);


PIXI.loader
    .add('alien', 'https://raw.githubusercontent.com/betosolano/spinetests/master/alien.json')
    .load(onLoaded);

var params = {
    alienQuantity: 100
};


var alienList = [];
// Handle the load completed
function onLoaded (loader,res) {
   
    for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
        alienList[alienIndex] = new PIXI.spine.Spine(res.alien.spineData);
        //alienList[alienIndex].skeleton.setSlotsToSetupPose();
        
        alienList[alienIndex].x = 200 + alienIndex * 5;
        alienList[alienIndex].y = 500 ;
        alienList[alienIndex].state.setAnimation(0, 'death', true);
        app.stage.addChild(alienList[alienIndex]);
    }
    
}