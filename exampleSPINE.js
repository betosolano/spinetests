var app = new PIXI.Application({width: 1000, height: 800});


document.body.appendChild(app.view);


PIXI.loader
    .add('alien', 'https://raw.githubusercontent.com/betosolano/spinetests/master/alien.json')
    .load(onLoaded);

var params = {
    alienQuantity: 20
};


var alienList = [];
// Handle the load completed
function onLoaded (loader,res) {
    for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
        alienList[alienIndex] = new PIXI.spine.Spine(res.alien.spineData);
        alienList[alienIndex].skeleton.setSlotsToSetupPose();
        alienList[alienIndex].skeleton.setToSetupPose();
        alienList[alienIndex].update(0);
        alienList[alienIndex].autoUpdate = false;
        alienList[alienIndex].x = 200 + alienIndex * 5;
        alienList[alienIndex].y = 500 ;
        alienList[alienIndex].state.setAnimation(0, 'death', true);
        app.stage.addChild(alienList[alienIndex]);
    }
    app.ticker.add(function() {
        for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
        // update the spine animation, only needed if dragon.autoupdate is set to false
            alienList[alienIndex].update(0.015); // HARDCODED FRAMERATE!
            //console.log(alienList);
        }
    });
}

 