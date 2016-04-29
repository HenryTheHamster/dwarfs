'use strict';

var PIXI = require('pixi.js');

module.exports = {
  type: 'OnClientReady',
  deps: ['DefinePlugin', 'Config', '$', 'StateTracker'],
  func: function MyView (define, config, $, tracker) {
    function sortChildren (stage) {
      stage.children.sort(function(a,b) {
        if(a.zIndex < b.zIndex) {
          return -1;
        }
        if(a.zIndex > b.zIndex) {
          return 1;
        }
        return 0;
      });
    }
    var stage;
    var stoneTexture = new PIXI.Texture.fromImage('/game/assets/stone02.png');
    function createBlock (id, blockData ) {
      var sprite = new PIXI.Sprite(stoneTexture);
      sprite.position.x = (-blockData.x * 64  / 2) + (blockData.y * 64  / 2);
      sprite.position.y = ((blockData.y - blockData.z) * 32 / 2) - (-(blockData.x - blockData.z) * 32 / 2);
      sprite.zIndex = (blockData.x + blockData.y);
      stage.addChild(sprite);
      sortChildren(stage);
    }

    function zoom(value) {
      // stage.scale.x = value;
      // stage.scale.y = value;
    }

    function pan(value) {
      stage.position.x = value.x * -50;
      stage.position.y = value.y * 50;
    }

    return function setup (dims) {
      stage = new PIXI.Container();
      var renderer = PIXI.autoDetectRenderer(dims.usableWidth, dims.usableHeight);
      $()('#' + config().client.element).append(renderer.view);
      
      tracker().onChangeOf('dwarfs.camera.position', pan, [stage]);
      tracker().onChangeOf('dwarfs.camera.zoom', zoom, [stage]);
      tracker().onElementAdded('dwarfs.world.cells', createBlock, []);


      define()('OnRenderFrame', function OnRenderFrame () {
        return function renderScene () {
          renderer.render(stage);
        };
      });
    };
  }
};