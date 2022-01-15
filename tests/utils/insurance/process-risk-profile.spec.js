const chai = require('chai');
const sinonChai = require('sinon-chai');

const { insurance } = require('../../../src/utils');

chai.use(sinonChai);

const { expect } = chai;

describe('src/utils/insurance', () => {
  let riskProfile;

  beforeEach(() => {
    riskProfile = {
      auto: 2,
      disability: 'ineligible',
      home: -1,
      life: 5,
    };
  });

  describe('processRiskProfile(riskProfile)', () => {
    it('should process risk profile', () => {
      const result = insurance.processRiskProfile(riskProfile);
      expect(result).to.be.deep.equal({
        auto: 'regular',
        disability: 'ineligible',
        home: 'economic',
        life: 'responsible',
      });
    });
  });
});
