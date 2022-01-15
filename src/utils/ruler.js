const _ = require('lodash');
const moment = require('moment');

const calculator = require('./calculator');

const applyAgeRules = (riskProfile, age) => {
  if (age >= 60) {
    riskProfile.disability = 'ineligible';
  } else if (age <= 30) {
    calculator.deductIfNumber(riskProfile, 'auto', 2);
    calculator.deductIfNumber(riskProfile, 'disability', 2);
    calculator.deductIfNumber(riskProfile, 'home', 2);
    calculator.deductIfNumber(riskProfile, 'life', 2);
  } else if (age <= 40) {
    calculator.deductIfNumber(riskProfile, 'auto', 1);
    calculator.deductIfNumber(riskProfile, 'disability', 1);
    calculator.deductIfNumber(riskProfile, 'home', 1);
    calculator.deductIfNumber(riskProfile, 'life', 1);
  }
};

const applyIncomeRules = (riskProfile, income) => {
  if (income > 200000) {
    calculator.deductIfNumber(riskProfile, 'auto', 1);
    calculator.deductIfNumber(riskProfile, 'disability', 1);
    calculator.deductIfNumber(riskProfile, 'home', 1);
    calculator.deductIfNumber(riskProfile, 'life', 1);
  }
};

const applyIneligibilityRules = (
  riskProfile,
  income,
  vehicle,
  house,
) => {
  if (!income) {
    riskProfile.disability = 'ineligible';
  }
  if (!vehicle) {
    riskProfile.auto = 'ineligible';
  }
  if (!house) {
    riskProfile.home = 'ineligible';
  }
};

const applyHouseRules = (riskProfile, house) => {
  if (house && house.ownership_status === 'mortgaged') {
    calculator.addIfNumber(riskProfile, 'disability', 1);
    calculator.addIfNumber(riskProfile, 'home', 1);
  }
};

const applyDependentsRules = (riskProfile, dependents) => {
  if (dependents > 0) {
    calculator.addIfNumber(riskProfile, 'disability', 1);
    calculator.addIfNumber(riskProfile, 'life', 1);
  }
};

const applyMaritalStatusRules = (riskProfile, marital_status) => {
  if (marital_status && marital_status === 'married') {
    calculator.deductIfNumber(riskProfile, 'disability', 1);
    calculator.addIfNumber(riskProfile, 'life', 1);
  }
};

const applyVehicleRules = (riskProfile, vehicle) => {
  if (vehicle) {
    const { year } = vehicle;
    if (moment().year() - _.parseInt(year) <= 5) {
      calculator.addIfNumber(riskProfile, 'auto', 1);
    }
  }
};

Object.assign(exports, {
  applyAgeRules,
  applyIncomeRules,
  applyIneligibilityRules,
  applyHouseRules,
  applyDependentsRules,
  applyMaritalStatusRules,
  applyVehicleRules,
});
