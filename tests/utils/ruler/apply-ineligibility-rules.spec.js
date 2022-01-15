const chai = require('chai');
const sinonChai = require('sinon-chai');

const { ruler } = require('../../../src/utils');

chai.use(sinonChai);

const { expect } = chai;

describe('src/utils/ruler', () => {
  let riskProfile;
  let income;
  let vehicle;
  let house;
  let args;

  beforeEach(() => {
    riskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };
    income = 100000;
    vehicle = { year: 2000 };
    house = { ownership_status: 'owned' };
    args = {
      income,
      vehicle,
      house,
    };
  });

  describe('applyIneligibilityRules(riskProfile, args)', () => {
    it('should do nothing', () => {
      ruler.applyIneligibilityRules(riskProfile, args);
      expect(riskProfile).to.be.deep.equal({
        auto: 0,
        disability: 0,
        home: 0,
        life: 0,
      });
    });

    it('should make disability to be ineligible', () => {
      args.income = 0;
      ruler.applyIneligibilityRules(riskProfile, args);
      expect(riskProfile).to.be.deep.equal({
        auto: 0,
        disability: 'ineligible',
        home: 0,
        life: 0,
      });
    });

    it('should make auto to be ineligible', () => {
      args.vehicle = null;
      ruler.applyIneligibilityRules(riskProfile, args);
      expect(riskProfile).to.be.deep.equal({
        auto: 'ineligible',
        disability: 0,
        home: 0,
        life: 0,
      });
    });

    it('should make home to be ineligible', () => {
      args.house = null;
      ruler.applyIneligibilityRules(riskProfile, args);
      expect(riskProfile).to.be.deep.equal({
        auto: 0,
        disability: 0,
        home: 'ineligible',
        life: 0,
      });
    });
  });
});
