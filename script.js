const inputKey = document.getElementById('inputKey');
const inputValue = document.getElementById('inputValue');
const btnInsert = document.getElementById('btnInsert');
const lsOutput = document.getElementById('lsOutput');
const btnAllDelete = document.getElementById('btnAllDelete');
const autoFILL = document.getElementById('autoFILL');
const inputDelKey = document.getElementById('inputDelKey');
const btnDelete = document.getElementById('btnDelete');
const inputReadDataKey = document.getElementById('inputReadDataKey');
const btnReadData = document.getElementById('btnReadData');
const readedDataHere = document.getElementById('readedDataHere');

// Insert/Update Data
btnInsert.onclick = function () {
  const key = inputKey.value.trim();
  const value = inputValue.value.trim();

  if (key && value) {
    localStorage.setItem(key, value);
    alert(Data for key "${key}" has been inserted/updated.);
    displayAllRecords(); // Refresh the display
    clearInputs();
  } else {
    alert("Both Key and Value are required!");
  }
};

// Display All Records from Local Storage
function displayAllRecords() {
  lsOutput.innerHTML = ''; // Clear previous display
  if (localStorage.length === 0) {
    btnAllDelete.style.display = 'none'; // Hide delete-all button if no records
    autoFILL.innerHTML = 'Add some key-value records using the INSERT box.';
  } else {
    btnAllDelete.style.display = 'block'; // Show delete-all button if records exist
    autoFILL.innerHTML = '';
    document.getElementById('avialRecords').innerHTML = 'Records available in LocalStorage:';
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      lsOutput.innerHTML += `
        <hr />
        <strong>Key:</strong> ${key} <br />
        <strong>Value:</strong> ${value}<br />
      `;
    }
  }
}

// Read Data for a Specific Key
btnReadData.onclick = function () {
  const key = inputReadDataKey.value.trim();
  const value = localStorage.getItem(key);

  if (key) {
    if (value) {
      readedDataHere.innerHTML = Data for key "${key}" is: ${value};
    } else {
      readedDataHere.innerHTML = No data found for key "${key}".;
    }
  } else {
    alert("Please enter a key to read its value.");
  }
};

// Delete Data for a Specific Key
btnDelete.onclick = function () {
  const key = inputDelKey.value.trim();

  if (key) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      alert(Data for key "${key}" has been deleted.);
      displayAllRecords(); // Refresh the display
      clearInputs();
    } else {
      alert(No data found for key "${key}".);
    }
  } else {
    alert("Please enter a key to delete its data.");
  }
};

// Delete All Records
btnAllDelete.onclick = function () {
  if (confirm("Are you sure you want to delete all data?")) {
    localStorage.clear();
    alert("All data has been deleted.");
    displayAllRecords(); // Refresh the display
  }
};

// Clear Input Fields
function clearInputs() {
  inputKey.value = '';
  inputValue.value = '';
  inputReadDataKey.value = '';
  inputDelKey.value = '';
  readedDataHere.innerHTML = '';
}

// Load and Display Records on Page Load
window.onload = function () {
  displayAllRecords();
};