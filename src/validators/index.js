const requireAll = require('require-all');

const validators = requireAll({
  dirname: __dirname,
});

delete validators.index;
Object.assign(exports, validators);
