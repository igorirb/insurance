const chai = require('chai');
const sinonChai = require('sinon-chai');

const { ruler } = require('../../../src/utils');

chai.use(sinonChai);

const { expect } = chai;

describe('src/utils/ruler', () => {
  let riskProfile;
  let age;

  beforeEach(() => {
    riskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };
    age = 70;
  });

  describe('applyAgeRules()', () => {
    it('should make disability to be ineligible', () => {
      ruler.applyAgeRules(riskProfile, age);
      expect(riskProfile).to.be.deep.equal({
        auto: 0,
        disability: 'ineligible',
        home: 0,
        life: 0,
      });
    });

    it('should subtract 1 from all attributes', () => {
      age = 40;
      ruler.applyAgeRules(riskProfile, age);
      expect(riskProfile).to.be.deep.equal({
        auto: -1,
        disability: -1,
        home: -1,
        life: -1,
      });
    });

    it('should subtract 2 from all attributes', () => {
      age = 30;
      ruler.applyAgeRules(riskProfile, age);
      expect(riskProfile).to.be.deep.equal({
        auto: -2,
        disability: -2,
        home: -2,
        life: -2,
      });
    });
  });
});
