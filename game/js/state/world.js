'use strict';

module.exports = {
  type: 'StateSeed',
  func: function Dwarfs () {

    var width = 60;
    var length = 60;
    var map = new Array(width * length);
    var height = 0;
    var rand;

    for(var i = 0; i < width; i++) {
      rand = Math.random();
      height = rand > 0.5 ? height : height - 1;
      map[i * width] = {
        id: i * width,
        x: i,
        y: 0,
        z: height
      };
    }
    height = 0;
    for(var j = 0; j < length; j++) {
      rand = Math.random();
      height = rand > 0.5 ? height : height - 1;
      map[j] = {
        id: j,
        x: 0,
        y: j,
        z: height
      };
    }
    for(var x = 1; x < width; x++) {
      for(var y = 1; y < length; y++) {
        rand = Math.random();
        height = Math.min(map[x * width+(y-1)].z, map[(x-1) * width + y].z);
        height = rand > 0.2 ? height : height - 1;
        map[x * width + y] = {
          id: x * width + y,
          x: x,
          y: y,
          z: height
        };
      }
    }

    return {
      dwarfs: {
        world: {
          length: 100,
          width: 100,
          cells: map
        },
        camera: {
          zoom: 1.0,
          position: {
            x: 0, y: 0
          }
        }
      }
    };
  }
};