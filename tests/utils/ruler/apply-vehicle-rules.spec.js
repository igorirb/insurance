const chai = require('chai');
const sinonChai = require('sinon-chai');

const { ruler } = require('../../../src/utils');

chai.use(sinonChai);

const { expect } = chai;

describe('src/utils/ruler', () => {
  let riskProfile;
  let vehicle;

  beforeEach(() => {
    riskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };
    vehicle = { year: 1995 };
  });

  describe('applyVehicleRules(riskProfile, vehicle)', () => {
    it('should do nothing', () => {
      ruler.applyVehicleRules(riskProfile, vehicle);
      expect(riskProfile).to.be.deep.equal({
        auto: 0,
        disability: 0,
        home: 0,
        life: 0,
      });
    });

    it('should add 1 to attribute \'auto\'', () => {
      vehicle.year = 2020;
      ruler.applyVehicleRules(riskProfile, vehicle);
      expect(riskProfile).to.be.deep.equal({
        auto: 1,
        disability: 0,
        home: 0,
        life: 0,
      });
    });
  });
});
