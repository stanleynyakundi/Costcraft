document.addEventListener("DOMContentLoaded", function () {
  console.log("HVAC Cost Script Loaded");

  function calculateHVACTotalCost() {
      let overallHVACTotal = 0;

      document.querySelectorAll("#hvacTable tbody tr").forEach(row => {
          const systemPriceInput = row.querySelector(".system-price");
          const installationPriceInput = row.querySelector(".installation-price");
          const laborCostInput = row.querySelector(".labor-cost");
          const totalCostInput = row.querySelector(".hvac-total-cost");

          const systemPrice = parseFloat(systemPriceInput.value) || 0;
          const installationPrice = parseFloat(installationPriceInput.value) || 0;
          const laborCost = parseFloat(laborCostInput.value) || 0;

          const rowTotal = systemPrice + installationPrice + laborCost;
          totalCostInput.value = rowTotal.toFixed(2);

          overallHVACTotal += rowTotal;
      });

      console.log("Total HVAC Cost for all rows:", overallHVACTotal.toFixed(2));
      // Optional: display this total somewhere on the page
      // document.getElementById("overallHVACTotal").value = overallHVACTotal.toFixed(2);
  }

  // Attach event listeners for all existing inputs
  function attachHVACInputListeners(row) {
      row.querySelectorAll("input").forEach(input => {
          input.addEventListener("input", calculateHVACTotalCost);
      });
  }

  // Add new HVAC row
  window.addHVACRow = function () {
      const tableBody = document.querySelector("#hvacTable tbody");
      const newRow = document.createElement("tr");
      newRow.classList.add("hvac-row");

      newRow.innerHTML = `
          <td>
              <select class="hvac-type" title="Select HVAC Type">
                  <option value="heating">Heating</option>
                  <option value="ventilation">Ventilation</option>
                  <option value="air-conditioning">Air Conditioning</option>
              </select>
          </td>
          <td><input type="number" class="system-price" placeholder="0" title="Enter system price"></td>
          <td><input type="number" class="installation-price" placeholder="0" title="Enter installation price"></td>
          <td><input type="number" class="labor-cost" placeholder="0" title="Enter labor cost"></td>
          <td><input type="text" class="hvac-total-cost" readonly title="Calculated total cost"></td>
      `;

      tableBody.appendChild(newRow);
      attachHVACInputListeners(newRow);
  };

  // Delete last HVAC row
  window.deleteLastHVACRow = function () {
      const tableBody = document.querySelector("#hvacTable tbody");
      if (tableBody.rows.length > 1) {
          tableBody.deleteRow(tableBody.rows.length - 1);
          calculateHVACTotalCost();
      }
  };

  // Initialize input listeners for existing row(s)
  document.querySelectorAll("#hvacTable tbody tr").forEach(row => {
      attachHVACInputListeners(row);
        // Load saved values on page load
  loadHVACDataIndividually();

  // Save changes on input
  document.querySelectorAll("#hvacTable tbody").forEach(tbody => {
      tbody.addEventListener("input", saveHVACDataIndividually);
  });

  });
  function saveHVACDataIndividually() {
    const rows = document.querySelectorAll("#hvacTable tbody tr");
    localStorage.setItem("hvacRowCount", rows.length);

    rows.forEach((row, index) => {
        const type = row.querySelector(".hvac-type").value || "";
        const system = row.querySelector(".system-price").value || "";
        const install = row.querySelector(".installation-price").value || "";
        const labor = row.querySelector(".labor-cost").value || "";
        const total = row.querySelector(".hvac-total-cost").value || "";

        localStorage.setItem(`hvac_type_${index}`, type);
        localStorage.setItem(`hvac_system_${index}`, system);
        localStorage.setItem(`hvac_install_${index}`, install);
        localStorage.setItem(`hvac_labor_${index}`, labor);
        localStorage.setItem(`hvac_total_${index}`, total);
    });

    // Optional overall total
    const overallTotal = Array.from(rows).reduce((sum, row) => {
        return sum + (parseFloat(row.querySelector(".hvac-total-cost").value) || 0);
    }, 0);
    localStorage.setItem("totalHVACCost", overallTotal.toFixed(2));
}

function loadHVACDataIndividually() {
    const rowCount = parseInt(localStorage.getItem("hvacRowCount")) || 0;
    const tableBody = document.querySelector("#hvacTable tbody");

    while (tableBody.rows.length < rowCount) {
        window.addHVACRow();
    }

    const rows = document.querySelectorAll("#hvacTable tbody tr");

    for (let i = 0; i < rowCount; i++) {
        const row = rows[i];
        if (!row) continue;

        row.querySelector(".hvac-type").value = localStorage.getItem(`hvac_type_${i}`) || "";
        row.querySelector(".system-price").value = localStorage.getItem(`hvac_system_${i}`) || "";
        row.querySelector(".installation-price").value = localStorage.getItem(`hvac_install_${i}`) || "";
        row.querySelector(".labor-cost").value = localStorage.getItem(`hvac_labor_${i}`) || "";
        row.querySelector(".hvac-total-cost").value = localStorage.getItem(`hvac_total_${i}`) || "";
    }
}

});
document.addEventListener("DOMContentLoaded", function () {
  console.log("Drainage Script Loaded");

  // Mapping for dependent drainage types
  const drainageTypeOptions = {
    surface: ["Ditches", "Channels"],
    subsurface: ["Perforated Pipes", "Tiles"],
    slope: ["Pipes"],
    downspout: ["Downspouts"],
    gutters: ["Gutters"]
  };

  // Update the drainage type dropdown based on the selected system type in a row.
  function updateDrainageType(row) {
    const systemTypeSelect = row.querySelector(".wd-system-type");
    const drainageTypeSelect = row.querySelector(".wd-drainage-type");
    const selectedSystem = systemTypeSelect.value;
    const options = drainageTypeOptions[selectedSystem] || [];

    // Clear current options
    drainageTypeSelect.innerHTML = "";
    // Add new options
    options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option.toLowerCase().replace(/\s+/g, "-");
      opt.textContent = option;
      drainageTypeSelect.appendChild(opt);
    });
  }

  // Calculate row total for water drainage
  function calculateWaterDrainageRow(row) {
    const systemPrice = parseFloat(row.querySelector(".wd-system-price").value) || 0;
    const installationPrice = parseFloat(row.querySelector(".wd-installation-price").value) || 0;
    const laborCost = parseFloat(row.querySelector(".wd-labor-cost").value) || 0;
    const rowTotal = systemPrice + installationPrice + laborCost;
    row.querySelector(".wd-total-cost").value = rowTotal.toFixed(2);
    return rowTotal;
  }

  // Calculate overall water drainage cost
  function calculateWaterDrainageCost() {
    let total = 0;
    document.querySelectorAll(".wd-row").forEach(row => {
      total += calculateWaterDrainageRow(row);
    });
    document.getElementById("totalWaterDrainageCost").value = total.toFixed(2);
  }

  // Save data on any input or dropdown change
  function saveWaterDrainageDataIndividually() {
    const rows = document.querySelectorAll("#waterDrainageTable tbody tr");
    localStorage.setItem("waterDrainageRowCount", rows.length);

    rows.forEach((row, index) => {
      const systemType = row.querySelector(".wd-system-type").value || "";
      const drainageType = row.querySelector(".wd-drainage-type").value || "";
      const systemPrice = row.querySelector(".wd-system-price").value || "";
      const installPrice = row.querySelector(".wd-installation-price").value || "";
      const laborCost = row.querySelector(".wd-labor-cost").value || "";
      const totalCost = row.querySelector(".wd-total-cost").value || "";

      localStorage.setItem(`wd_system_type_${index}`, systemType);
      localStorage.setItem(`wd_drainage_type_${index}`, drainageType);
      localStorage.setItem(`wd_system_price_${index}`, systemPrice);
      localStorage.setItem(`wd_install_price_${index}`, installPrice);
      localStorage.setItem(`wd_labor_cost_${index}`, laborCost);
      localStorage.setItem(`wd_total_cost_${index}`, totalCost);
    });

    const overallTotal = Array.from(rows).reduce((sum, row) => {
      return sum + (parseFloat(row.querySelector(".wd-total-cost").value) || 0);
    }, 0);
    localStorage.setItem("totalWaterDrainageCost", overallTotal.toFixed(2));
  }

  // Load saved drainage data
  function loadWaterDrainageDataIndividually() {
    const rowCount = parseInt(localStorage.getItem("waterDrainageRowCount")) || 0;
    const tableBody = document.querySelector("#waterDrainageTable tbody");

    while (tableBody.rows.length < rowCount) {
      addWaterDrainageRow();
    }

    const rows = document.querySelectorAll("#waterDrainageTable tbody tr");

    for (let i = 0; i < rowCount; i++) {
      const row = rows[i];
      if (!row) continue;

      const systemType = localStorage.getItem(`wd_system_type_${i}`) || "surface";
      const drainageType = localStorage.getItem(`wd_drainage_type_${i}`) || "";
      const systemPrice = localStorage.getItem(`wd_system_price_${i}`) || "";
      const installPrice = localStorage.getItem(`wd_install_price_${i}`) || "";
      const laborCost = localStorage.getItem(`wd_labor_cost_${i}`) || "";
      const totalCost = localStorage.getItem(`wd_total_cost_${i}`) || "";

      row.querySelector(".wd-system-type").value = systemType;
      updateDrainageType(row);  // refresh dependent dropdown
      row.querySelector(".wd-drainage-type").value = drainageType;

      row.querySelector(".wd-system-price").value = systemPrice;
      row.querySelector(".wd-installation-price").value = installPrice;
      row.querySelector(".wd-labor-cost").value = laborCost;
      row.querySelector(".wd-total-cost").value = totalCost;
    }
  }

  // Create a new water drainage row
  function addWaterDrainageRow() {
    const tbody = document.getElementById("waterDrainageTable").querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.classList.add("wd-row");
    newRow.innerHTML = `
      <td>
        <select class="wd-system-type" title="Select a drainage system type">
          <option value="surface">Surface</option>
          <option value="subsurface">Subsurface</option>
          <option value="slope">Slope</option>
          <option value="downspout">Downspout</option>
          <option value="gutters">Gutters</option>
        </select>
      </td>
      <td>
        <select class="wd-drainage-type" title="Select drainage type"></select>
      </td>
      <td><input type="number" class="wd-system-price" placeholder="0" title="Enter system price"></td>
      <td><input type="number" class="wd-installation-price" placeholder="0" title="Enter installation price"></td>
      <td><input type="number" class="wd-labor-cost" placeholder="0" title="Enter labor cost"></td>
      <td><input type="text" class="wd-total-cost" readonly title="Calculated total cost"></td>
    `;
    tbody.appendChild(newRow);
    // Set drainage type options initially
    updateDrainageType(newRow);
    // Add event listeners
    newRow.querySelector(".wd-system-type").addEventListener("change", function () {
      updateDrainageType(newRow);
      calculateWaterDrainageCost();
    });
    newRow.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", calculateWaterDrainageCost);
    });
    newRow.querySelector(".wd-drainage-type").addEventListener("change", calculateWaterDrainageCost);
    calculateWaterDrainageCost();
  }

  // Delete the last water drainage row
  function deleteLastWaterDrainageRow() {
    const tbody = document.getElementById("waterDrainageTable").querySelector("tbody");
    if (tbody.rows.length > 1) {
      tbody.deleteRow(tbody.rows.length - 1);
      calculateWaterDrainageCost();
    } else {
      alert("At least one row must remain.");
    }
  }

  // Attach event listeners to initial water drainage row(s)
  document.querySelectorAll(".wd-row").forEach(row => {
    updateDrainageType(row);
    row.querySelector(".wd-system-type").addEventListener("change", function () {
      updateDrainageType(row);
      calculateWaterDrainageCost();
    });
    row.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", calculateWaterDrainageCost);
    });
    row.querySelector(".wd-drainage-type").addEventListener("change", calculateWaterDrainageCost);
  });

  // Load saved data
  loadWaterDrainageDataIndividually();

  // Initial calculations
  calculateWaterDrainageCost();

  // Save data on any input or dropdown change
  document.querySelector("#waterDrainageTable tbody").addEventListener("input", saveWaterDrainageDataIndividually);
  document.querySelector("#waterDrainageTable tbody").addEventListener("change", saveWaterDrainageDataIndividually);

  // Expose functions to global scope
  window.addWaterDrainageRow = addWaterDrainageRow;
  window.deleteLastWaterDrainageRow = deleteLastWaterDrainageRow;
});


  document.addEventListener("DOMContentLoaded", function () {
    function calculateRowCost(row) {
        // Get input values and convert them to numbers (default to 0 if empty)
        const pipeLength = parseFloat(row.querySelector(".pipe-length").value) || 0;
        const pipeCostPerMeter = parseFloat(row.querySelector(".pipe-cost").value) || 0;
        const valvesCost = parseFloat(row.querySelector(".valves-cost").value) || 0;
        const fixturesCost = parseFloat(row.querySelector(".fixtures-cost").value) || 0;
        const laborCost = parseFloat(row.querySelector(".labor-cost").value) || 0;

        // Calculate total pipe cost
        const totalPipeCost = pipeLength * pipeCostPerMeter;

        // Calculate total cost
        const totalCost = totalPipeCost + valvesCost + fixturesCost + laborCost;

        // Display total cost in the last column
        row.querySelector(".row-total-cost").value = totalCost.toFixed(2);
    }

    function attachEventListeners() {
        document.querySelectorAll(".wd-row input").forEach(input => {
            input.addEventListener("input", function () {
                calculateRowCost(this.closest(".wd-row"));
            });
        });
    }

    // Attach event listeners when the page loads
    attachEventListeners();
});




