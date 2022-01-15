const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { insurance, ruler } = require('../../../src/utils');

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
      const processRiskProfile = sinon.spy(insurance, 'processRiskProfile');
      const applyAgeRules = sinon.spy(ruler, 'applyAgeRules');
      const applyIncomeRules = sinon.spy(ruler, 'applyIncomeRules');
      const applyIneligibilityRules = sinon.spy(ruler, 'applyIneligibilityRules');
      const applyHouseRules = sinon.spy(ruler, 'applyHouseRules');
      const applyDependentsRules = sinon.spy(ruler, 'applyDependentsRules');
      const applyMaritalStatusRules = sinon.spy(ruler, 'applyMaritalStatusRules');
      const applyVehicleRules = sinon.spy(ruler, 'applyVehicleRules');

      const result = insurance.getRiskProfile(input);
      expect(result).to.be.deep.equal({
        auto: 'regular',
        disability: 'ineligible',
        home: 'economic',
        life: 'regular',
      });

      expect(processRiskProfile.called).to.be.equal(true);
      expect(applyAgeRules.called).to.be.equal(true);
      expect(applyIncomeRules.called).to.be.equal(true);
      expect(applyIneligibilityRules.called).to.be.equal(true);
      expect(applyHouseRules.called).to.be.equal(true);
      expect(applyDependentsRules.called).to.be.equal(true);
      expect(applyMaritalStatusRules.called).to.be.equal(true);
      expect(applyVehicleRules.called).to.be.equal(true);
    });
  });
});
