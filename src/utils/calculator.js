const _ = require('lodash');

const deductIfNumber = (object, parameter, number) => {
  if (_.isNumber(object[parameter])) {
    object[parameter] -= number;
  }
};

const addIfNumber = (object, parameter, number) => {
  if (_.isNumber(object[parameter])) {
    object[parameter] += number;
  }
};

Object.assign(exports, {
  deductIfNumber,
  addIfNumber,
});