document.addEventListener("DOMContentLoaded", function () {
  const gasTableBody = document.querySelector("#gasSupplyTable tbody");

  // Function to calculate the total cost for a row
  function calculateGasRowCost(row) {
      const unitPrice = parseFloat(row.querySelector(".unit-price").value) || 0;
      const quantity = parseFloat(row.querySelector(".quantity").value) || 0;
      const installationCost = parseFloat(row.querySelector(".installation-cost").value) || 0;

      // Calculate total cost for this row
      const totalCost = (unitPrice * quantity) + installationCost;
      row.querySelector(".gas-total-cost").value = totalCost.toFixed(2);

      // Recalculate total gas supply cost
      calculateTotalGasCost();
  }

  // Function to calculate total gas supply cost for all rows
  function calculateTotalGasCost() {
      let total = 0;
      document.querySelectorAll(".gas-total-cost").forEach(input => {
          total += parseFloat(input.value) || 0;
      });

      // Display total gas supply cost
      document.querySelector("#totalGasCost").value = total.toFixed(2);
  }

  // Function to attach event listeners to inputs for real-time calculation
  function attachGasEventListeners(row) {
      row.querySelectorAll("input").forEach(input => {
          input.addEventListener("input", function () {
              calculateGasRowCost(row);
          });
      });
  }
    // Load data on page load
    loadGasSupplyDataIndividually();

    // Save data on any input
    document.querySelectorAll(".gas-row input").forEach(input => {
        input.addEventListener("input", saveGasSupplyDataIndividually);
    });
  

  // Function to add a new gas row
  function addGasRow() {
      const firstRow = document.querySelector(".gas-row"); // Get the first row as a template
      if (!firstRow) return;

      const newRow = firstRow.cloneNode(true); // Clone the row
      newRow.querySelectorAll("input").forEach(input => (input.value = "")); // Clear input values

      gasTableBody.appendChild(newRow); // Append new row to table
      attachGasEventListeners(newRow); // Add event listeners to the new row
  }

  // Function to delete the last gas row
  function deleteLastGasRow() {
      const rows = document.querySelectorAll(".gas-row");
      if (rows.length > 1) {
          rows[rows.length - 1].remove(); // Remove last row if more than one exists
          calculateTotalGasCost(); // Update the total cost after deletion
      } else {
          alert("At least one row must remain!");
      }
  }

  // Attach event listeners to the initial row
  attachGasEventListeners(document.querySelector(".gas-row"));

  // Expose functions globally for button clicks
  window.addGasRow = addGasRow;
  window.deleteLastGasRow = deleteLastGasRow;
});

