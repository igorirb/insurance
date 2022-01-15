const chai = require('chai');
const sinonChai = require('sinon-chai');

const { calculator } = require('../../../src/utils');

chai.use(sinonChai);

const { expect } = chai;

describe('src/utils/calculator', () => {
  let object;
  let parameter;
  let number;

  beforeEach(() => {
    object = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };
    parameter = 'auto';
    number = 2;
  });

  describe('addIfNumber(object, parameter, number)', () => {
    it('should deduct 2 from attribute \'auto\'', () => {
      calculator.addIfNumber(object, parameter, number);
      expect(object.auto).to.be.equal(2);
    });

    it('should deduct 2 from attribute \'disability\'', () => {
      parameter = 'disability';
      calculator.addIfNumber(object, parameter, number);
      expect(object.disability).to.be.equal(2);
    });
  });
});
