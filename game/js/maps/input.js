'use strict';

function panUp (state) {
  var y = state.get('dwarfs.camera.position.y');
  return [
    ['dwarfs.camera.position.y', y + 0.1]
  ];
}

function panDown (state) {
  var y = state.get('dwarfs.camera.position.y');
  return [
    ['dwarfs.camera.position.y', y - 0.1]
  ];
}

function panRight (state) {
  var x = state.get('dwarfs.camera.position.x');
  return [
    ['dwarfs.camera.position.x', x + 0.1]
  ];
}

function panLeft (state) {
  var x = state.get('dwarfs.camera.position.x');
  return [
    ['dwarfs.camera.position.x', x - 0.1]
  ];
}

function zoomOut (state) {
  var zoom = state.get('dwarfs.camera.zoom');
  return [
    ['dwarfs.camera.zoom', zoom - 0.2]
  ];
}

function zoomIn (state) {
  var zoom = state.get('dwarfs.camera.zoom');
  return [
    ['dwarfs.camera.zoom', zoom + 0.2]
  ];
}

module.exports = {
  type: 'ActionMap',
  func: function Dwarfs () {
    return {
      e: [ {call: zoomIn} ],
      q: [ {call: zoomOut} ],
      w: [ {call: panUp} ],
      a: [ {call: panLeft} ],
      s: [ {call: panDown} ],
      d: [ {call: panRight} ]
    };
  }
};