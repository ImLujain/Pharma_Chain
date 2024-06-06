const MedicineTemperatureTracker = artifacts.require("MedicineTemperatureTracker");

module.exports = function(deployer) {
  deployer.deploy(MedicineTemperatureTracker);
};


