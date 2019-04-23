var app = new PIXI.Application({width: 1000, height: 800});
document.body.appendChild(app.view);

PIXI.loader
    .add("goblins", "https://raw.githubusercontent.com/betosolano/spinetests/master/pngsequence.json")
    .load(onLoaded);

var params = {
    alienQuantity: 200,
    refreshFrequency : 15
};

var data = {
    textureIndex : 0,
    id: [],
    ticketGap : 1000 / params.refreshFrequency,
    nextTickTime : 1000 / params.refreshFrequency,
    textures : [],
    alienList : []
}

// Handle the load completed
function onLoaded (loader,res) {
    console.log("loaded");
    data.id = PIXI.loader.resources["goblins"].textures; 
    for(var alienIndex = 0; alienIndex < 100; alienIndex++){
        data.alienList[alienIndex] = new PIXI.Sprite(data.id["alien-ess-death_0.png"]);
        app.stage.addChild(data.alienList[alienIndex]);
        
        data.alienList[alienIndex].x = 0 - alienIndex * 5;
        data.alienList[alienIndex].y = -200 ;
    }
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
    data.nextTickTime -= app.ticker.elapsedMS;
    if(data.nextTickTime < 0){
        data.textureIndex = data.textureIndex > 35? 0: data.textureIndex+1;
        if(data.textures[data.textureIndex] == undefined){
            data.textures[data.textureIndex] = PIXI.Texture.from(data.id["alien-ess-death_" + data.textureIndex + ".png"])
        }
        for(var alienIndex = 0; alienIndex < params.alienQuantity; alienIndex++){
            data.alienList[alienIndex].texture = data.textures[data.textureIndex];
        }
        data.nextTickTime = data.ticketGap;
    }
}
