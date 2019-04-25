var app = new PIXI.Application({width: 1000, height: 800});
document.body.appendChild(app.view);

PIXI.loader
    .add("goblins", "https://raw.githubusercontent.com/betosolano/spinetests/master/OtherTest/stormlords.json")
    .load(onLoaded);

var params = {
    alienQuantity: 1,
    refreshFrequency : 15
};

var data = {
    textureIndex : 0,
    id: [],
    ticketGap : 1000 / params.refreshFrequency,
    nextTickTime : 1000 / params.refreshFrequency,
    textures : [],
    alienList : [], 
    murodia1 : null, 
    murodia2 : null,
    alphaReduce: 0.1
}

// Handle the load completed
function onLoaded (loader,res) {
    console.log("loaded");
    data.id = PIXI.loader.resources["goblins"].textures; 
    data.murodia2 =  new PIXI.Sprite(data.id["WheelBoxReelsBackgroundL0.png"]);
    data.murodia1 =  new PIXI.Sprite(data.id["WheelBoxReelsBackgroundLLit0.png"]);
    
    app.stage.addChild(data.murodia2);
    app.stage.addChild(data.murodia1);
    /*
    for(var alienIndex = 0; alienIndex < 100; alienIndex++){
        data.alienList[alienIndex] = new PIXI.Sprite(data.id["alien-ess-death_0.png"]);
        app.stage.addChild(data.alienList[alienIndex]);
        
        data.alienList[alienIndex].x = 0 - alienIndex * 5;
        data.alienList[alienIndex].y = -200 ;
    }*/
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
    data.nextTickTime -= app.ticker.elapsedMS;
    if(data.nextTickTime < 0){
        if(data.murodia1.alpha < 0){
            data.alphaReduce = 0.1;
        }
        if(data.murodia1.alpha > 1){
            data.alphaReduce = -0.1;
        }
        
        data.murodia1.alpha += data.alphaReduce;
        /*data.textureIndex = data.textureIndex > 35? 0: data.textureIndex+1;
        if(data.textures[data.textureIndex] == undefined){
            data.textures[data.textureIndex] = PIXI.Texture.from(data.id["alien-ess-death_" + data.textureIndex + ".png"])
        }
        for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
            data.alienList[alienIndex].texture = data.textures[data.textureIndex];
        }*/
        data.nextTickTime = data.ticketGap;
    }
}
