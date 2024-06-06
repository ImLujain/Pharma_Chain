// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MedicineTemperatureTracker {
    struct Medicine {
        uint tempRegistration;
        uint tempDistributor;
        uint tempPharmacy;
    }

    mapping(string => Medicine) public medicines;

    // Event declarations
    event MedicineRegistered(string medicineId, uint temperature);
    event TemperatureUpdated(string medicineId, uint temperature, string phase);

    // Register a new medicine
    function registerMedicine(string memory _id, uint _temp) public {
        medicines[_id] = Medicine(_temp, 0, 0);
        emit MedicineRegistered(_id, _temp);
    }

    // Update temperature at distributor
    function updateDistributorTemp(string memory _id, uint _temp) public {
        medicines[_id].tempDistributor = _temp;
        emit TemperatureUpdated(_id, _temp, "distributor");
    }

    // Update temperature at pharmacy
    function updatePharmacyTemp(string memory _id, uint _temp) public {
        medicines[_id].tempPharmacy = _temp;
        emit TemperatureUpdated(_id, _temp, "pharmacy");
    }
}