function saveGasSupplyDataIndividually() {
  const rows = document.querySelectorAll(".gas-row");
  localStorage.setItem("gasRowCount", rows.length);

  rows.forEach((row, index) => {
      const unitPrice = row.querySelector(".unit-price").value || "";
      const quantity = row.querySelector(".quantity").value || "";
      const installationCost = row.querySel.ector(".installation-cost").value || "";
      const totalCost = row.querySelector("gas-total-cost").value || "";

      localStorage.setItem(`gas_unit_price_${index}`, unitPrice);
      localStorage.setItem(`gas_quantity_${index}`, quantity);
      localStorage.setItem(`gas_installation_cost_${index}`, installationCost);
      localStorage.setItem(`gas_total_cost_${index}`, totalCost);
  });
}

function loadGasSupplyDataIndividually() {
  const rowCount = parseInt(localStorage.getItem("gasRowCount")) || 0;
  const existingRows = document.querySelectorAll(".gas-row");
  const tableBody = existingRows[0]?.closest("tbody");
  if (!tableBody) return;

  // Add rows if needed
  while (tableBody.querySelectorAll(".gas-row").length < rowCount) {
      if (typeof window.addGasRow === "function") {
          window.addGasRow();
      } else {
          const clone = existingRows[0].cloneNode(true);
          clone.querySelectorAll("input").forEach(input => input.value = "");
          tableBody.appendChild(clone);
      }
  }

  const rows = document.querySelectorAll(".gas-row");
  for (let i = 0; i < rowCount; i++) {
      const row = rows[i];
      if (!row) continue;

      row.querySelector(".unit-price").value = localStorage.getItem(`gas_unit_price_${i}`) || "";
      row.querySelector(".quantity").value = localStorage.getItem(`gas_quantity_${i}`) || "";
      row.querySelector(".installation-cost").value = localStorage.getItem(`gas_installation_cost_${i}`) || "";
      row.querySelector(".gas-total-cost").value = localStorage.getItem(`gas_total_cost_${i}`) || "";
  }

  // Recalculate total
  if (typeof window.calculateTotalGasCost === "function") {
      window.calculateTotalGasCost();
  } else {
      document.querySelector("#totalGasCost").value = [...document.querySelectorAll(".gas-total-cost")]
          .reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0).toFixed(2);
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const electricalTableBody = document.querySelector("#electricalTable tbody");
  const totalElectricalCostInput = document.getElementById("totalElectricalCost");

  // 1) Compute one row's total
  function calculateElectricalRowCost(row) {
    const unitPrice        = parseFloat(row.querySelector(".unit-price").value)        || 0;
    const powerCapacity    = parseFloat(row.querySelector(".power-capacity").value)    || 0;
    const installationCost = parseFloat(row.querySelector(".installation-cost").value) || 0;
    const wireLength       = parseFloat(row.querySelector(".wire-length").value)       || 0;
    const wireCost         = parseFloat(row.querySelector(".wire-cost").value)         || 0;
    const socketQuantity   = parseFloat(row.querySelector(".socket-quantity").value)   || 0;
    const socketPrice      = parseFloat(row.querySelector(".socket-price").value)      || 0;

    const totalCost = (unitPrice * powerCapacity)
                    + installationCost
                    + (wireLength * wireCost)
                    + (socketQuantity * socketPrice);

    row.querySelector(".electrical-total-cost").value = totalCost.toFixed(2);
  }

  // 2) Sum all row-totals into the bottom input
  function calculateTotalElectricalCost() {
    let grandTotal = 0;
    document.querySelectorAll(".electrical-total-cost").forEach(inp => {
      grandTotal += parseFloat(inp.value) || 0;
    });
    totalElectricalCostInput.value = grandTotal.toFixed(2);
  }

  // 3) Hook up inputs/selects on a row
  function attachElectricalEventListeners(row) {
    row.querySelectorAll("input, select").forEach(el => {
      el.addEventListener("input", () => {
        calculateElectricalRowCost(row);
        calculateTotalElectricalCost();
        saveTableToLocalStorage();
      });
    });
  }

  // 4) Clone the first row to add a new one
  function addElectricalRow(data = {}) {
    const firstRow = document.querySelector(".electrical-row");
    const newRow = firstRow.cloneNode(true);

    // reset or fill with saved data
    newRow.querySelectorAll("input").forEach((inp, i) => {
      inp.value = data.inputs?.[i] ?? "";
    });
    newRow.querySelectorAll("select").forEach((sel, i) => {
      sel.value = data.selects?.[i] ?? sel.options[0].value;
    });

    electricalTableBody.appendChild(newRow);
    attachElectricalEventListeners(newRow);
    calculateElectricalRowCost(newRow);
    calculateTotalElectricalCost();
  }

  // 5) Remove last row (but leave at least one)
  function deleteLastElectricalRow() {
    const rows = document.querySelectorAll(".electrical-row");
    if (rows.length > 1) {
      rows[rows.length - 1].remove();
      calculateTotalElectricalCost();
      saveTableToLocalStorage();
    } else {
      alert("At least one row must remain!");
    }
  }

  // 6) Persist into localStorage
  function saveTableToLocalStorage() {
    const data = Array.from(document.querySelectorAll(".electrical-row")).map(row => ({
      inputs:  Array.from(row.querySelectorAll("input")).map(i => i.value),
      selects: Array.from(row.querySelectorAll("select")).map(s => s.value)
    }));
    localStorage.setItem("electricalTableData", JSON.stringify(data));
  }

  // 7) Load from localStorage
  function loadTableFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem("electricalTableData") || "[]");
    if (saved.length === 0) return;

    // remove all but first
    document.querySelectorAll(".electrical-row").forEach((r, i) => { if (i>0) r.remove(); });

    // fill first
    const first = document.querySelector(".electrical-row");
    first.querySelectorAll("input").forEach((inp, i)   => inp.value = saved[0].inputs[i]  || "");
    first.querySelectorAll("select").forEach((sel, i)  => sel.value = saved[0].selects[i] || "");
    calculateElectricalRowCost(first);
    attachElectricalEventListeners(first);

    // add the rest
    for (let i = 1; i < saved.length; i++) {
      addElectricalRow(saved[i]);
    }

    calculateTotalElectricalCost();
  }

  // — INITIALIZE —
  // always attach to the very first row
  const initialRow = document.querySelector(".electrical-row");
  attachElectricalEventListeners(initialRow);
  calculateElectricalRowCost(initialRow);
  calculateTotalElectricalCost();

  // then load any saved data (which re-attaches listeners & recalcs)
  loadTableFromLocalStorage();

  // expose to buttons
  window.addElectricalRow     = addElectricalRow;
  window.deleteLastElectricalRow = deleteLastElectricalRow;
});


