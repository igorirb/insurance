const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const utils = require('../../../src/utils/insurance');

chai.use(sinonChai);

const { expect } = chai;

describe('src/utils/insurance', () => {
  let input;

  beforeEach(() => {
    input = {
      age: 35,
      dependents: 2,
      house: {
        ownership_status: 'owned',
      },
      income: 0,
      marital_status: 'married',
      risk_questions: [0, 1, 0],
      vehicle: {
        year: 2018,
      },
    };
  });

  describe('getRiskProfile()', () => {
    it('should process risk profile', () => {
      const method = sinon.spy(utils, 'processRiskProfile');
      const result = utils.getRiskProfile(input);
      expect(method).to.have.been.called;
      expect(result).to.be.deep.equal({
        auto: 'regular',
        disability: 'ineligible',
        home: 'economic',
        life: 'regular',
      });
    });
  });
});
