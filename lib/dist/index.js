'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _entityField = require('./entity-field');

var _entityField2 = _interopRequireDefault(_entityField);

var _entityMap = require('./entity-map');

var _entityMap2 = _interopRequireDefault(_entityMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_entity2.default.Field = _entityField2.default;
_entity2.default.Map = _entityMap2.default;

exports.default = _entity2.default;

// export default 'Hello!';