document.addEventListener("DOMContentLoaded", function () {
  const lightingTableBody = document.querySelector("#lightingTable tbody");

  // Function to calculate the total cost for a row
  function calculateLightingRowCost(row) {
      const unitPrice = parseFloat(row.querySelector(".unit-price").value) || 0;
      const quantity = parseFloat(row.querySelector(".quantity").value) || 0;
      const installationCost = parseFloat(row.querySelector(".installation-cost").value) || 0;
      const wireLength = parseFloat(row.querySelector(".wire-length").value) || 0;
      const wireCost = parseFloat(row.querySelector(".wire-cost").value) || 0;
      const switchQuantity = parseFloat(row.querySelector(".switch-quantity").value) || 0;
      const switchPrice = parseFloat(row.querySelector(".switch-price").value) || 0;

      // Calculate total cost for this row
      const totalCost = (unitPrice * quantity) + installationCost + (wireLength * wireCost) + (switchQuantity * switchPrice);
      row.querySelector(".lighting-total-cost").value = totalCost.toFixed(2);

      // Recalculate total lighting supply cost
      calculateTotalLightingCost();

  }

  // Function to calculate total lighting cost for all rows
  function calculateTotalLightingCost() {
      let total = 0;
      document.querySelectorAll(".lighting-total-cost").forEach(input => {
          total += parseFloat(input.value) || 0;
      });

      // Display total lighting cost
      document.querySelector("#totalLightingCost").value = total.toFixed(2);
      localStorage.setItem("totalLightingCost", totalInput.value);
  }

  // Function to attach event listeners to inputs for real-time calculation
  function attachLightingEventListeners(row) {
      row.querySelectorAll("input").forEach(input => {
          input.addEventListener("input", function () {
              calculateLightingRowCost(row);
          });
      });
  }
  // Load data on page load
  loadLightingDataIndividually();

  // Save data on any input
  document.querySelectorAll(".lighting-row input").forEach(input => {
      input.addEventListener("input", saveLightingDataIndividually);
  });

  // Function to add a new lighting row
  function addLightingRow() {
      const firstRow = document.querySelector(".lighting-row"); // Get the first row as a template
      if (!firstRow) return;

      const newRow = firstRow.cloneNode(true); // Clone the row
      newRow.querySelectorAll("input").forEach(input => (input.value = "")); // Clear input values

      lightingTableBody.appendChild(newRow); // Append new row to table
      attachLightingEventListeners(newRow); // Add event listeners to the new row
  }

  // Function to delete the last lighting row
  function deleteLastLightingRow() {
      const rows = document.querySelectorAll(".lighting-row");
      if (rows.length > 1) {
          rows[rows.length - 1].remove(); // Remove last row if more than one exists
          calculateTotalLightingCost(); // Update the total cost after deletion
      } else {
          alert("At least one row must remain!");
      }
  }

  // Attach event listeners to the initial row
  attachLightingEventListeners(document.querySelector(".lighting-row"));

  // Expose functions globally for button clicks
  window.addLightingRow = addLightingRow;
  window.deleteLastLightingRow = deleteLastLightingRow;
});

