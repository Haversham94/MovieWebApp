/**
 * Cast model events
 */

'use strict';

import {EventEmitter} from 'events';
var Cast = require('./cast.model');
var CastEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CastEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cast.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CastEvents.emit(event + ':' + doc._id, doc);
    CastEvents.emit(event, doc);
  }
}

export default CastEvents;
