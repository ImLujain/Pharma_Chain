console.log("Starting app.js");
// Always use Ganache as the provider
const ganacheUrl = "http://localhost:7545";
web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));


//const contractAddress = '0x51C08214354d3Cea0F57aF972c7FB6B116Fa5276';

const contractAddress = '0x90A2c742AcCb8eB8DF0812a2029A49EeA6Dcba0c';


const abi =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "medicineId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "temperature",
        "type": "uint256"
      }
    ],
    "name": "MedicineRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "medicineId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "temperature",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "phase",
        "type": "string"
      }
    ],
    "name": "TemperatureUpdated",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "medicines",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tempRegistration",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tempDistributor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tempPharmacy",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_temp",
        "type": "uint256"
      }
    ],
    "name": "registerMedicine",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_temp",
        "type": "uint256"
      }
    ],
    "name": "updateDistributorTemp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_temp",
        "type": "uint256"
      }
    ],
    "name": "updatePharmacyTemp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contract = new web3.eth.Contract(abi, contractAddress);
console.log('Using contract address:', contractAddress);

// Function to register a medicine
function registerMedicine(id, temp) {
    web3.eth.getAccounts().then(function(accounts) {
        const defaultAccount = accounts[0];
        contract.methods.registerMedicine(id, temp).send({from: defaultAccount})
            .then(function(result) {
                console.log(result);
            }).catch(function(error) {
                console.error(error);
            });
    });
}

// Function to update distributor temperature
function updateDistributorTemp(id, temp) {
    web3.eth.getAccounts().then(function(accounts) {
        const defaultAccount = accounts[0];
        contract.methods.updateDistributorTemp(id, temp).send({from: defaultAccount})
            .then(function(result) {
                console.log(result);
            }).catch(function(error) {
                console.error(error);
            });
    });
}

// Function to update pharmacy temperature
function updatePharmacyTemp(id, temp) {
    web3.eth.getAccounts().then(function(accounts) {
        const defaultAccount = accounts[0];
        contract.methods.updatePharmacyTemp(id, temp).send({from: defaultAccount})
            .then(function(result) {
                console.log(result);
            }).catch(function(error) {
                console.error(error);
            });
    });
}

// Function to fetch and display history of temperature updates
// function fetchHistory() {
//     const eventFilter = { fromBlock: 0, toBlock: 'latest' };
//     contract.getPastEvents('AllEvents', eventFilter)
//     .then(function(events){
//         const historyArea = document.getElementById('historyArea');
//         historyArea.innerHTML = ''; // Clear previous entries
//         events.forEach(event => {
//             const {returnValues, event: eventName} = event;
//             let content = `Event: ${eventName}, ID: ${returnValues.medicineId}, Temperature: ${returnValues.temperature}, Phase: ${returnValues.phase || 'registration'}`;
//           console.log(content)
//             historyArea.innerHTML += `<p>${content}</p>`;
//         });
//     })
//     .catch(function(err){
//         console.error('Failed to fetch events:', err);
//     });
// }

// Function to fetch and toggle display of temperature updates history
function fetchHistory() {
    const historyArea = document.getElementById('historyArea');

    // Toggle visibility
    if (historyArea.style.display === 'none' || !historyArea.style.display) {
        // If history is hidden, fetch and show it
        const eventFilter = { fromBlock: 0, toBlock: 'latest' };
        contract.getPastEvents('AllEvents', eventFilter)
        .then(function(events){
            historyArea.innerHTML = ''; // Clear previous entries
            const recentEvents = events.slice(-5); // Get the last 5 events
            recentEvents.forEach(event => {
                const { returnValues, event: eventName } = event;
                let content = `Event: ${eventName}, ID: ${returnValues.medicineId}, Temperature: ${returnValues.temperature}, Phase: ${returnValues.phase || 'registration'}`;
                historyArea.innerHTML += `<p>${content}</p>`;
            });
            historyArea.style.display = 'block'; // Ensure the area is visible
        })
        .catch(function(err){
            console.error('Failed to fetch events:', err);
        });
    } else {
        // If history is visible, hide it
        historyArea.style.display = 'none';
    }
}

// console.log("Loaded app.js successfully");
// async function registerMedicine(id, temp) {
//     try {
//         const accounts = await web3.eth.getAccounts();
//         const result = await contract.methods.registerMedicine(id, temp).send({from: accounts[0]});
//         document.getElementById('feedbackArea').innerText = 'Medicine registered successfully. Transaction Hash: ' + result.transactionHash;
//     } catch (error) {
//         document.getElementById('feedbackArea').innerText = 'Registration failed: ' + error.message;
//     }
// }

// async function updateDistributorTemp(id, temp) {
//     try {
//         const accounts = await web3.eth.getAccounts();
//         const result = await contract.methods.updateDistributorTemp(id, temp).send({from: accounts[0]});
//         document.getElementById('feedbackArea').innerText = 'Distributor temperature updated successfully. Transaction Hash: ' + result.transactionHash;
//     } catch (error) {
//         document.getElementById('feedbackArea').innerText = 'Update failed: ' + error.message;
//     }
// }

// async function updatePharmacyTemp(id, temp) {
//     try {
//         const accounts = await web3.eth.getAccounts();
//         const result = await contract.methods.updatePharmacyTemp(id, temp).send({from: accounts[0]});
//         document.getElementById('feedbackArea').innerText = 'Pharmacy temperature updated successfully. Transaction Hash: ' + result.transactionHash;
//     } catch (error) {
//         document.getElementById('feedbackArea').innerText = 'Update failed: ' + error.message;
//     }
// }