function saveLightingDataIndividually() {
  const rows = document.querySelectorAll(".lighting-row");
  localStorage.setItem("lightingRowCount", rows.length);

  rows.forEach((row, index) => {
      localStorage.setItem(`lighting_unit_price_${index}`, row.querySelector(".unit-price").value || "");
      localStorage.setItem(`lighting_quantity_${index}`, row.querySelector(".quantity").value || "");
      localStorage.setItem(`lighting_installation_cost_${index}`, row.querySelector(".installation-cost").value || "");
      localStorage.setItem(`lighting_wire_length_${index}`, row.querySelector(".wire-length").value || "");
      localStorage.setItem(`lighting_wire_cost_${index}`, row.querySelector(".wire-cost").value || "");
      localStorage.setItem(`lighting_switch_quantity_${index}`, row.querySelector(".switch-quantity").value || "");
      localStorage.setItem(`lighting_switch_price_${index}`, row.querySelector(".switch-price").value || "");
      localStorage.setItem(`lighting_total_cost_${index}`, row.querySelector(".lighting-total-cost").value || "");
      
  });
}

function loadLightingDataIndividually() {
  const rowCount = parseInt(localStorage.getItem("lightingRowCount")) || 0;
  const tableBody = document.querySelector("#lightingTable tbody");
  const existingRows = tableBody.querySelectorAll(".lighting-row");

  // Add rows if necessary
  while (tableBody.querySelectorAll(".lighting-row").length < rowCount) {
      if (typeof window.addLightingRow === "function") {
          window.addLightingRow();
      } else {
          const clone = existingRows[0].cloneNode(true);
          clone.querySelectorAll("input").forEach(input => input.value = "");
          tableBody.appendChild(clone);
      }
  }

  const rows = document.querySelectorAll(".lighting-row");
  for (let i = 0; i < rowCount; i++) {
      const row = rows[i];
      if (!row) continue;

      row.querySelector(".unit-price").value = localStorage.getItem(`lighting_unit_price_${i}`) || "";
      row.querySelector(".quantity").value = localStorage.getItem(`lighting_quantity_${i}`) || "";
      row.querySelector(".installation-cost").value = localStorage.getItem(`lighting_installation_cost_${i}`) || "";
      row.querySelector(".wire-length").value = localStorage.getItem(`lighting_wire_length_${i}`) || "";
      row.querySelector(".wire-cost").value = localStorage.getItem(`lighting_wire_cost_${i}`) || "";
      row.querySelector(".switch-quantity").value = localStorage.getItem(`lighting_switch_quantity_${i}`) || "";
      row.querySelector(".switch-price").value = localStorage.getItem(`lighting_switch_price_${i}`) || "";
      row.querySelector(".lighting-total-cost").value = localStorage.getItem(`lighting_total_cost_${i}`) || "";
  }

  if (typeof window.calculateTotalLightingCost === "function") {
      window.calculateTotalLightingCost();
  }
}


