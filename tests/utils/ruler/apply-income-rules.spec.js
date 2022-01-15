const chai = require('chai');
const sinonChai = require('sinon-chai');

const { ruler } = require('../../../src/utils');

chai.use(sinonChai);

const { expect } = chai;

describe('src/utils/ruler', () => {
  let riskProfile;
  let income;

  beforeEach(() => {
    riskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };
    income = 100000;
  });

  describe('applyIncomeRules()', () => {
    it('should do nothing', () => {
      ruler.applyIncomeRules(riskProfile, income);
      expect(riskProfile).to.be.deep.equal({
        auto: 0,
        disability: 0,
        home: 0,
        life: 0,
      });
    });

    it('should subtract 1 from all attributes', () => {
      income = 300000;
      ruler.applyIncomeRules(riskProfile, income);
      expect(riskProfile).to.be.deep.equal({
        auto: -1,
        disability: -1,
        home: -1,
        life: -1,
      });
    });
  });
});
