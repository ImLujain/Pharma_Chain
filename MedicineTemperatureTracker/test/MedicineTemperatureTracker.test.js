const MedicineTemperatureTracker = artifacts.require("MedicineTemperatureTracker");

contract("MedicineTemperatureTracker", accounts => {
    let trackerInstance;

    before(async () => {
        trackerInstance = await MedicineTemperatureTracker.deployed();
    });

    it("should register a medicine", async () => {
        await trackerInstance.registerMedicine("MED001", 25, {from: accounts[0]});
        const result = await trackerInstance.medicines("MED001");
        assert.equal(result.tempRegistration.toNumber(), 25, "The temperature was not set correctly.");
    });

    it("should update distributor temperature", async () => {
        await trackerInstance.updateDistributorTemp("MED001", 30, {from: accounts[0]});
        const result = await trackerInstance.medicines("MED001");
        assert.equal(result.tempDistributor.toNumber(), 30, "The distributor temperature was not updated correctly.");
    });

    // Add more tests as necessary
});