function calculateTotalBuildingServicesCost() {
  let total = 0;
  // grab every per-row subtotal
  document.querySelectorAll(".total-cost-input").forEach(input => {
    total += parseFloat(input.value) || 0;
  });
  document.getElementById("TotalBuildingServicesCost").value = total.toFixed(2);
  localStorage.setItem("TotalBuildingServicesCost", total.toFixed(2));
}

// recalc whenever any section changes
[".hvac-total-cost", ".wd-total-cost", ".row-total-cost"].forEach(selector => {
  document.body.addEventListener("input", e => {
    if (e.target.matches(selector)) {
      calculateTotalBuildingServicesCost();
    }
  });
});

// also on button click
document.addEventListener("DOMContentLoaded", () => {
  const totalSvcInput = document.getElementById("TotalBuildingServicesCost");
  const calcBtn       = document.getElementById("calculateTotalCostButton");
  const clearBtn      = document.getElementById("clearServiceTotalButton");

  // When you calculate, save into localStorage
  calcBtn.addEventListener("click", () => {
    calculateTotalBuildingServicesCost();
    localStorage.setItem("totalBuildingServicesCost", totalSvcInput.value);
  });

  // Restore on load
  const saved = localStorage.getItem("totalBuildingServicesCost");
  if (saved !== null) {
    totalSvcInput.value = saved;
  }

  // **New**: Clear handler
  clearBtn.addEventListener("click", () => {
    // 1) reset the input
    totalSvcInput.value = "";
    // 2) remove from storage
    localStorage.removeItem("totalBuildingServicesCost");
  });
});

