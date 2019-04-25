var app = new PIXI.Application({width: 1000, height: 800});


document.body.appendChild(app.view);


PIXI.loader
    .add('alien', 'https://raw.githubusercontent.com/betosolano/spinetests/master/alien.json')
    .load(onLoaded);

var params = {
    alienQuantity: 4,
    useAutoUpdate: true,
    useHardCodedUpdate: false,
    useManualTicker: false,
    refreshFrequency : 15
};

var data = {
    ticketGap : 1000 / params.refreshFrequency,
    nextTickTime : 1000 / params.refreshFrequency
    
}
var alienList = [];
// Handle the load completed
function onLoaded (loader,res) {
    for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
        alienList[alienIndex] = new PIXI.spine.Spine(res.alien.spineData);
        alienList[alienIndex].skeleton.setSlotsToSetupPose();
        alienList[alienIndex].skeleton.setToSetupPose();
        alienList[alienIndex].update(0);
        alienList[alienIndex].autoUpdate = params.useAutoUpdate;
        alienList[alienIndex].x = 200 + alienIndex * 5;
        alienList[alienIndex].y = 500 ;
        alienList[alienIndex].state.setAnimation(0, 'jump', true);
        app.stage.addChild(alienList[alienIndex]);
    }
    
    if( params.useHardCodedUpdate){ 
         app.ticker.add(delta => gameLoopHardCodedUpdate(delta));
    }
    if(params.useManualTicker){
         app.ticker.add(delta => gameLoopManualTicker(delta));
    }
}


function gameLoopHardCodedUpdate(delta){
    for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
    // update the spine animation, only needed if alien.autoupdate is set to false
       alienList[alienIndex].update(0.0015);
    }
}

function gameLoopManualTicker(delta){
    data.nextTickTime -= app.ticker.elapsedMS;
    if(data.nextTickTime < 0){
        for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
           alienList[alienIndex].update(0.0666);
        }
        data.nextTickTime = data.ticketGap;
    }
}

