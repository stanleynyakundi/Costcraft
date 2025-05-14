document.addEventListener('DOMContentLoaded', function () {
    console.log("Script Loaded and DOM is Ready");

    const beamTable = document.getElementById('beamTable').querySelector('tbody');
    const totalBeamCostInput = document.getElementById('totalBeamCost');

    function calculateRowCost(row) {
        const height = parseFloat(row.querySelector('.height')?.value) || 0;
        const width = parseFloat(row.querySelector('.width')?.value) || 0;document.addEventListener('DOMContentLoaded', function () {
    console.log("Script Loaded and DOM is Ready");

    const beamTable = document.getElementById('beamTable').querySelector('tbody');
    const totalBeamCostInput = document.getElementById('totalBeamCost');

    function calculateRowCost(row) {
        const height = parseFloat(row.querySelector('.height')?.value) || 0;
        const width = parseFloat(row.querySelector('.width')?.value) || 0;
        const span = parseFloat(row.querySelector('.span')?.value) || 0;
        const number = parseFloat(row.querySelector('.number')?.value) || 0;

        const concreteUnitCost = parseFloat(row.querySelector('.concrete-unit-cost')?.value) || 0;
        const steelQuantity = parseFloat(row.querySelector('.steel-quantity')?.value) || 0;
        const steelUnitCost = parseFloat(row.querySelector('.steel-unit-cost')?.value) || 0;
        const steelFabricationCost = parseFloat(row.querySelector('.steel-fabrication-cost')?.value) || 0;
        const steelLaborCost = parseFloat(row.querySelector('.steel-labor-cost')?.value) || 0;
        const steelOverheadsCost = parseFloat(row.querySelector('.steel-overheads-cost')?.value) || 0;
        const bindingWireCost = parseFloat(row.querySelector('.binding-wire-cost')?.value) || 0;
        const formworkUnitCost = parseFloat(row.querySelector('.formwork-unit-cost')?.value) || 0;
        const beamLaborCost = parseFloat(row.querySelector('.beam-labor-cost')?.value) || 0;

        // Convert dimensions to meters
        const heightM = height / 1000;
        const widthM = width / 1000;
        const spanM = span / 1000;

        // Area and volume
        const area = heightM * widthM;
        const volume = area * spanM;
        const formworkArea = 2 * (heightM * spanM) + 2 * (widthM * spanM);
        const plasteringCost = formworkArea * 150; // Example: Ksh 150 per m²

        // Populate calculated fields
        row.querySelector('.area').value = area.toFixed(2);
        row.querySelector('.volume').value = volume.toFixed(3);
        row.querySelector('.formwork-area').value = formworkArea.toFixed(2);
        row.querySelector('.plastering-cost').value = plasteringCost.toFixed(2);

        // Individual cost components
        const concreteCost = volume * concreteUnitCost;
        const steelCost = steelQuantity * steelUnitCost;
        const formworkCost = formworkArea * formworkUnitCost;

        // Total per beam * number
        const totalCost = (concreteCost + steelCost + steelFabricationCost + steelLaborCost +
            steelOverheadsCost + bindingWireCost + formworkCost + plasteringCost + beamLaborCost) * number;

        return totalCost;
    }

    function calculateTotalBeamCost() {
        let totalBeamCost = 0;
        document.querySelectorAll('.row').forEach(row => {
            totalBeamCost += calculateRowCost(row);
        });
        totalBeamCostInput.value = totalBeamCost.toFixed(2);
    }

    function addRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('row');
        newRow.innerHTML = `
            <td><input type="text" class="beam-name" placeholder="Beam Name"></td>
            <td><input type="number" class="height" placeholder="Height (mm)"></td>
            <td><input type="number" class="width" placeholder="Width (mm)"></td>
            <td><input type="number" class="area" placeholder="Surface Area (m²)" readonly></td>
            <td><input type="number" class="span" placeholder="Span (mm)"></td>
            <td><input type="number" class="number" placeholder="Number"></td>
            <td><input type="number" class="volume" placeholder="Volume (m³)" readonly></td>
            <td><input type="number" class="concrete-unit-cost" placeholder="Concrete Unit Cost"></td>
            <td><input type="number" class="steel-quantity" placeholder="Steel Quantity (kg)"></td>
            <td><input type="number" class="steel-unit-cost" placeholder="Steel Unit Cost (Ksh)"></td>
            <td><input type="number" class="steel-fabrication-cost" placeholder="Steel Fabrication Cost (Ksh)"></td>
            <td><input type="number" class="steel-labor-cost" placeholder="Steel Labor Cost (Ksh)"></td>
            <td><input type="number" class="steel-overheads-cost" placeholder="Steel Overheads Cost (Ksh)"></td>
            <td><input type="number" class="binding-wire-cost" placeholder="Binding Wire Cost (Ksh)"></td>
            <td><input type="number" class="formwork-area" placeholder="Formwork Area (m²)" readonly></td>
            <td><input type="number" class="formwork-unit-cost" placeholder="Formwork Unit Cost (Ksh)"></td>
            <td><input type="number" class="plastering-cost" placeholder="Plastering Cost (Ksh)" readonly></td>
            <td><input type="number" class="beam-labor-cost" placeholder="Beam Labor Cost"></td>
        `;
        beamTable.appendChild(newRow);

        // Reattach listeners
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalBeamCost);
        });

        console.log("New row added.");
    }

    function deleteLastRow() {
        const rows = document.querySelectorAll('.row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalBeamCost();
        } else {
            alert("At least one row must remain.");
        }
    }

    // Attach listeners to initial row
    document.querySelectorAll('.row input').forEach(input => {
        input.addEventListener('input', calculateTotalBeamCost);
    });

    document.getElementById('addRowButton').addEventListener('click', addRow);
    document.getElementById('deleteRowButton').addEventListener('click', deleteLastRow);

    calculateTotalBeamCost();
});
function clearAllInputs() {
    document.querySelectorAll('#beamTable tbody .row').forEach(row => {
        row.querySelectorAll('input').forEach(input => {
            if (!input.readOnly) {
                input.value = '';
            } else {
                input.value = ''; // Also clear readonly cells; they will recalculate on next input
            }
        });
    });
    totalBeamCostInput.value = '';
    console.log("All inputs cleared.");
}

document.getElementById('clearAllButton').addEventListener('click', clearAllInputs);



document.addEventListener('DOMContentLoaded', function () {
    console.log("Column Script Loaded and DOM is Ready");

    const columnTableBody = document.getElementById('columnTable').querySelector('tbody');
    const totalColumnCostInput = document.getElementById('totalColumnCost');

    function calculateRowCost(row) {
        // Get input values (defaulting to 0 if empty)
        const width = parseFloat(row.querySelector('.width')?.value) || 0;
        const depth = parseFloat(row.querySelector('.depth')?.value) || 0;
        const height = parseFloat(row.querySelector('.height')?.value) || 0;
        const number = parseFloat(row.querySelector('.number')?.value) || 0;

        const concreteUnitCost = parseFloat(row.querySelector('.concrete-unit-cost')?.value) || 0;
        const steelQuantity = parseFloat(row.querySelector('.steel-quantity')?.value) || 0;
        const steelUnitCost = parseFloat(row.querySelector('.steel-unit-cost')?.value) || 0;
        const steelFabricationCost = parseFloat(row.querySelector('.steel-fabrication-cost')?.value) || 0;
        const steelLaborCost = parseFloat(row.querySelector('.steel-labor-cost')?.value) || 0;
        const steelOverheadsCost = parseFloat(row.querySelector('.steel-overheads-cost')?.value) || 0;
        const bindingWireCost = parseFloat(row.querySelector('.binding-wire-cost')?.value) || 0;
        const formworkUnitCost = parseFloat(row.querySelector('.formwork-unit-cost')?.value) || 0;
        const columnLaborCost = parseFloat(row.querySelector('.column-labor-cost')?.value) || 0;

        // Convert dimensions from mm to m for calculations
        const widthM = width / 1000;
        const depthM = depth / 1000;
        const heightM = height / 1000;

        // Calculate area (in m²) from width and depth
        const area = widthM * depthM;
        // Calculate volume of concrete (in cubic meters): volume = area * height
        const volume = area * heightM;
        // Calculate formwork area (in m²): perimeter * height (for a rectangular column)
        const formworkArea = 2 * (widthM + depthM) * heightM;
        // Calculate plastering cost: assume a fixed rate of 150 Ksh per m²
        const plasteringCost = formworkArea * 150;

        // Populate the readonly calculated fields in the row
        row.querySelector('.area').value = area.toFixed(2);
        row.querySelector('.volume').value = volume.toFixed(3);
        row.querySelector('.formwork-area').value = formworkArea.toFixed(2);
        row.querySelector('.plastering-cost').value = plasteringCost.toFixed(2);

        // Calculate cost components
        const concreteCost = volume * concreteUnitCost;
        const steelCost = steelQuantity * steelUnitCost;
        const formworkCost = formworkArea * formworkUnitCost;

        // Total cost per column = sum of costs times the number of columns
        const totalCost = (concreteCost + steelCost + steelFabricationCost + steelLaborCost +
            steelOverheadsCost + bindingWireCost + formworkCost + plasteringCost + columnLaborCost) * number;

        return totalCost;
    }

    function calculateTotalColumnCost() {
        let totalCost = 0;
        document.querySelectorAll('#columnTable tbody .row').forEach(row => {
            totalCost += calculateRowCost(row);
        });
        totalColumnCostInput.value = totalCost.toFixed(2);
    }

    function addRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('row');
        newRow.innerHTML = `
            <td><input type="text" class="column-name" placeholder="Column Name"></td>
            <td><input type="number" class="width" placeholder="Width (mm)"></td>
            <td><input type="number" class="depth" placeholder="Depth (mm)"></td>
            <td><input type="number" class="area" placeholder="Area (m²)" readonly></td>
            <td><input type="number" class="height" placeholder="Height (mm)"></td>
            <td><input type="number" class="number" placeholder="Number"></td>
            <td><input type="number" class="volume" placeholder="Volume (m³)" readonly></td>
            <td><input type="number" class="concrete-unit-cost" placeholder="Concrete Unit Cost (Ksh)"></td>
            <td><input type="number" class="steel-quantity" placeholder="Steel Quantity (kg)"></td>
            <td><input type="number" class="steel-unit-cost" placeholder="Steel Unit Cost (Ksh)"></td>
            <td><input type="number" class="steel-fabrication-cost" placeholder="Steel Fabrication Cost (Ksh)"></td>
            <td><input type="number" class="steel-labor-cost" placeholder="Steel Labor Cost (Ksh)"></td>
            <td><input type="number" class="steel-overheads-cost" placeholder="Steel Overheads Cost (Ksh)"></td>
            <td><input type="number" class="binding-wire-cost" placeholder="Binding Wire Cost (Ksh)"></td>
            <td><input type="number" class="formwork-area" placeholder="Formwork Area (m²)" readonly></td>
            <td><input type="number" class="formwork-unit-cost" placeholder="Formwork Unit Cost (Ksh)"></td>
            <td><input type="number" class="plastering-cost" placeholder="Plastering Cost (Ksh)" readonly></td>
            <td><input type="number" class="column-labor-cost" placeholder="Column Labor Cost (Ksh)"></td>
        `;
        columnTableBody.appendChild(newRow);

        // Attach event listeners to each input in the new row
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalColumnCost);
        });

        console.log("New column row added.");
    }

    function deleteLastRow() {
        const rows = document.querySelectorAll('#columnTable tbody .row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalColumnCost();
            console.log("Last column row deleted.");
        } else {
            alert("At least one row must remain.");
        }
    }

    function clearAllRows() {
        // Clear all inputs in every row
        document.querySelectorAll('#columnTable tbody .row').forEach(row => {
            row.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
        });
        // Clear the total cost display
        totalColumnCostInput.value = '';
        console.log("All column inputs cleared.");
    }

    // Attach event listeners to the initial row's inputs
    document.querySelectorAll('#columnTable tbody .row input').forEach(input => {
        input.addEventListener('input', calculateTotalColumnCost);
    });

    // Ensure the buttons work
    document.getElementById('addColumnRowButton').addEventListener('click', addRow);
    document.getElementById('deleteColumnRowButton').addEventListener('click', deleteLastRow);
    document.getElementById('clearColumnTableButton').addEventListener('click', clearAllRows);

    // Initial calculation in case any values are pre-filled
    calculateTotalColumnCost();
});


document.addEventListener('DOMContentLoaded', function () {
  const baseTableBody = document.querySelector('#columnBaseTable tbody');
  const totalBaseCostInput = document.getElementById('totalColumnBaseCost');

  function calculateBaseRowCost(row) {
    // Read inputs (default 0)
    const num      = parseFloat(row.querySelector('.base-number')?.value)           || 0;
    const Lmm      = parseFloat(row.querySelector('.base-length')?.value)           || 0;
    const Wmm      = parseFloat(row.querySelector('.base-width')?.value)            || 0;
    const Tmm      = parseFloat(row.querySelector('.base-thickness')?.value)        || 0;
    const concUC   = parseFloat(row.querySelector('.base-concrete-unit-cost')?.value)   || 0;
    const steelKg  = parseFloat(row.querySelector('.base-steel-quantity')?.value)        || 0;
    const fabCost  = parseFloat(row.querySelector('.base-steel-fabrication-cost')?.value)|| 0;
    const labCost  = parseFloat(row.querySelector('.base-steel-labor-cost')?.value)      || 0;
    const ovhdCost = parseFloat(row.querySelector('.base-steel-overheads-cost')?.value)   || 0;
    const steelUC  = parseFloat(row.querySelector('.base-steel-unit-cost')?.value)        || 0;
    const bindCost = parseFloat(row.querySelector('.base-binding-wire-cost')?.value)      || 0;
    const A_mm2    = parseFloat(row.querySelector('.base-formwork-area')?.value)          || 0;
    const fwUC     = parseFloat(row.querySelector('.base-formwork-unit-cost')?.value)     || 0;

    // Convert geometry to meters
    const L = Lmm / 1000, W = Wmm / 1000, T = Tmm / 1000;
    const volume = L * W * T;                   // m³
    row.querySelector('.base-volume').value = volume.toFixed(4);

    // Costs
    const concreteCost = volume * concUC;       // Ksh
    const steelCost    = steelKg * steelUC;     // Ksh
    const formworkCost = (A_mm2 / 1e6) * fwUC;   // mm²→m²

    // Sum all and multiply by number
    const totalRowCost = (concreteCost + steelCost + fabCost + labCost + ovhdCost + bindCost + formworkCost) * num;
    return totalRowCost;
  }

  function calculateTotalBaseCost() {
    let sum = 0;
    document.querySelectorAll('#columnBaseTable .base-row').forEach(row => {
      sum += calculateBaseRowCost(row);
    });
    totalBaseCostInput.value = sum.toFixed(2);
  }

  function addBaseRow() {
    const tr = document.createElement('tr');
    tr.classList.add('base-row');
    tr.innerHTML = `
      <td><input type="text" class="base-name" placeholder="Base Name"></td>
      <td><input type="number" class="base-number" placeholder="Number"></td>
      <td><input type="number" class="base-length" placeholder="Length (mm)"></td>
      <td><input type="number" class="base-width" placeholder="Width (mm)"></td>
      <td><input type="number" class="base-thickness" placeholder="Thickness (mm)"></td>
      <td><input type="number" class="base-volume" placeholder="Volume (m³)" readonly></td>
      <td><input type="number" class="base-concrete-unit-cost" placeholder="Concrete Unit Cost"></td>
      <td><input type="number" class="base-steel-quantity" placeholder="Steel Qty (kg)"></td>
      <td><input type="number" class="base-steel-fabrication-cost" placeholder="Steel Fab Cost"></td>
      <td><input type="number" class="base-steel-labor-cost" placeholder="Steel Labor Cost"></td>
      <td><input type="number" class="base-steel-overheads-cost" placeholder="Steel Overheads"></td>
      <td><input type="number" class="base-steel-unit-cost" placeholder="Steel Unit Cost"></td>
      <td><input type="number" class="base-binding-wire-cost" placeholder="Binding Wire"></td>
      <td><input type="number" class="base-formwork-area" placeholder="Formwork Area (mm²)"></td>
      <td><input type="number" class="base-formwork-unit-cost" placeholder="Formwork Unit Cost"></td>
    `;
    baseTableBody.appendChild(tr);
    tr.querySelectorAll('input').forEach(i => i.addEventListener('input', calculateTotalBaseCost));
  }

  function deleteBaseRow() {
    const rows = document.querySelectorAll('#columnBaseTable .base-row');
    if (rows.length > 1) {
      rows[rows.length-1].remove();
      calculateTotalBaseCost();
    } else {
      alert('Must keep at least one base row.');
    }
  }

  function clearBaseTable() {
    document.querySelectorAll('#columnBaseTable .base-row input').forEach(i => i.value = '');
    totalBaseCostInput.value = '';
  }

  // Bind buttons & initial listeners
  document.getElementById('addBaseRowButton').addEventListener('click', addBaseRow);
  document.getElementById('deleteBaseRowButton').addEventListener('click', deleteBaseRow);
  document.getElementById('clearBaseTableButton').addEventListener('click', clearBaseTable);
  document.querySelectorAll('#columnBaseTable .base-row input').forEach(i => i.addEventListener('input', calculateTotalBaseCost));

  // Initial calc
  calculateTotalBaseCost();
});



        
document.addEventListener('DOMContentLoaded', function () {
    console.log("Walling Cost Script Loaded and DOM is Ready");

    const wallTable = document.getElementById('wallTable').querySelector('tbody');
    const totalWallingCostInput = document.getElementById('totalWallingCost');
    const jointSize = 0.01; // 10mm joints in meters

    function calculateRowCost(row) {
        const costPerBrick = parseFloat(row.querySelector('.cost-per-brick')?.value) || 0;
        const plasteringMortarVolume = parseFloat(row.querySelector('.plastering-mortar-volume')?.value) || 0;
        const jointMortarVolume = parseFloat(row.querySelector('.joint-mortar-volume')?.value) || 0;
        const mortarCostPerCubicMeter = parseFloat(row.querySelector('.mortar-cost-per-cubic-meter')?.value) || 0;

        // Wall and Brick dimensions
        const wallLength = parseFloat(row.querySelector('.wall-length')?.value) || 0;
        const wallHeight = parseFloat(row.querySelector('.wall-height')?.value) || 0;
        const brickLength = parseFloat(row.querySelector('.brick-length')?.value) || 0;
        const brickHeight = parseFloat(row.querySelector('.brick-height')?.value) || 0;

        let totalBricks = parseFloat(row.querySelector('.total-bricks')?.value) || 0;

        if (wallLength && wallHeight && brickLength && brickHeight) {
            const wallArea = wallLength * wallHeight; // in m²
            const effectiveBrickLength = (brickLength / 1000) + jointSize; // convert mm to meters + joints
            const effectiveBrickHeight = (brickHeight / 1000) + jointSize;

            const effectiveBrickArea = effectiveBrickLength * effectiveBrickHeight; // in m²

            if (effectiveBrickArea > 0) {
                totalBricks = Math.ceil(wallArea / effectiveBrickArea);
            } else {
                totalBricks = 0;
            }
            row.querySelector('.total-bricks').value = totalBricks;
        }

        // Calculate brick cost
        const brickCost = costPerBrick * totalBricks;
        row.querySelector('.brick-cost').value = brickCost.toFixed(2);

        // Calculate total mortar volume
        const totalMortarVolume = plasteringMortarVolume + jointMortarVolume;
        row.querySelector('.mortar-volume').value = totalMortarVolume.toFixed(2);

        // Calculate total mortar cost
        const totalMortarCost = totalMortarVolume * mortarCostPerCubicMeter;
        row.querySelector('.total-mortar-cost').value = totalMortarCost.toFixed(2);

        // Total cost = brick cost + mortar cost
        const totalCost = brickCost + totalMortarCost;
        return totalCost;
    }

    function calculateTotalWallingCost() {
        let totalWallingCost = 0;
        document.querySelectorAll('.wall-row').forEach(row => {
            totalWallingCost += calculateRowCost(row);
        });
        totalWallingCostInput.value = totalWallingCost.toFixed(2);
    }

    function setupRowEventListeners(row) {
        row.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalWallingCost);
        });
    }

    function addWallRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('wall-row');
        newRow.innerHTML = `
            <td><input type="text" class="wall-name" placeholder="Wall no."></td>
            <td><input type="number" class="cost-per-brick" placeholder="Cost per Brick"></td>

            <td>
                <input type="number" class="wall-length" placeholder="Length (m)" step="0.01"><br>
                <input type="number" class="wall-height" placeholder="Height (m)" step="0.01">
            </td>

            <td>
                <input type="number" class="brick-length" placeholder="Brick Length (mm)" step="1"><br>
                <input type="number" class="brick-height" placeholder="Brick Height (mm)" step="1">
            </td>

            <td><input type="number" class="total-bricks" placeholder="Total Bricks" readonly></td>
            <td><input type="number" class="brick-cost" placeholder="Brick Cost" readonly></td>
            <td><input type="number" class="plastering-mortar-volume" placeholder="Plastering Mortar Volume"></td>
            <td><input type="number" class="joint-mortar-volume" placeholder="Joint Mortar Volume"></td>
            <td><input type="number" class="mortar-volume" placeholder="Mortar Volume" readonly></td>
            <td><input type="number" class="mortar-cost-per-cubic-meter" placeholder="Mortar Cost per cubic meter"></td>
            <td><input type="number" class="total-mortar-cost" placeholder="Total Mortar Cost" readonly></td>
        `;

        wallTable.appendChild(newRow);

        setupRowEventListeners(newRow);
        console.log("New wall row added successfully!");
    }

    function deleteLastWallRow() {
        const rows = document.querySelectorAll('.wall-row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalWallingCost();
            console.log("Last wall row deleted.");
        } else {
            alert("At least one row must remain.");
        }
    }

    // Setup initial event listeners for already existing rows
    document.querySelectorAll('.wall-row').forEach(setupRowEventListeners);

    // Attach button events
    document.getElementById('addWallRowButton').addEventListener('click', addWallRow);
    document.getElementById('deleteWallRowButton').addEventListener('click', deleteLastWallRow);

    // Initial total calculation
    calculateTotalWallingCost();
});


document.addEventListener('DOMContentLoaded', function() {
    console.log("Doors and Windows Script Loaded");

    const doorWindowTable = document.getElementById('doorWindowTable').querySelector('tbody');
    const totalDoorWindowCostInput = document.getElementById('totalDoorWindowCost');

    function calculateRowCost(row) {
        const numWindows = parseFloat(row.querySelector('.num-windows')?.value) || 0;
        const costWindowType = parseFloat(row.querySelector('.cost-window-type')?.value) || 0;
        const numDoors = parseFloat(row.querySelector('.num-doors')?.value) || 0;
        const costDoorType = parseFloat(row.querySelector('.cost-door-type')?.value) || 0;

        // Calculate total cost for windows and doors
        const totalCostWindows = numWindows * costWindowType;
        const totalCostDoors = numDoors * costDoorType;

        // Update total cost fields
        row.querySelector('.total-cost-windows').value = totalCostWindows.toFixed(2);
        row.querySelector('.total-cost-doors').value = totalCostDoors.toFixed(2);

        return totalCostWindows + totalCostDoors;
    }

    function calculateTotalDoorWindowCost() {
        let totalCost = 0;
        document.querySelectorAll('.door-window-row').forEach(row => {
            totalCost += calculateRowCost(row);
        });

        totalDoorWindowCostInput.value = totalCost.toFixed(2);
        
    }

    function addDoorWindowRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('door-window-row');
        newRow.innerHTML = `
            <td><input type="number" class="num-windows" placeholder="Number of Windows"></td>
            <td><input type="text" class="window-type" placeholder="Type of Window"></td>
            <td><input type="number" class="cost-window-type" placeholder="Cost of Window Type"></td>
            <td><input type="number" class="total-cost-windows" placeholder="Total Cost of Windows" readonly></td>
            <td><input type="number" class="num-doors" placeholder="Number of Doors"></td>
            <td><input type="text" class="door-type" placeholder="Type of Door"></td>
            <td><input type="number" class="cost-door-type" placeholder="Cost of Door Type"></td>
            <td><input type="number" class="total-cost-doors" placeholder="Total Cost of Doors" readonly></td>
        `;

        doorWindowTable.appendChild(newRow);

        // Attach event listeners to new row inputs for real-time calculations
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalDoorWindowCost);
        });

        console.log("New door/window row added!");
    }

    function deleteLastDoorWindowRow() {
        const rows = document.querySelectorAll('.door-window-row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalDoorWindowCost();
            console.log("Last door/window row deleted.");
        } else {
            alert("At least one row must remain.");
        }
        function saveDoorWindowData() {
            const data = [];
            document.querySelectorAll('.door-window-row').forEach(row => {
                data.push({
                    numWindows: row.querySelector('.num-windows').value,
                    windowType: row.querySelector('.window-type').value,
                    costWindowType: row.querySelector('.cost-window-type').value,
                    totalCostWindows: row.querySelector('.total-cost-windows').value,
                    numDoors: row.querySelector('.num-doors').value,
                    doorType: row.querySelector('.door-type').value,
                    costDoorType: row.querySelector('.cost-door-type').value,
                    totalCostDoors: row.querySelector('.total-cost-doors').value
                });
            });
        
            const totalCost = document.getElementById('totalDoorWindowCost').value;
        
            localStorage.setItem('doorWindowData', JSON.stringify(data));
            localStorage.setItem('totalDoorWindowCost', totalCost);
        }
        function loadDoorWindowData() {
            const data = JSON.parse(localStorage.getItem('doorWindowData') || '[]');
            const totalCost = localStorage.getItem('totalDoorWindowCost') || '0';
        
            doorWindowTable.innerHTML = ''; // Clear existing rows
        
            data.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.classList.add('door-window-row');
                newRow.innerHTML = `
                    <td><input type="number" class="num-windows" value="${item.numWindows}"></td>
                    <td><input type="text" class="window-type" value="${item.windowType}"></td>
                    <td><input type="number" class="cost-window-type" value="${item.costWindowType}"></td>
                    <td><input type="number" class="total-cost-windows" value="${item.totalCostWindows}" readonly></td>
                    <td><input type="number" class="num-doors" value="${item.numDoors}"></td>
                    <td><input type="text" class="door-type" value="${item.doorType}"></td>
                    <td><input type="number" class="cost-door-type" value="${item.costDoorType}"></td>
                    <td><input type="number" class="total-cost-doors" value="${item.totalCostDoors}" readonly></td>
                `;
        
                doorWindowTable.appendChild(newRow);
        
                newRow.querySelectorAll('input').forEach(input => {
                    input.addEventListener('input', () => {
                        calculateTotalDoorWindowCost();
                        saveDoorWindowData(); // Save on every change
                    });
                });
            });
        
            totalDoorWindowCostInput.value = parseFloat(totalCost).toFixed(2);
        }
                
    }

    // Attach event listeners to existing rows
    document.querySelectorAll('.door-window-row input').forEach(input => {
        input.addEventListener('input', calculateTotalDoorWindowCost);
    });

    // Ensure buttons work properly
    document.getElementById('addDoorWindowRowButton').addEventListener('click', addDoorWindowRow);
    document.getElementById('deleteDoorWindowRowButton').addEventListener('click', deleteLastDoorWindowRow);

    // Initial calculation in case values are pre-filled
    calculateTotalDoorWindowCost();
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("Foundation Cost Script Loaded");

    const foundationTable = document.getElementById('foundationTable').querySelector('tbody');
    const totalFoundationCostInput = document.getElementById('totalFoundationCost');

    // Calculate cost for one foundation row
    function calculateRowCost(row) {
        const volume = parseFloat(row.querySelector('.volume')?.value) || 0;
        const concreteCost = parseFloat(row.querySelector('.concrete-cost')?.value) || 0;
        const totalBarsLength = parseFloat(row.querySelector('.total-bars-length')?.value) || 0;
        const reinforcementWeight = parseFloat(row.querySelector('.reinforcement-weight')?.value) || 0;
        const totalBarCost = parseFloat(row.querySelector('.total-bar-cost')?.value) || 0;
        const brickCostPerPiece = parseFloat(row.querySelector('.brick-cost-per-piece')?.value) || 0;
        const totalBricks = parseFloat(row.querySelector('.total-bricks')?.value) || 0;
        const mortarVolume = parseFloat(row.querySelector('.mortar-volume')?.value) || 0;
        const mortarCost = parseFloat(row.querySelector('.mortar-cost')?.value) || 0;

        // Compute individual component costs
        const concreteTotal = volume * concreteCost;
        const reinforcementTotal = totalBarCost; // Assuming total bar cost already computed
        const bricksTotal = totalBricks * brickCostPerPiece;
        const mortarTotal = mortarVolume * mortarCost;

        // Total cost for this foundation row
        return concreteTotal + reinforcementTotal + bricksTotal + mortarTotal;
    }

    // Sum the cost of all foundation rows and update the total display
    function calculateTotalFoundationCost() {
        let totalFoundationCost = 0;
        document.querySelectorAll('.foundation-row').forEach(row => {
            totalFoundationCost += calculateRowCost(row);
        });
        console.log("Total Foundation Cost:", totalFoundationCost.toFixed(2));
        totalFoundationCostInput.value = totalFoundationCost.toFixed(2);
    }

    // Add a new foundation row with full input fields and attach event listeners
    function addFoundationRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('foundation-row');
        newRow.innerHTML = `
            <td>
                <select class="foundation-type">
                    <option value="pad">Pad Foundation</option>
                    <option value="strip">Strip Foundation</option>
                </select>
            </td>
            <td><input type="number" class="footing-thickness" placeholder="Enter thickness"></td>
            <td><input type="number" class="volume" placeholder="Enter volume"></td>
            <td><input type="number" class="concrete-cost" placeholder="Enter cost"></td>
            <td><input type="number" class="footing-bars-diameter" placeholder="Enter diameter"></td>
            <td><input type="number" class="bottom-bars-length" placeholder="Enter bottom bars length"></td>
            <td><input type="number" class="top-bars-length" placeholder="Enter top bars length"></td>
            <td><input type="number" class="total-bars-length" placeholder="Enter total bars length"></td>
            <td><input type="number" class="reinforcement-weight" placeholder="Enter weight"></td>
            <td><input type="number" class="total-bar-cost" placeholder="Enter total bar cost"></td>
            <td><input type="number" class="wall-length" placeholder="Enter wall length"></td>
            <td><input type="number" class="width" placeholder="Enter width"></td>
            <td><input type="number" class="height" placeholder="Enter height"></td>
            <td><input type="number" class="brick-cost-per-piece" placeholder="Enter cost per brick"></td>
            <td><input type="number" class="total-bricks" placeholder="Enter total bricks"></td>
            <td><input type="number" class="brick-cost" placeholder="Enter brick cost"></td>
            <td><input type="number" class="mortar-volume" placeholder="Enter mortar volume"></td>
            <td><input type="number" class="mortar-cost" placeholder="Enter mortar cost"></td>
        `;
        foundationTable.appendChild(newRow);

        // Attach input event listeners to the new row to recalc total cost when any value changes
        newRow.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', calculateTotalFoundationCost);
        });

        console.log("New foundation row added!");
    }

    function deleteLastFoundationRow() {
        const rows = document.querySelectorAll('.foundation-row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalFoundationCost();
            console.log("Last foundation row deleted.");
        } else {
            alert("At least one row must remain.");
        }
    }

    // Clear all inputs in the foundation table (reset all rows)
    function clearAllFoundationRows() {
        document.querySelectorAll('.foundation-row').forEach(row => {
            row.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            // Optionally reset select elements if needed
            const select = row.querySelector('select.foundation-type');
            if (select) {
                select.selectedIndex = 0;
            }
        });
        totalFoundationCostInput.value = '';
        console.log("All foundation inputs cleared.");
    }

    // Attach event listeners to the initial row's inputs/selects
    document.querySelectorAll('.foundation-row input, .foundation-row select').forEach(input => {
        input.addEventListener('input', calculateTotalFoundationCost);
    });

    // Button event listeners
    document.getElementById('addFoundationRowButton').addEventListener('click', addFoundationRow);
    document.getElementById('deleteFoundationRowButton').addEventListener('click', deleteLastFoundationRow);
    document.getElementById('clearFoundationTableButton').addEventListener('click', clearAllFoundationRows);

    // Initial calculation in case any values are pre-filled
    calculateTotalFoundationCost();
});


document.addEventListener("DOMContentLoaded", function () {
    function calculateExcavationCost() {
        let totalExcavationCost = 0;

        document.querySelectorAll(".excavation-row").forEach(row => {
            let length = parseFloat(row.cells[1]?.querySelector("input")?.value) || 0;
            let width = parseFloat(row.cells[2]?.querySelector("input")?.value) || 0;
            let depth = parseFloat(row.cells[3]?.querySelector("input")?.value) || 0;
            let costPerCubicMeter = parseFloat(row.cells[5]?.querySelector("input")?.value) || 0;
            let volumeField = row.cells[4]?.querySelector("input");

            let volume = (length * width * depth) / 1_000_000; // Convert mm³ to m³
            if (volumeField) {
                volumeField.value = volume.toFixed(2); // Display volume in the row
            }

            let rowCost = volume * costPerCubicMeter;
            totalExcavationCost += rowCost;
        });

        document.getElementById("totalExcavationCost").value = totalExcavationCost.toFixed(2);
    }

    function addRow() {
        let table = document.getElementById("excavationTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("excavation-row");

        newRow.innerHTML = `
            <td>
                <select title="Excavation Type">
                    <option value="Strip">Strip</option>
                    <option value="Pad">Pad</option>
                </select>
            </td>
            <td><input type="number" placeholder="Enter length"></td>
            <td><input type="number" placeholder="Enter width"></td>
            <td><input type="number" placeholder="Enter depth"></td>
            <td><input type="text" placeholder="Volume" readonly></td>
            <td><input type="number" placeholder="Enter cost per m³"></td>
            <td><button onclick="deleteRow(this)">Delete</button></td>
        `;

        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateExcavationCost);
        });
    }

    function deleteRow(button) {
        let row = button.closest("tr");
        row.remove();
        calculateExcavationCost();
    }

    document.querySelectorAll(".excavation-row input").forEach(input => {
        input.addEventListener("input", calculateExcavationCost);
    });

    window.addRow = addRow;
    window.deleteRow = deleteRow;
});


document.addEventListener('DOMContentLoaded', function () {
    // Function to calculate roofing cost and update computed fields
    function calculateRoofingCost() {
        const houseLength = parseFloat(document.getElementById('houseLength').value) || 0;
        const houseWidth = parseFloat(document.getElementById('houseWidth').value) || 0;
        const crosstieLength = parseFloat(document.getElementById('crosstieLength').value) || 0;
        const kingpostHeight = parseFloat(document.getElementById('kingpostHeight').value) || 0;
        const trussCostPerMeter = parseFloat(document.getElementById('trussCostPerMeter').value) || 0;
        const totalTrussLength = parseFloat(document.getElementById('totalTrussLength').value) || 0;
        const purlinSpacing = parseFloat(document.getElementById('purlinSpacing').value) || 0;
        const purlinCostPerMeter = parseFloat(document.getElementById('purlinCostPerMeter').value) || 0;
        const roofingAreaRight = parseFloat(document.getElementById('roofingAreaRight').value) || 0;
        const roofingAreaLeft = parseFloat(document.getElementById('roofingAreaLeft').value) || 0;
        const roofingCostPerPiece = parseFloat(document.getElementById('roofingCostPerPiece').value) || 0;
        const totalMaterial = parseFloat(document.getElementById('totalMaterial').value) || 0;

        // Calculate total truss material cost
        const totalTrussCost = totalTrussLength * trussCostPerMeter;
        document.getElementById('totalTrussCost').value = totalTrussCost.toFixed(2);

        // Calculate total purlin cost (as an example, using houseLength/purlinSpacing * houseWidth)
        const purlinCost = ((houseLength / purlinSpacing) * houseWidth) * purlinCostPerMeter;
        document.getElementById('purlinCost').value = purlinCost.toFixed(2);

        // Calculate total roofing material cost
        const roofingMaterialCost = totalMaterial * roofingCostPerPiece;
        document.getElementById('roofingMaterialCost').value = roofingMaterialCost.toFixed(2);

        // Calculate total roofing cost
            // Calculate total roofing cost
          const totalRoofingCost = totalTrussCost + purlinCost + roofingMaterialCost;
          document.getElementById('totalRoofingCost').value = totalRoofingCost.toFixed(2);

        // Save the total roofing cost into localStorage
         localStorage.setItem("totalRoofingcost", totalRoofingCost.toFixed(2));

        // Calculate total roof area (sum of right and left)
        const totalRoofArea = roofingAreaRight + roofingAreaLeft;
        document.getElementById('roofArea').value = totalRoofArea.toFixed(2);

        console.log(`Total Truss Cost: ${totalTrussCost}, Purlin Cost: ${purlinCost}, Roofing Material Cost: ${roofingMaterialCost}, Total Roofing Cost: ${totalRoofingCost}, Total Roof Area: ${totalRoofArea}`);
    }

    // Function to save roofing data to localStorage
    function saveRoofingData() {
        const roofingData = {
            houseLength: document.getElementById('houseLength').value,
            houseWidth: document.getElementById('houseWidth').value,
            crosstieLength: document.getElementById('crosstieLength').value,
            kingpostHeight: document.getElementById('kingpostHeight').value,
            trussCostPerMeter: document.getElementById('trussCostPerMeter').value,
            totalTrussLength: document.getElementById('totalTrussLength').value,
            totalTrussCost: document.getElementById('totalTrussCost').value,
            purlinSpacing: document.getElementById('purlinSpacing').value,
            purlinCostPerMeter: document.getElementById('purlinCostPerMeter').value,
            purlinCost: document.getElementById('purlinCost').value,
            roofingAreaRight: document.getElementById('roofingAreaRight').value,
            roofingAreaLeft: document.getElementById('roofingAreaLeft').value,
            roofingCostPerPiece: document.getElementById('roofingCostPerPiece').value,
            totalMaterial: document.getElementById('totalMaterial').value,
            roofingMaterialCost: document.getElementById('roofingMaterialCost').value,
            roofArea: document.getElementById('roofArea').value,
            totalRoofingCost: document.getElementById('totalRoofingCost').value,
            roofShape: document.getElementById('roofShape').value,
            roofMaterial: document.getElementById('roofMaterial').value
        };

        localStorage.setItem('roofingData', JSON.stringify(roofingData));
        console.log("Roofing data saved.");
    }

    // Function to load roofing data from localStorage
    function loadRoofingData() {
        const savedData = localStorage.getItem('roofingData');
        if (!savedData) return;
        const roofingData = JSON.parse(savedData);

        document.getElementById('houseLength').value = roofingData.houseLength || '';
        document.getElementById('houseWidth').value = roofingData.houseWidth || '';
        document.getElementById('crosstieLength').value = roofingData.crosstieLength || '';
        document.getElementById('kingpostHeight').value = roofingData.kingpostHeight || '';
        document.getElementById('trussCostPerMeter').value = roofingData.trussCostPerMeter || '';
        document.getElementById('totalTrussLength').value = roofingData.totalTrussLength || '';
        document.getElementById('totalTrussCost').value = roofingData.totalTrussCost || '';
        document.getElementById('purlinSpacing').value = roofingData.purlinSpacing || '';
        document.getElementById('purlinCostPerMeter').value = roofingData.purlinCostPerMeter || '';
        document.getElementById('purlinCost').value = roofingData.purlinCost || '';
        document.getElementById('roofingAreaRight').value = roofingData.roofingAreaRight || '';
        document.getElementById('roofingAreaLeft').value = roofingData.roofingAreaLeft || '';
        document.getElementById('roofingCostPerPiece').value = roofingData.roofingCostPerPiece || '';
        document.getElementById('totalMaterial').value = roofingData.totalMaterial || '';
        document.getElementById('roofingMaterialCost').value = roofingData.roofingMaterialCost || '';
        document.getElementById('roofArea').value = roofingData.roofArea || '';
        document.getElementById('totalRoofingCost').value = roofingData.totalRoofingCost || '';
        document.getElementById('roofShape').value = roofingData.roofShape || 'pyramid';
        document.getElementById('roofMaterial').value = roofingData.roofMaterial || 'asphaltShingles';

        // Recalculate in case some computed fields need updating
        calculateRoofingCost();
        console.log("Roofing data loaded.");
    }

    // Attach event listeners to all roofing inputs and selects to calculate cost and save data
    document.querySelectorAll('#houseLength, #houseWidth, #crosstieLength, #kingpostHeight, #trussCostPerMeter, #totalTrussLength, #purlinSpacing, #purlinCostPerMeter, #roofingAreaRight, #roofingAreaLeft, #roofingCostPerPiece, #totalMaterial').forEach(element => {
        element.addEventListener('input', function () {
            calculateRoofingCost();
            saveRoofingData();
        });
    });

    // Also attach listeners to the roof details selects
    document.getElementById('roofShape').addEventListener('change', function () {
        saveRoofingData();
    });
    document.getElementById('roofMaterial').addEventListener('change', function () {
        saveRoofingData();
    });

    // Load saved roofing data on page load
    loadRoofingData();

    // Initial calculation in case some fields are pre-filled
    calculateRoofingCost();
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Flooring Cost Script Loaded");

    const totalFlooringCostInput = document.getElementById("totalFlooringCost");

    function calculateTotalFlooringCost() {
        let totalFlooringCost = 0;

        document.querySelectorAll("#flooringTable tbody tr").forEach(row => {
            const values = row.querySelectorAll("input");
            if (values.length < 13) {
                console.error("Error: Incorrect number of input fields in a row");
                return;
            }

            const hardcoreVolume = parseFloat(values[1].value) || 0;
            const hardcoreCost = parseFloat(values[2].value) || 0;
            const marramVolume = parseFloat(values[3].value) || 0;
            const marramCost = parseFloat(values[4].value) || 0;
            const dpcAmount = parseFloat(values[5].value) || 0;
            const dpcCost = parseFloat(values[6].value) || 0;
            const brcMeshAmount = parseFloat(values[7].value) || 0;
            const brcMeshCost = parseFloat(values[8].value) || 0;
            const concreteVolume = parseFloat(values[9].value) || 0;
            const concreteCost = parseFloat(values[10].value) || 0;
            const screedMortarVolume = parseFloat(values[11].value) || 0;
            const mortarCost = parseFloat(values[12].value) || 0;

            const rowTotal = (hardcoreVolume * hardcoreCost) + (marramVolume * marramCost) +
                (dpcAmount * dpcCost) + (brcMeshAmount * brcMeshCost) +
                (concreteVolume * concreteCost) + (screedMortarVolume * mortarCost);

            totalFlooringCost += rowTotal;
        });

        totalFlooringCostInput.value = totalFlooringCost.toFixed(2);
        // Save input values to localStorage
let flooringData = [];

document.querySelectorAll("#flooringTable tbody tr").forEach(row => {
    let rowData = [];
    row.querySelectorAll("input").forEach(input => {
        rowData.push(input.value);
    });
    flooringData.push(rowData);
});

localStorage.setItem("flooringInputs", JSON.stringify(flooringData));
localStorage.setItem("flooringTotal", totalFlooringCost.toFixed(2));

    }

    function addFlooringRow() {
        let table = document.getElementById("flooringTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("flooring-row");

        newRow.innerHTML = `
            <td><input type="number" placeholder="Number"></td>
            <td><input type="number" placeholder="Hardcore Volume"></td>
            <td><input type="number" placeholder="Hardcore Cost"></td>
            <td><input type="number" placeholder="Marram Volume"></td>
            <td><input type="number" placeholder="Marram Cost"></td>
            <td><input type="number" placeholder="DPC Amount"></td>
            <td><input type="number" placeholder="DPC Cost"></td>
            <td><input type="number" placeholder="BRC Mesh Amount"></td>
            <td><input type="number" placeholder="BRC Mesh Cost"></td>
            <td><input type="number" placeholder="Concrete Volume"></td>
            <td><input type="number" placeholder="Concrete Cost"></td>
            <td><input type="number" placeholder="Screed Mortar Volume"></td>
            <td><input type="number" placeholder="Mortar Cost"></td>
        `;

        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateTotalFlooringCost);
        });
    }

    function deleteLastFlooringRow() {
        let table = document.getElementById("flooringTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateTotalFlooringCost();
        }
    }

    document.querySelectorAll("#flooringTable tbody input").forEach(input => {
        input.addEventListener("input", calculateTotalFlooringCost);
    });
    function loadFlooringInputs() {
        const savedData = localStorage.getItem("flooringInputs");
        const savedTotal = localStorage.getItem("flooringTotal");
    
        if (savedData) {
            const flooringData = JSON.parse(savedData);
            const tableBody = document.querySelector("#flooringTable tbody");
            tableBody.innerHTML = ""; // Clear existing rows
    
            flooringData.forEach(rowData => {
                let newRow = tableBody.insertRow();
                newRow.classList.add("flooring-row");
    
                rowData.forEach((value, i) => {
                    const td = newRow.insertCell();
                    const input = document.createElement("input");
                    input.type = "number";
                    input.placeholder = ""; // You can customize placeholder here if you like
                    input.value = value;
                    input.addEventListener("input", calculateTotalFlooringCost);
                    td.appendChild(input);
                });
            });
        }
    
        if (savedTotal) {
            document.getElementById("totalFlooringCost").value = savedTotal;
        }
    }
    loadFlooringInputs();
    window.addFlooringRow = addFlooringRow;
    window.deleteLastFlooringRow = deleteLastFlooringRow;
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Ceiling Cost Script Loaded");

    const totalCeilingCostInput = document.getElementById("totalCeilingCost");

    function calculateCeilingCost() {
        let totalCeilingCost = 0;

        document.querySelectorAll("#ceilingTable tbody tr").forEach(row => {
            const values = row.querySelectorAll("input");
            if (values.length < 12) {
                console.error("Error: Incorrect number of input fields in a row");
                return;
            }

            // Extract dimensions and quantities
            const length = parseFloat(values[1].value) || 0; // mm
            const width = parseFloat(values[2].value) || 0;  // mm

            const mainRunners = parseFloat(values[3].value) || 0;
            const runnerCostUnit = parseFloat(values[4].value) || 0;

            const crossTees = parseFloat(values[5].value) || 0;
            const crossTeeCostUnit = parseFloat(values[6].value) || 0;

            const wallAngles = parseFloat(values[7].value) || 0;
            const angleCostUnit = parseFloat(values[8].value) || 0;

            const hangerWires = parseFloat(values[9].value) || 0;
            const hangerWireCost = parseFloat(values[10].value) || 0;

            // Regenerated costs (quantity × unit cost)
            const runnerCost = mainRunners * runnerCostUnit;
            const crossTeeCost = crossTees * crossTeeCostUnit;
            const angleCost = wallAngles * angleCostUnit;
            const suspensionCost = hangerWires * hangerWireCost;

            // Update Total Suspension Cost Cell (index 11)
            values[11].value = (runnerCost + crossTeeCost + angleCost + suspensionCost).toFixed(2);

            // Total room ceiling cost
            totalCeilingCost += runnerCost + crossTeeCost + angleCost + suspensionCost;
        });

     // Additional materials (new simplified logic)
document.querySelectorAll("#ceilingMaterialTable tbody tr").forEach(row => {
    const inputs = row.querySelectorAll("input");
    if (inputs.length < 2) return;

    const units = parseFloat(inputs[0].value) || 0;
    const unitCost = parseFloat(inputs[1].value) || 0;

    const materialCost = units * unitCost;
    totalCeilingCost += materialCost;
});


        totalCeilingCostInput.value = totalCeilingCost.toFixed(2);

        // Save ceiling data
        let ceilingData = [];
        document.querySelectorAll("#ceilingTable tbody tr").forEach(row => {
            let rowData = [];
            row.querySelectorAll("input").forEach(input => {
                rowData.push(input.value);
            });
            ceilingData.push(rowData);
        });
        localStorage.setItem("ceilingInputs", JSON.stringify(ceilingData));

        let ceilingMaterialData = [];
        document.querySelectorAll("#ceilingMaterialTable tbody tr").forEach(row => {
            let select = row.querySelector("select");
            let inputs = row.querySelectorAll("input");
            let rowData = [select.value];
        
            inputs.forEach(input => rowData.push(input.value));
            ceilingMaterialData.push(rowData);
        });
        localStorage.setItem("ceilingMaterialInputs", JSON.stringify(ceilingMaterialData));
        
localStorage.setItem("ceilingMaterialInputs", JSON.stringify(ceilingMaterialData));

           
    }

    function addCeilingRow() {
        let table = document.getElementById("ceilingTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("ceiling-row");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Room"></td>
            <td><input type="number" placeholder="Room Length"></td>
            <td><input type="number" placeholder="Room Width"></td>
            <td><input type="number" placeholder="Main Runners"></td>
            <td><input type="number" placeholder="Runner Cost"></td>
            <td><input type="number" placeholder="Cross Tees"></td>
            <td><input type="number" placeholder="Cross Tee Cost"></td>
            <td><input type="number" placeholder="Wall Angles"></td>
            <td><input type="number" placeholder="Angle Cost"></td>
            <td><input type="number" placeholder="Hanger Wires"></td>
            <td><input type="number" placeholder="Hanger Wire Cost"></td>
            <td><input type="number" placeholder="Total Suspension System Cost"></td>
        `;

        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateCeilingCost);
        });
    }

    function deleteLastCeilingRow() {
        let table = document.getElementById("ceilingTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateCeilingCost();
        }
    }

    document.querySelectorAll("#ceilingTable tbody input, #ceilingMaterialTable tbody input").forEach(input => {
        input.addEventListener("input", calculateCeilingCost);
    });

    function loadCeilingInputs() {
        const ceilingData = JSON.parse(localStorage.getItem("ceilingInputs"));
        const ceilingMaterialData = JSON.parse(localStorage.getItem("ceilingMaterialInputs"));
        const savedTotal = localStorage.getItem("ceilingTotal");

        // Load ceiling rows
        if (ceilingData && Array.isArray(ceilingData)) {
            const tableBody = document.querySelector("#ceilingTable tbody");
            tableBody.innerHTML = "";

            ceilingData.forEach(rowData => {
                let newRow = tableBody.insertRow();
                newRow.classList.add("ceiling-row");

                rowData.forEach(value => {
                    const td = newRow.insertCell();
                    const input = document.createElement("input");
                    input.type = isNaN(value) ? "text" : "number";
                    input.placeholder = "";
                    input.value = value;
                    input.addEventListener("input", calculateCeilingCost);
                    td.appendChild(input);
                });
            });
        }

       // Load ceiling material rows
if (ceilingMaterialData && Array.isArray(ceilingMaterialData)) {
    const matBody = document.querySelector("#ceilingMaterialTable tbody");
    matBody.innerHTML = "";

    ceilingMaterialData.forEach(rowData => {
        let newRow = matBody.insertRow();

        rowData.forEach((value, index) => {
            const td = newRow.insertCell();

            if (index === 0) {
                // First cell: create <select> for ceiling material
                const select = document.createElement("select");
                select.title = "Select Ceiling Material";
                select.innerHTML = `
                    <option value="gypsum">Gypsum Ceilings</option>
                    <option value="plaster">Plaster Ceiling</option>
                    <option value="fiber">Fiber Ceiling</option>
                    <option value="wooden">Wooden Ceiling</option>
                    <option value="glass">Glass Ceiling</option>
                    <option value="metal">Metal Ceiling</option>
                    <option value="synthetic">Synthetic Leather or Cloth Ceiling</option>
                `;
                select.value = value;
                td.appendChild(select);
            } else {
                // Other cells: create <input>
                const input = document.createElement("input");
                input.type = "number";

                if (index === 1) {
                    input.placeholder = "Ceiling Units";
                    input.value = value;
                    input.addEventListener("input", calculateCeilingCost);
                } else if (index === 2) {
                    input.placeholder = "Unit Cost";
                    input.value = value;
                    input.addEventListener("input", calculateCeilingCost);
                } else if (index === 3) {
                    input.placeholder = "Material Cost";
                    input.value = value;
                    input.readOnly = true;
                }

                td.appendChild(input);
            }
        });
    });

    // Recalculate after loading
    calculateCeilingCost();
}


        // Load total cost
        if (savedTotal) {
            document.getElementById("totalCeilingCost").value = savedTotal;
        }
    }

    window.addCeilingRow = addCeilingRow;
    window.deleteLastCeilingRow = deleteLastCeilingRow;

    loadCeilingInputs();
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("Equipment Cost Script Loaded");
    loadEquipmentData();

    function calculateEquipmentCost() {
        let totalEquipmentCost = 0;

        document.querySelectorAll("#equipmentTable tbody tr").forEach(row => {
            const inputs = row.querySelectorAll("input");
            if (inputs.length < 4) return;

            const hourlyRate = parseFloat(inputs[1].value) || 0;
            const operationHours = parseFloat(inputs[2].value) || 0;
            const totalCostField = inputs[3];

            const totalCost = hourlyRate * operationHours;
            totalCostField.value = totalCost.toFixed(2);

            totalEquipmentCost += totalCost;
        });

        document.getElementById("totalEquipmentCost").value = totalEquipmentCost.toFixed(2);
        saveEquipmentData(); // ✅ Save once after all calculations
    }

    function addEquipmentRow() {
        let table = document.getElementById("equipmentTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("equipment-row");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Equipment"></td>
            <td><input type="number" placeholder="Hourly Rate"></td>
            <td><input type="number" placeholder="Operation Hours"></td>
            <td><input type="number" placeholder="Total Cost" readonly></td>
        `;

        // Add input listeners for new row
        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateEquipmentCost);
        });
    }

    function deleteLastEquipmentRow() {
        let table = document.getElementById("equipmentTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateEquipmentCost();
        }
    }

    // Bind calculation to all existing inputs
    document.querySelectorAll("#equipmentTable tbody input").forEach(input => {
        input.addEventListener("input", calculateEquipmentCost);
    });

    // Make the add/delete functions available globally (for buttons to use)
    window.addEquipmentRow = addEquipmentRow;
    window.deleteLastEquipmentRow = deleteLastEquipmentRow;

    function saveEquipmentData() {
        const rows = document.querySelectorAll("#equipmentTable tbody tr");
        rows.forEach((row, index) => {
            const inputs = row.querySelectorAll("input");
            if (inputs.length < 4) return;
            localStorage.setItem(`equipment_name_${index}`, inputs[0].value);
            localStorage.setItem(`hourly_rate_${index}`, inputs[1].value);
            localStorage.setItem(`operation_hours_${index}`, inputs[2].value);
            localStorage.setItem(`total_cost_${index}`, inputs[3].value);
        });
        localStorage.setItem("equipment_row_count", rows.length);
        localStorage.setItem("total_equipment_cost", document.getElementById("totalEquipmentCost").value);
    }

    function loadEquipmentData() {
        const rowCount = parseInt(localStorage.getItem("equipment_row_count") || "0");
        for (let i = 0; i < rowCount; i++) {
            if (i >= document.querySelectorAll("#equipmentTable tbody tr").length) {
                addEquipmentRow(); // use local function, not window.addEquipmentRow
            }
            const inputs = document.querySelectorAll("#equipmentTable tbody tr")[i].querySelectorAll("input");
            inputs[0].value = localStorage.getItem(`equipment_name_${i}`) || "";
            inputs[1].value = localStorage.getItem(`hourly_rate_${i}`) || "";
            inputs[2].value = localStorage.getItem(`operation_hours_${i}`) || "";
            inputs[3].value = localStorage.getItem(`total_cost_${i}`) || "";

            // Rebind input listeners (important after loading)
            inputs.forEach(input => {
                input.removeEventListener("input", calculateEquipmentCost); // avoid duplicate listeners
                input.addEventListener("input", calculateEquipmentCost);
            });
        }
        document.getElementById("totalEquipmentCost").value = localStorage.getItem("total_equipment_cost") || "";
    }
});




document.addEventListener('DOMContentLoaded', (event) => {
    const optimisticCostInput = document.getElementById('optimisticCost');
    const mostLikelyCostInput = document.getElementById('mostLikelyCost');
    const pessimisticCostInput = document.getElementById('pessimisticCost');
    const estimatedContingencyCostInput = document.getElementById('estimatedContingencyCost');
    const totalContingencyCostInput = document.querySelector('.total-cost input[title="Total Cost"]');

    if (!optimisticCostInput || !mostLikelyCostInput || !pessimisticCostInput || !estimatedContingencyCostInput || !totalContingencyCostInput) {
        console.error('One or more input elements not found');
        return;
    }

    function calculateTotalContingencyCost() {
        const optimisticCost = parseFloat(optimisticCostInput.value) || 0;
        const mostLikelyCost = parseFloat(mostLikelyCostInput.value) || 0;
        const pessimisticCost = parseFloat(pessimisticCostInput.value) || 0;

        // Calculate the estimated contingency cost using the PERT formula
        const estimatedContingencyCost = (optimisticCost + 4 * mostLikelyCost + pessimisticCost) / 6;

        console.log(`Optimistic Cost: ${optimisticCost}, Most Likely Cost: ${mostLikelyCost}, Pessimistic Cost: ${pessimisticCost}`);
        console.log(`Estimated Contingency Cost: ${estimatedContingencyCost}`);

        // Display the estimated contingency cost
        estimatedContingencyCostInput.value = estimatedContingencyCost.toFixed(2);

        // Display the total contingency cost
        totalContingencyCostInput.value = estimatedContingencyCost.toFixed(2);
    }

    optimisticCostInput.addEventListener('input', calculateTotalContingencyCost);
    mostLikelyCostInput.addEventListener('input', calculateTotalContingencyCost);
    pessimisticCostInput.addEventListener('input', calculateTotalContingencyCost);

    // Initial calculation to set the total cost on page load
    calculateTotalContingencyCost();
    // Load saved individual inputs
    loadContingencyCostInputsIndividually();

    // Save inputs individually on input
    [optimisticCostInput, mostLikelyCostInput, pessimisticCostInput].forEach(input => {
        input.addEventListener('input', () => {
            calculateTotalContingencyCost(); // Recalculate on input
            saveContingencyCostInputsIndividually(); // Save after change
        });
    });

    function saveContingencyCostInputsIndividually() {
        const optimisticEl = document.getElementById('optimisticCost');
        const mostLikelyEl = document.getElementById('mostLikelyCost');
        const pessimisticEl = document.getElementById('pessimisticCost');
        const estimatedEl = document.getElementById('estimatedContingencyCost');
    
        if (optimisticEl) localStorage.setItem('optimisticCost', optimisticEl.value || '');
        if (mostLikelyEl) localStorage.setItem('mostLikelyCost', mostLikelyEl.value || '');
        if (pessimisticEl) localStorage.setItem('pessimisticCost', pessimisticEl.value || '');
        if (estimatedEl) localStorage.setItem('estimatedContingencyCost', estimatedEl.value || '');
    }
    
    function loadContingencyCostInputsIndividually() {
        const optimisticEl = document.getElementById('optimisticCost');
        const mostLikelyEl = document.getElementById('mostLikelyCost');
        const pessimisticEl = document.getElementById('pessimisticCost');
        const estimatedEl = document.getElementById('estimatedContingencyCost');
    
        if (optimisticEl) optimisticEl.value = localStorage.getItem('optimisticCost') || '';
        if (mostLikelyEl) mostLikelyEl.value = localStorage.getItem('mostLikelyCost') || '';
        if (pessimisticEl) pessimisticEl.value = localStorage.getItem('pessimisticCost') || '';
        if (estimatedEl) estimatedEl.value = localStorage.getItem('estimatedContingencyCost') || '';
    }
    
    
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("Overhead Cost Script Loaded");

    function calculateOverheadCost() {
        let totalOverheadCost = 0;

        document.querySelectorAll(".overhead-cost").forEach(input => {
            totalOverheadCost += parseFloat(input.value) || 0;
        });

        document.getElementById("totalOverheadCost").value = totalOverheadCost.toFixed(2);
        saveOverheadCostsIndividually(); // Save every time total is calculated
    }

    function addOverheadRow() {
        const table = document.getElementById("overheadTable").getElementsByTagName("tbody")[0];
        const newRow = table.insertRow();
        newRow.classList.add("overhead-row");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Overhead Cost Item"></td>
            <td><input type="number" class="overhead-cost" placeholder="Cost"></td>
        `;

        const input = newRow.querySelector(".overhead-cost");
        input.addEventListener("input", calculateOverheadCost);
    }

    function deleteLastOverheadRow() {
        const table = document.getElementById("overheadTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateOverheadCost();
        }
    }

    function saveOverheadCostsIndividually() {
        const rows = document.querySelectorAll("#overheadTable tbody tr");
        rows.forEach((row, index) => {
            const inputs = row.querySelectorAll("input");
            localStorage.setItem(`overhead_item_${index}`, inputs[0].value || '');
            localStorage.setItem(`overheadCost_${index}`, inputs[1].value || '');
        });
        localStorage.setItem('overheadCostCount', rows.length);
        localStorage.setItem('totalOverheadCost', document.getElementById("totalOverheadCost").value || '');
    }

    function loadOverheadCostsIndividually() {
        const overheadCostCount = parseInt(localStorage.getItem('overheadCostCount')) || 0;
        const tableBody = document.getElementById("overheadTable").getElementsByTagName("tbody")[0];

        while (tableBody.rows.length < overheadCostCount) {
            addOverheadRow();
        }

        for (let i = 0; i < overheadCostCount; i++) {
            const inputs = tableBody.querySelectorAll("tr")[i].querySelectorAll("input");
            inputs[0].value = localStorage.getItem(`overhead_item_${i}`) || '';
            inputs[1].value = localStorage.getItem(`overheadCost_${i}`) || '';

            // Re-bind listeners for safety
            inputs[1].removeEventListener("input", calculateOverheadCost);
            inputs[1].addEventListener("input", calculateOverheadCost);
        }

        document.getElementById("totalOverheadCost").value = localStorage.getItem("totalOverheadCost") || '';
    }

    // Bind listeners to existing inputs
    document.querySelectorAll(".overhead-cost").forEach(input => {
        input.addEventListener("input", calculateOverheadCost);
    });

    // Expose functions globally for buttons
    window.addOverheadRow = addOverheadRow;
    window.deleteLastOverheadRow = deleteLastOverheadRow;

    loadOverheadCostsIndividually();
    calculateOverheadCost(); // Initial calculation after loading
});


document.addEventListener("DOMContentLoaded", function () {
    function calculateTotalConstructionCost() {
        const totalBeamCost = parseFloat(document.getElementById("totalBeamCost").value) || 0;
        const totalColumnCost = parseFloat(document.getElementById("totalColumnCost").value) || 0;
        const totalWallingCost = parseFloat(document.getElementById("totalWallingCost").value) || 0;
        const totalDoorWindowCost = parseFloat(document.getElementById("totalDoorWindowCost").value) || 0;
        const totalFoundationCost = parseFloat(document.getElementById("totalFoundationCost").value) || 0;
        const totalExcavationCost = parseFloat(document.getElementById("totalExcavationCost").value) || 0;
        const totalRoofingCost = parseFloat(document.getElementById("totalRoofingCost").value) || 0;
        const totalFlooringCost = parseFloat(document.getElementById("totalFlooringCost").value) || 0;
        const totalCeilingCost = parseFloat(document.getElementById("totalCeilingCost").value) || 0;
        const totalEquipmentCost = parseFloat(document.getElementById("totalEquipmentCost").value) || 0;
        const estimatedContingencyCost = parseFloat(document.getElementById("estimatedContingencyCost").value) || 0;
        const totalOverheadCost = parseFloat(document.getElementById("totalOverheadCost").value) || 0;

        const totalConstructionCost = totalBeamCost + totalColumnCost + totalWallingCost + totalDoorWindowCost +
            totalFoundationCost + totalExcavationCost + totalRoofingCost + totalFlooringCost + totalCeilingCost +
            totalEquipmentCost + estimatedContingencyCost + totalOverheadCost;

        document.getElementById("totalConstructionCost").value = totalConstructionCost.toFixed(2);
    }

    document.getElementById("calculateBtn").addEventListener("click", calculateTotalConstructionCost);
});
document.addEventListener("DOMContentLoaded", function () {
    // Get the stored total finishing cost from localStorage
    let savedFinishingCost = localStorage.getItem("totalFinishingCost");

    // Display the value if it exists
    if (savedFinishingCost !== null) {
        document.getElementById("totalFinishingCost").value = savedFinishingCost;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve from localStorage
    let storedTotalCost = localStorage.getItem("TotalBuildingServicesCost");

    // If there's a stored value, display it
    if (storedTotalCost) {
        document.getElementById("totalBuildingServicesCost").value = storedTotalCost;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", function () {
        // Retrieve values from the input fields
        let constructionCost = parseFloat(document.getElementById("totalConstructionCost").value) || 0;
        let finishingCost = parseFloat(document.getElementById("totalFinishingCost").value) || 0;
        let buildingServicesCost = parseFloat(document.getElementById("totalBuildingServicesCost").value) || 0;

        // Calculate total project cost
        let totalProjectCost = constructionCost + finishingCost + buildingServicesCost;

        // Display total project cost in the input field
        document.getElementById("totalProjectCost").value = totalProjectCost;
    });
});
document.addEventListener('DOMContentLoaded', (event) => { 
    // Function to save table data to localStorage along with total costs
    function saveTableData(tableId, totalId) {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tbody tr');
        const tableData = [];

        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll('input, select').forEach(cell => {
                rowData.push(cell.value);
            });
            tableData.push(rowData);
        });

        // Save table data and total cost to localStorage
        localStorage.setItem(tableId, JSON.stringify(tableData));
        const totalCell = document.getElementById(totalId);
        if (totalCell) {
            localStorage.setItem(totalId, totalCell.value); // Save total cost from input field
        }

        saveOverallTotals(); // Save overall construction-related totals
    }

    // Function to load table data and total costs from localStorage
    function loadTableData(tableId, totalId) {
        const table = document.getElementById(tableId);
        const tableData = JSON.parse(localStorage.getItem(tableId));

        if (tableData) {
            const rows = table.querySelectorAll('tbody tr');
            tableData.forEach((rowData, rowIndex) => {
                const row = rows[rowIndex];
                if (row) {
                    row.querySelectorAll('input, select').forEach((cell, cellIndex) => {
                        cell.value = rowData[cellIndex];
                    });
                }
            });
        }

        // Load total cost from localStorage
        const savedTotal = localStorage.getItem(totalId);
        if (savedTotal) {
            const totalCell = document.getElementById(totalId);
            if (totalCell) {
                totalCell.value = savedTotal; // Restore total cost to input
            }
        }
    }

    // Function to save overall categorized totals and total project cost
    function saveOverallTotals() {
        const overallTotals = [ 'totalBuildingServicesCost', 'totalFinishingCost', 'totalProjectCost'];
        overallTotals.forEach(totalId => {
            const totalCell = document.getElementById(totalId);
            if (totalCell) {
                localStorage.setItem(totalId, totalCell.value); // Save overall totals
            }
        });
    }

    // Function to load overall totals on page load
    function loadOverallTotals() {
        const overallTotals = ['totalBuildingServicesCost', 'totalFinishingCost', 'totalProjectCost'];
        overallTotals.forEach(totalId => {
            const savedTotal = localStorage.getItem(totalId);
            if (savedTotal) {
                const totalCell = document.getElementById(totalId);
                if (totalCell) {
                    totalCell.value = savedTotal; // Restore overall totals
                }
            }
        });
    }

    // Table IDs and corresponding total cost input IDs
    const tableData = [
        { tableId: 'beamTable', totalId: 'totalBeamCost' },
        { tableId: 'columnTable', totalId: 'totalColumnCost' },
        { tableId: 'wallTable', totalId: 'totalWallingCost' },
        { tableId: 'doorWindowTable', totalId: 'totalDoorWindowCost' },
        { tableId: 'foundationTable', totalId: 'totalFoundationCost' },
        { tableId: 'excavationTable', totalId: 'totalExcavationCost' },
        { tableId: 'roofingTable', totalId: 'totalRoofingCost' },
        { tableId: 'flooringTable', totalId: 'totalFlooringCost' },
        { tableId: 'ceilingTable', totalId: 'totalCeilingCost' },
        { tableId: 'equipmentTable', totalId: 'totalEquipmentCost' },
        { tableId: 'overheadTable', totalId: 'totalOverheadCost' },
        { tableId: 'contingencyTable', totalId: 'estimatedContingencyCost' }
    ];

    // Load table data and totals on page load
    tableData.forEach(({ tableId, totalId }) => loadTableData(tableId, totalId));
    loadOverallTotals();

    // Add event listeners to save data and totals on input change
    tableData.forEach(({ tableId, totalId }) => {
        const table = document.getElementById(tableId);
        table.addEventListener('input', () => saveTableData(tableId, totalId));
    });
});

        const span = parseFloat(row.querySelector('.span')?.value) || 0;
        const number = parseFloat(row.querySelector('.number')?.value) || 0;

        const concreteUnitCost = parseFloat(row.querySelector('.concrete-unit-cost')?.value) || 0;
        const steelQuantity = parseFloat(row.querySelector('.steel-quantity')?.value) || 0;
        const steelUnitCost = parseFloat(row.querySelector('.steel-unit-cost')?.value) || 0;
        const steelFabricationCost = parseFloat(row.querySelector('.steel-fabrication-cost')?.value) || 0;
        const steelLaborCost = parseFloat(row.querySelector('.steel-labor-cost')?.value) || 0;
        const steelOverheadsCost = parseFloat(row.querySelector('.steel-overheads-cost')?.value) || 0;
        const bindingWireCost = parseFloat(row.querySelector('.binding-wire-cost')?.value) || 0;
        const formworkUnitCost = parseFloat(row.querySelector('.formwork-unit-cost')?.value) || 0;
        const beamLaborCost = parseFloat(row.querySelector('.beam-labor-cost')?.value) || 0;

        // Convert dimensions to meters
        const heightM = height / 1000;
        const widthM = width / 1000;
        const spanM = span / 1000;

        // Area and volume
        const area = heightM * widthM;
        const volume = area * spanM;
        const formworkArea = 2 * (heightM * spanM) + 2 * (widthM * spanM);
        const plasteringCost = formworkArea * 150; // Example: Ksh 150 per m²

        // Populate calculated fields
        row.querySelector('.area').value = area.toFixed(2);
        row.querySelector('.volume').value = volume.toFixed(3);
        row.querySelector('.formwork-area').value = formworkArea.toFixed(2);
        row.querySelector('.plastering-cost').value = plasteringCost.toFixed(2);

        // Individual cost components
        const concreteCost = volume * concreteUnitCost;
        const steelCost = steelQuantity * steelUnitCost;
        const formworkCost = formworkArea * formworkUnitCost;

        // Total per beam * number
        const totalCost = (concreteCost + steelCost + steelFabricationCost + steelLaborCost +
            steelOverheadsCost + bindingWireCost + formworkCost + plasteringCost + beamLaborCost) * number;

        return totalCost;
    }

    function calculateTotalBeamCost() {
        let totalBeamCost = 0;
        document.querySelectorAll('.row').forEach(row => {
            totalBeamCost += calculateRowCost(row);
        });
        totalBeamCostInput.value = totalBeamCost.toFixed(2);
    }

    function addRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('row');
        newRow.innerHTML = `
            <td><input type="text" class="beam-name" placeholder="Beam Name"></td>
            <td><input type="number" class="height" placeholder="Height (mm)"></td>
            <td><input type="number" class="width" placeholder="Width (mm)"></td>
            <td><input type="number" class="area" placeholder="Surface Area (m²)" readonly></td>
            <td><input type="number" class="span" placeholder="Span (mm)"></td>
            <td><input type="number" class="number" placeholder="Number"></td>
            <td><input type="number" class="volume" placeholder="Volume (m³)" readonly></td>
            <td><input type="number" class="concrete-unit-cost" placeholder="Concrete Unit Cost"></td>
            <td><input type="number" class="steel-quantity" placeholder="Steel Quantity (kg)"></td>
            <td><input type="number" class="steel-unit-cost" placeholder="Steel Unit Cost (Ksh)"></td>
            <td><input type="number" class="steel-fabrication-cost" placeholder="Steel Fabrication Cost (Ksh)"></td>
            <td><input type="number" class="steel-labor-cost" placeholder="Steel Labor Cost (Ksh)"></td>
            <td><input type="number" class="steel-overheads-cost" placeholder="Steel Overheads Cost (Ksh)"></td>
            <td><input type="number" class="binding-wire-cost" placeholder="Binding Wire Cost (Ksh)"></td>
            <td><input type="number" class="formwork-area" placeholder="Formwork Area (m²)" readonly></td>
            <td><input type="number" class="formwork-unit-cost" placeholder="Formwork Unit Cost (Ksh)"></td>
            <td><input type="number" class="plastering-cost" placeholder="Plastering Cost (Ksh)" readonly></td>
            <td><input type="number" class="beam-labor-cost" placeholder="Beam Labor Cost"></td>
        `;
        beamTable.appendChild(newRow);

        // Reattach listeners
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalBeamCost);
        });

        console.log("New row added.");
    }

    function deleteLastRow() {
        const rows = document.querySelectorAll('.row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalBeamCost();
        } else {
            alert("At least one row must remain.");
        }
    }

    // Attach listeners to initial row
    document.querySelectorAll('.row input').forEach(input => {
        input.addEventListener('input', calculateTotalBeamCost);
    });

    document.getElementById('addRowButton').addEventListener('click', addRow);
    document.getElementById('deleteRowButton').addEventListener('click', deleteLastRow);

    calculateTotalBeamCost();
});
function clearAllInputs() {
    document.querySelectorAll('#beamTable tbody .row').forEach(row => {
        row.querySelectorAll('input').forEach(input => {
            if (!input.readOnly) {
                input.value = '';
            } else {
                input.value = ''; // Also clear readonly cells; they will recalculate on next input
            }
        });
    });
    totalBeamCostInput.value = '';
    console.log("All inputs cleared.");
}

document.getElementById('clearAllButton').addEventListener('click', clearAllInputs);



document.addEventListener('DOMContentLoaded', function () {
    console.log("Column Script Loaded and DOM is Ready");

    const columnTableBody = document.getElementById('columnTable').querySelector('tbody');
    const totalColumnCostInput = document.getElementById('totalColumnCost');

    function calculateRowCost(row) {
        // Get input values (defaulting to 0 if empty)
        const width = parseFloat(row.querySelector('.width')?.value) || 0;
        const depth = parseFloat(row.querySelector('.depth')?.value) || 0;
        const height = parseFloat(row.querySelector('.height')?.value) || 0;
        const number = parseFloat(row.querySelector('.number')?.value) || 0;

        const concreteUnitCost = parseFloat(row.querySelector('.concrete-unit-cost')?.value) || 0;
        const steelQuantity = parseFloat(row.querySelector('.steel-quantity')?.value) || 0;
        const steelUnitCost = parseFloat(row.querySelector('.steel-unit-cost')?.value) || 0;
        const steelFabricationCost = parseFloat(row.querySelector('.steel-fabrication-cost')?.value) || 0;
        const steelLaborCost = parseFloat(row.querySelector('.steel-labor-cost')?.value) || 0;
        const steelOverheadsCost = parseFloat(row.querySelector('.steel-overheads-cost')?.value) || 0;
        const bindingWireCost = parseFloat(row.querySelector('.binding-wire-cost')?.value) || 0;
        const formworkUnitCost = parseFloat(row.querySelector('.formwork-unit-cost')?.value) || 0;
        const columnLaborCost = parseFloat(row.querySelector('.column-labor-cost')?.value) || 0;

        // Convert dimensions from mm to m for calculations
        const widthM = width / 1000;
        const depthM = depth / 1000;
        const heightM = height / 1000;

        // Calculate area (in m²) from width and depth
        const area = widthM * depthM;
        // Calculate volume of concrete (in cubic meters): volume = area * height
        const volume = area * heightM;
        // Calculate formwork area (in m²): perimeter * height (for a rectangular column)
        const formworkArea = 2 * (widthM + depthM) * heightM;
        // Calculate plastering cost: assume a fixed rate of 150 Ksh per m²
        const plasteringCost = formworkArea * 150;

        // Populate the readonly calculated fields in the row
        row.querySelector('.area').value = area.toFixed(2);
        row.querySelector('.volume').value = volume.toFixed(3);
        row.querySelector('.formwork-area').value = formworkArea.toFixed(2);
        row.querySelector('.plastering-cost').value = plasteringCost.toFixed(2);

        // Calculate cost components
        const concreteCost = volume * concreteUnitCost;
        const steelCost = steelQuantity * steelUnitCost;
        const formworkCost = formworkArea * formworkUnitCost;

        // Total cost per column = sum of costs times the number of columns
        const totalCost = (concreteCost + steelCost + steelFabricationCost + steelLaborCost +
            steelOverheadsCost + bindingWireCost + formworkCost + plasteringCost + columnLaborCost) * number;

        return totalCost;
    }

    function calculateTotalColumnCost() {
        let totalCost = 0;
        document.querySelectorAll('#columnTable tbody .row').forEach(row => {
            totalCost += calculateRowCost(row);
        });
        totalColumnCostInput.value = totalCost.toFixed(2);
    }

    function addRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('row');
        newRow.innerHTML = `
            <td><input type="text" class="column-name" placeholder="Column Name"></td>
            <td><input type="number" class="width" placeholder="Width (mm)"></td>
            <td><input type="number" class="depth" placeholder="Depth (mm)"></td>
            <td><input type="number" class="area" placeholder="Area (m²)" readonly></td>
            <td><input type="number" class="height" placeholder="Height (mm)"></td>
            <td><input type="number" class="number" placeholder="Number"></td>
            <td><input type="number" class="volume" placeholder="Volume (m³)" readonly></td>
            <td><input type="number" class="concrete-unit-cost" placeholder="Concrete Unit Cost (Ksh)"></td>
            <td><input type="number" class="steel-quantity" placeholder="Steel Quantity (kg)"></td>
            <td><input type="number" class="steel-unit-cost" placeholder="Steel Unit Cost (Ksh)"></td>
            <td><input type="number" class="steel-fabrication-cost" placeholder="Steel Fabrication Cost (Ksh)"></td>
            <td><input type="number" class="steel-labor-cost" placeholder="Steel Labor Cost (Ksh)"></td>
            <td><input type="number" class="steel-overheads-cost" placeholder="Steel Overheads Cost (Ksh)"></td>
            <td><input type="number" class="binding-wire-cost" placeholder="Binding Wire Cost (Ksh)"></td>
            <td><input type="number" class="formwork-area" placeholder="Formwork Area (m²)" readonly></td>
            <td><input type="number" class="formwork-unit-cost" placeholder="Formwork Unit Cost (Ksh)"></td>
            <td><input type="number" class="plastering-cost" placeholder="Plastering Cost (Ksh)" readonly></td>
            <td><input type="number" class="column-labor-cost" placeholder="Column Labor Cost (Ksh)"></td>
        `;
        columnTableBody.appendChild(newRow);

        // Attach event listeners to each input in the new row
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalColumnCost);
        });

        console.log("New column row added.");
    }

    function deleteLastRow() {
        const rows = document.querySelectorAll('#columnTable tbody .row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalColumnCost();
            console.log("Last column row deleted.");
        } else {
            alert("At least one row must remain.");
        }
    }

    function clearAllRows() {
        // Clear all inputs in every row
        document.querySelectorAll('#columnTable tbody .row').forEach(row => {
            row.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
        });
        // Clear the total cost display
        totalColumnCostInput.value = '';
        console.log("All column inputs cleared.");
    }

    // Attach event listeners to the initial row's inputs
    document.querySelectorAll('#columnTable tbody .row input').forEach(input => {
        input.addEventListener('input', calculateTotalColumnCost);
    });

    // Ensure the buttons work
    document.getElementById('addColumnRowButton').addEventListener('click', addRow);
    document.getElementById('deleteColumnRowButton').addEventListener('click', deleteLastRow);
    document.getElementById('clearColumnTableButton').addEventListener('click', clearAllRows);

    // Initial calculation in case any values are pre-filled
    calculateTotalColumnCost();
});


document.addEventListener('DOMContentLoaded', function () {
    console.log("Walling Cost Script Loaded and DOM is Ready");

    const wallTable = document.getElementById('wallTable').querySelector('tbody');
    const totalWallingCostInput = document.getElementById('totalWallingCost');
    const jointSize = 0.01; // 10mm joints in meters

    function calculateRowCost(row) {
        const costPerBrick = parseFloat(row.querySelector('.cost-per-brick')?.value) || 0;
        const plasteringMortarVolume = parseFloat(row.querySelector('.plastering-mortar-volume')?.value) || 0;
        const jointMortarVolume = parseFloat(row.querySelector('.joint-mortar-volume')?.value) || 0;
        const mortarCostPerCubicMeter = parseFloat(row.querySelector('.mortar-cost-per-cubic-meter')?.value) || 0;

        // Wall and Brick dimensions
        const wallLength = parseFloat(row.querySelector('.wall-length')?.value) || 0;
        const wallHeight = parseFloat(row.querySelector('.wall-height')?.value) || 0;
        const brickLength = parseFloat(row.querySelector('.brick-length')?.value) || 0;
        const brickHeight = parseFloat(row.querySelector('.brick-height')?.value) || 0;

        let totalBricks = parseFloat(row.querySelector('.total-bricks')?.value) || 0;

        if (wallLength && wallHeight && brickLength && brickHeight) {
            const wallArea = wallLength * wallHeight; // in m²
            const effectiveBrickLength = (brickLength / 1000) + jointSize; // convert mm to meters + joints
            const effectiveBrickHeight = (brickHeight / 1000) + jointSize;

            const effectiveBrickArea = effectiveBrickLength * effectiveBrickHeight; // in m²

            if (effectiveBrickArea > 0) {
                totalBricks = Math.ceil(wallArea / effectiveBrickArea);
            } else {
                totalBricks = 0;
            }
            row.querySelector('.total-bricks').value = totalBricks;
        }

        // Calculate brick cost
        const brickCost = costPerBrick * totalBricks;
        row.querySelector('.brick-cost').value = brickCost.toFixed(2);

        // Calculate total mortar volume
        const totalMortarVolume = plasteringMortarVolume + jointMortarVolume;
        row.querySelector('.mortar-volume').value = totalMortarVolume.toFixed(2);

        // Calculate total mortar cost
        const totalMortarCost = totalMortarVolume * mortarCostPerCubicMeter;
        row.querySelector('.total-mortar-cost').value = totalMortarCost.toFixed(2);

        // Total cost = brick cost + mortar cost
        const totalCost = brickCost + totalMortarCost;
        return totalCost;
    }

    function calculateTotalWallingCost() {
        let totalWallingCost = 0;
        document.querySelectorAll('.wall-row').forEach(row => {
            totalWallingCost += calculateRowCost(row);
        });
        totalWallingCostInput.value = totalWallingCost.toFixed(2);
    }

    function setupRowEventListeners(row) {
        row.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalWallingCost);
        });
    }

    function addWallRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('wall-row');
        newRow.innerHTML = `
            <td><input type="text" class="wall-name" placeholder="Wall no."></td>
            <td><input type="number" class="cost-per-brick" placeholder="Cost per Brick"></td>

            <td>
                <input type="number" class="wall-length" placeholder="Length (m)" step="0.01"><br>
                <input type="number" class="wall-height" placeholder="Height (m)" step="0.01">
            </td>

            <td>
                <input type="number" class="brick-length" placeholder="Brick Length (mm)" step="1"><br>
                <input type="number" class="brick-height" placeholder="Brick Height (mm)" step="1">
            </td>

            <td><input type="number" class="total-bricks" placeholder="Total Bricks" readonly></td>
            <td><input type="number" class="brick-cost" placeholder="Brick Cost" readonly></td>
            <td><input type="number" class="plastering-mortar-volume" placeholder="Plastering Mortar Volume"></td>
            <td><input type="number" class="joint-mortar-volume" placeholder="Joint Mortar Volume"></td>
            <td><input type="number" class="mortar-volume" placeholder="Mortar Volume" readonly></td>
            <td><input type="number" class="mortar-cost-per-cubic-meter" placeholder="Mortar Cost per cubic meter"></td>
            <td><input type="number" class="total-mortar-cost" placeholder="Total Mortar Cost" readonly></td>
        `;

        wallTable.appendChild(newRow);

        setupRowEventListeners(newRow);
        console.log("New wall row added successfully!");
    }

    function deleteLastWallRow() {
        const rows = document.querySelectorAll('.wall-row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalWallingCost();
            console.log("Last wall row deleted.");
        } else {
            alert("At least one row must remain.");
        }
    }

    // Setup initial event listeners for already existing rows
    document.querySelectorAll('.wall-row').forEach(setupRowEventListeners);

    // Attach button events
    document.getElementById('addWallRowButton').addEventListener('click', addWallRow);
    document.getElementById('deleteWallRowButton').addEventListener('click', deleteLastWallRow);

    // Initial total calculation
    calculateTotalWallingCost();
});


document.addEventListener('DOMContentLoaded', function() {
    console.log("Doors and Windows Script Loaded");

    const doorWindowTable = document.getElementById('doorWindowTable').querySelector('tbody');
    const totalDoorWindowCostInput = document.getElementById('totalDoorWindowCost');

    function calculateRowCost(row) {
        const numWindows = parseFloat(row.querySelector('.num-windows')?.value) || 0;
        const costWindowType = parseFloat(row.querySelector('.cost-window-type')?.value) || 0;
        const numDoors = parseFloat(row.querySelector('.num-doors')?.value) || 0;
        const costDoorType = parseFloat(row.querySelector('.cost-door-type')?.value) || 0;

        // Calculate total cost for windows and doors
        const totalCostWindows = numWindows * costWindowType;
        const totalCostDoors = numDoors * costDoorType;

        // Update total cost fields
        row.querySelector('.total-cost-windows').value = totalCostWindows.toFixed(2);
        row.querySelector('.total-cost-doors').value = totalCostDoors.toFixed(2);

        return totalCostWindows + totalCostDoors;
    }

    function calculateTotalDoorWindowCost() {
        let totalCost = 0;
        document.querySelectorAll('.door-window-row').forEach(row => {
            totalCost += calculateRowCost(row);
        });

        totalDoorWindowCostInput.value = totalCost.toFixed(2);
        
    }

    function addDoorWindowRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('door-window-row');
        newRow.innerHTML = `
            <td><input type="number" class="num-windows" placeholder="Number of Windows"></td>
            <td><input type="text" class="window-type" placeholder="Type of Window"></td>
            <td><input type="number" class="cost-window-type" placeholder="Cost of Window Type"></td>
            <td><input type="number" class="total-cost-windows" placeholder="Total Cost of Windows" readonly></td>
            <td><input type="number" class="num-doors" placeholder="Number of Doors"></td>
            <td><input type="text" class="door-type" placeholder="Type of Door"></td>
            <td><input type="number" class="cost-door-type" placeholder="Cost of Door Type"></td>
            <td><input type="number" class="total-cost-doors" placeholder="Total Cost of Doors" readonly></td>
        `;

        doorWindowTable.appendChild(newRow);

        // Attach event listeners to new row inputs for real-time calculations
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', calculateTotalDoorWindowCost);
        });

        console.log("New door/window row added!");
    }

    function deleteLastDoorWindowRow() {
        const rows = document.querySelectorAll('.door-window-row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalDoorWindowCost();
            console.log("Last door/window row deleted.");
        } else {
            alert("At least one row must remain.");
        }
        function saveDoorWindowData() {
            const data = [];
            document.querySelectorAll('.door-window-row').forEach(row => {
                data.push({
                    numWindows: row.querySelector('.num-windows').value,
                    windowType: row.querySelector('.window-type').value,
                    costWindowType: row.querySelector('.cost-window-type').value,
                    totalCostWindows: row.querySelector('.total-cost-windows').value,
                    numDoors: row.querySelector('.num-doors').value,
                    doorType: row.querySelector('.door-type').value,
                    costDoorType: row.querySelector('.cost-door-type').value,
                    totalCostDoors: row.querySelector('.total-cost-doors').value
                });
            });
        
            const totalCost = document.getElementById('totalDoorWindowCost').value;
        
            localStorage.setItem('doorWindowData', JSON.stringify(data));
            localStorage.setItem('totalDoorWindowCost', totalCost);
        }
        function loadDoorWindowData() {
            const data = JSON.parse(localStorage.getItem('doorWindowData') || '[]');
            const totalCost = localStorage.getItem('totalDoorWindowCost') || '0';
        
            doorWindowTable.innerHTML = ''; // Clear existing rows
        
            data.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.classList.add('door-window-row');
                newRow.innerHTML = `
                    <td><input type="number" class="num-windows" value="${item.numWindows}"></td>
                    <td><input type="text" class="window-type" value="${item.windowType}"></td>
                    <td><input type="number" class="cost-window-type" value="${item.costWindowType}"></td>
                    <td><input type="number" class="total-cost-windows" value="${item.totalCostWindows}" readonly></td>
                    <td><input type="number" class="num-doors" value="${item.numDoors}"></td>
                    <td><input type="text" class="door-type" value="${item.doorType}"></td>
                    <td><input type="number" class="cost-door-type" value="${item.costDoorType}"></td>
                    <td><input type="number" class="total-cost-doors" value="${item.totalCostDoors}" readonly></td>
                `;
        
                doorWindowTable.appendChild(newRow);
        
                newRow.querySelectorAll('input').forEach(input => {
                    input.addEventListener('input', () => {
                        calculateTotalDoorWindowCost();
                        saveDoorWindowData(); // Save on every change
                    });
                });
            });
        
            totalDoorWindowCostInput.value = parseFloat(totalCost).toFixed(2);
        }
                
    }

    // Attach event listeners to existing rows
    document.querySelectorAll('.door-window-row input').forEach(input => {
        input.addEventListener('input', calculateTotalDoorWindowCost);
    });

    // Ensure buttons work properly
    document.getElementById('addDoorWindowRowButton').addEventListener('click', addDoorWindowRow);
    document.getElementById('deleteDoorWindowRowButton').addEventListener('click', deleteLastDoorWindowRow);

    // Initial calculation in case values are pre-filled
    calculateTotalDoorWindowCost();
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("Foundation Cost Script Loaded");

    const foundationTable = document.getElementById('foundationTable').querySelector('tbody');
    const totalFoundationCostInput = document.getElementById('totalFoundationCost');

    // Calculate cost for one foundation row
    function calculateRowCost(row) {
        const volume = parseFloat(row.querySelector('.volume')?.value) || 0;
        const concreteCost = parseFloat(row.querySelector('.concrete-cost')?.value) || 0;
        const totalBarsLength = parseFloat(row.querySelector('.total-bars-length')?.value) || 0;
        const reinforcementWeight = parseFloat(row.querySelector('.reinforcement-weight')?.value) || 0;
        const totalBarCost = parseFloat(row.querySelector('.total-bar-cost')?.value) || 0;
        const brickCostPerPiece = parseFloat(row.querySelector('.brick-cost-per-piece')?.value) || 0;
        const totalBricks = parseFloat(row.querySelector('.total-bricks')?.value) || 0;
        const mortarVolume = parseFloat(row.querySelector('.mortar-volume')?.value) || 0;
        const mortarCost = parseFloat(row.querySelector('.mortar-cost')?.value) || 0;

        // Compute individual component costs
        const concreteTotal = volume * concreteCost;
        const reinforcementTotal = totalBarCost; // Assuming total bar cost already computed
        const bricksTotal = totalBricks * brickCostPerPiece;
        const mortarTotal = mortarVolume * mortarCost;

        // Total cost for this foundation row
        return concreteTotal + reinforcementTotal + bricksTotal + mortarTotal;
    }

    // Sum the cost of all foundation rows and update the total display
    function calculateTotalFoundationCost() {
        let totalFoundationCost = 0;
        document.querySelectorAll('.foundation-row').forEach(row => {
            totalFoundationCost += calculateRowCost(row);
        });
        console.log("Total Foundation Cost:", totalFoundationCost.toFixed(2));
        totalFoundationCostInput.value = totalFoundationCost.toFixed(2);
    }

    // Add a new foundation row with full input fields and attach event listeners
    function addFoundationRow() {
        const newRow = document.createElement('tr');
        newRow.classList.add('foundation-row');
        newRow.innerHTML = `
            <td>
                <select class="foundation-type">
                    <option value="pad">Pad Foundation</option>
                    <option value="strip">Strip Foundation</option>
                </select>
            </td>
            <td><input type="number" class="footing-thickness" placeholder="Enter thickness"></td>
            <td><input type="number" class="volume" placeholder="Enter volume"></td>
            <td><input type="number" class="concrete-cost" placeholder="Enter cost"></td>
            <td><input type="number" class="footing-bars-diameter" placeholder="Enter diameter"></td>
            <td><input type="number" class="bottom-bars-length" placeholder="Enter bottom bars length"></td>
            <td><input type="number" class="top-bars-length" placeholder="Enter top bars length"></td>
            <td><input type="number" class="total-bars-length" placeholder="Enter total bars length"></td>
            <td><input type="number" class="reinforcement-weight" placeholder="Enter weight"></td>
            <td><input type="number" class="total-bar-cost" placeholder="Enter total bar cost"></td>
            <td><input type="number" class="wall-length" placeholder="Enter wall length"></td>
            <td><input type="number" class="width" placeholder="Enter width"></td>
            <td><input type="number" class="height" placeholder="Enter height"></td>
            <td><input type="number" class="brick-cost-per-piece" placeholder="Enter cost per brick"></td>
            <td><input type="number" class="total-bricks" placeholder="Enter total bricks"></td>
            <td><input type="number" class="brick-cost" placeholder="Enter brick cost"></td>
            <td><input type="number" class="mortar-volume" placeholder="Enter mortar volume"></td>
            <td><input type="number" class="mortar-cost" placeholder="Enter mortar cost"></td>
        `;
        foundationTable.appendChild(newRow);

        // Attach input event listeners to the new row to recalc total cost when any value changes
        newRow.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', calculateTotalFoundationCost);
        });

        console.log("New foundation row added!");
    }

    function deleteLastFoundationRow() {
        const rows = document.querySelectorAll('.foundation-row');
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
            calculateTotalFoundationCost();
            console.log("Last foundation row deleted.");
        } else {
            alert("At least one row must remain.");
        }
    }

    // Clear all inputs in the foundation table (reset all rows)
    function clearAllFoundationRows() {
        document.querySelectorAll('.foundation-row').forEach(row => {
            row.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            // Optionally reset select elements if needed
            const select = row.querySelector('select.foundation-type');
            if (select) {
                select.selectedIndex = 0;
            }
        });
        totalFoundationCostInput.value = '';
        console.log("All foundation inputs cleared.");
    }

    // Attach event listeners to the initial row's inputs/selects
    document.querySelectorAll('.foundation-row input, .foundation-row select').forEach(input => {
        input.addEventListener('input', calculateTotalFoundationCost);
    });

    // Button event listeners
    document.getElementById('addFoundationRowButton').addEventListener('click', addFoundationRow);
    document.getElementById('deleteFoundationRowButton').addEventListener('click', deleteLastFoundationRow);
    document.getElementById('clearFoundationTableButton').addEventListener('click', clearAllFoundationRows);

    // Initial calculation in case any values are pre-filled
    calculateTotalFoundationCost();
});


document.addEventListener("DOMContentLoaded", function () {
    function calculateExcavationCost() {
        let totalExcavationCost = 0;

        document.querySelectorAll(".excavation-row").forEach(row => {
            let length = parseFloat(row.cells[1]?.querySelector("input")?.value) || 0;
            let width = parseFloat(row.cells[2]?.querySelector("input")?.value) || 0;
            let depth = parseFloat(row.cells[3]?.querySelector("input")?.value) || 0;
            let costPerCubicMeter = parseFloat(row.cells[5]?.querySelector("input")?.value) || 0;
            let volumeField = row.cells[4]?.querySelector("input");

            let volume = (length * width * depth) / 1_000_000; // Convert mm³ to m³
            if (volumeField) {
                volumeField.value = volume.toFixed(2); // Display volume in the row
            }

            let rowCost = volume * costPerCubicMeter;
            totalExcavationCost += rowCost;
        });

        document.getElementById("totalExcavationCost").value = totalExcavationCost.toFixed(2);
    }

    function addRow() {
        let table = document.getElementById("excavationTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("excavation-row");

        newRow.innerHTML = `
            <td>
                <select title="Excavation Type">
                    <option value="Strip">Strip</option>
                    <option value="Pad">Pad</option>
                </select>
            </td>
            <td><input type="number" placeholder="Enter length"></td>
            <td><input type="number" placeholder="Enter width"></td>
            <td><input type="number" placeholder="Enter depth"></td>
            <td><input type="text" placeholder="Volume" readonly></td>
            <td><input type="number" placeholder="Enter cost per m³"></td>
            <td><button onclick="deleteRow(this)">Delete</button></td>
        `;

        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateExcavationCost);
        });
    }

    function deleteRow(button) {
        let row = button.closest("tr");
        row.remove();
        calculateExcavationCost();
    }

    document.querySelectorAll(".excavation-row input").forEach(input => {
        input.addEventListener("input", calculateExcavationCost);
    });

    window.addRow = addRow;
    window.deleteRow = deleteRow;
});


document.addEventListener('DOMContentLoaded', function () {
    // Function to calculate roofing cost and update computed fields
    function calculateRoofingCost() {
        const houseLength = parseFloat(document.getElementById('houseLength').value) || 0;
        const houseWidth = parseFloat(document.getElementById('houseWidth').value) || 0;
        const crosstieLength = parseFloat(document.getElementById('crosstieLength').value) || 0;
        const kingpostHeight = parseFloat(document.getElementById('kingpostHeight').value) || 0;
        const trussCostPerMeter = parseFloat(document.getElementById('trussCostPerMeter').value) || 0;
        const totalTrussLength = parseFloat(document.getElementById('totalTrussLength').value) || 0;
        const purlinSpacing = parseFloat(document.getElementById('purlinSpacing').value) || 0;
        const purlinCostPerMeter = parseFloat(document.getElementById('purlinCostPerMeter').value) || 0;
        const roofingAreaRight = parseFloat(document.getElementById('roofingAreaRight').value) || 0;
        const roofingAreaLeft = parseFloat(document.getElementById('roofingAreaLeft').value) || 0;
        const roofingCostPerPiece = parseFloat(document.getElementById('roofingCostPerPiece').value) || 0;
        const totalMaterial = parseFloat(document.getElementById('totalMaterial').value) || 0;

        // Calculate total truss material cost
        const totalTrussCost = totalTrussLength * trussCostPerMeter;
        document.getElementById('totalTrussCost').value = totalTrussCost.toFixed(2);

        // Calculate total purlin cost (as an example, using houseLength/purlinSpacing * houseWidth)
        const purlinCost = ((houseLength / purlinSpacing) * houseWidth) * purlinCostPerMeter;
        document.getElementById('purlinCost').value = purlinCost.toFixed(2);

        // Calculate total roofing material cost
        const roofingMaterialCost = totalMaterial * roofingCostPerPiece;
        document.getElementById('roofingMaterialCost').value = roofingMaterialCost.toFixed(2);

        // Calculate total roofing cost
            // Calculate total roofing cost
          const totalRoofingCost = totalTrussCost + purlinCost + roofingMaterialCost;
          document.getElementById('totalRoofingCost').value = totalRoofingCost.toFixed(2);

        // Save the total roofing cost into localStorage
         localStorage.setItem("totalRoofingcost", totalRoofingCost.toFixed(2));

        // Calculate total roof area (sum of right and left)
        const totalRoofArea = roofingAreaRight + roofingAreaLeft;
        document.getElementById('roofArea').value = totalRoofArea.toFixed(2);

        console.log(`Total Truss Cost: ${totalTrussCost}, Purlin Cost: ${purlinCost}, Roofing Material Cost: ${roofingMaterialCost}, Total Roofing Cost: ${totalRoofingCost}, Total Roof Area: ${totalRoofArea}`);
    }

    // Function to save roofing data to localStorage
    function saveRoofingData() {
        const roofingData = {
            houseLength: document.getElementById('houseLength').value,
            houseWidth: document.getElementById('houseWidth').value,
            crosstieLength: document.getElementById('crosstieLength').value,
            kingpostHeight: document.getElementById('kingpostHeight').value,
            trussCostPerMeter: document.getElementById('trussCostPerMeter').value,
            totalTrussLength: document.getElementById('totalTrussLength').value,
            totalTrussCost: document.getElementById('totalTrussCost').value,
            purlinSpacing: document.getElementById('purlinSpacing').value,
            purlinCostPerMeter: document.getElementById('purlinCostPerMeter').value,
            purlinCost: document.getElementById('purlinCost').value,
            roofingAreaRight: document.getElementById('roofingAreaRight').value,
            roofingAreaLeft: document.getElementById('roofingAreaLeft').value,
            roofingCostPerPiece: document.getElementById('roofingCostPerPiece').value,
            totalMaterial: document.getElementById('totalMaterial').value,
            roofingMaterialCost: document.getElementById('roofingMaterialCost').value,
            roofArea: document.getElementById('roofArea').value,
            totalRoofingCost: document.getElementById('totalRoofingCost').value,
            roofShape: document.getElementById('roofShape').value,
            roofMaterial: document.getElementById('roofMaterial').value
        };

        localStorage.setItem('roofingData', JSON.stringify(roofingData));
        console.log("Roofing data saved.");
    }

    // Function to load roofing data from localStorage
    function loadRoofingData() {
        const savedData = localStorage.getItem('roofingData');
        if (!savedData) return;
        const roofingData = JSON.parse(savedData);

        document.getElementById('houseLength').value = roofingData.houseLength || '';
        document.getElementById('houseWidth').value = roofingData.houseWidth || '';
        document.getElementById('crosstieLength').value = roofingData.crosstieLength || '';
        document.getElementById('kingpostHeight').value = roofingData.kingpostHeight || '';
        document.getElementById('trussCostPerMeter').value = roofingData.trussCostPerMeter || '';
        document.getElementById('totalTrussLength').value = roofingData.totalTrussLength || '';
        document.getElementById('totalTrussCost').value = roofingData.totalTrussCost || '';
        document.getElementById('purlinSpacing').value = roofingData.purlinSpacing || '';
        document.getElementById('purlinCostPerMeter').value = roofingData.purlinCostPerMeter || '';
        document.getElementById('purlinCost').value = roofingData.purlinCost || '';
        document.getElementById('roofingAreaRight').value = roofingData.roofingAreaRight || '';
        document.getElementById('roofingAreaLeft').value = roofingData.roofingAreaLeft || '';
        document.getElementById('roofingCostPerPiece').value = roofingData.roofingCostPerPiece || '';
        document.getElementById('totalMaterial').value = roofingData.totalMaterial || '';
        document.getElementById('roofingMaterialCost').value = roofingData.roofingMaterialCost || '';
        document.getElementById('roofArea').value = roofingData.roofArea || '';
        document.getElementById('totalRoofingCost').value = roofingData.totalRoofingCost || '';
        document.getElementById('roofShape').value = roofingData.roofShape || 'pyramid';
        document.getElementById('roofMaterial').value = roofingData.roofMaterial || 'asphaltShingles';

        // Recalculate in case some computed fields need updating
        calculateRoofingCost();
        console.log("Roofing data loaded.");
    }

    // Attach event listeners to all roofing inputs and selects to calculate cost and save data
    document.querySelectorAll('#houseLength, #houseWidth, #crosstieLength, #kingpostHeight, #trussCostPerMeter, #totalTrussLength, #purlinSpacing, #purlinCostPerMeter, #roofingAreaRight, #roofingAreaLeft, #roofingCostPerPiece, #totalMaterial').forEach(element => {
        element.addEventListener('input', function () {
            calculateRoofingCost();
            saveRoofingData();
        });
    });

    // Also attach listeners to the roof details selects
    document.getElementById('roofShape').addEventListener('change', function () {
        saveRoofingData();
    });
    document.getElementById('roofMaterial').addEventListener('change', function () {
        saveRoofingData();
    });

    // Load saved roofing data on page load
    loadRoofingData();

    // Initial calculation in case some fields are pre-filled
    calculateRoofingCost();
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Flooring Cost Script Loaded");

    const totalFlooringCostInput = document.getElementById("totalFlooringCost");

    function calculateTotalFlooringCost() {
        let totalFlooringCost = 0;

        document.querySelectorAll("#flooringTable tbody tr").forEach(row => {
            const values = row.querySelectorAll("input");
            if (values.length < 13) {
                console.error("Error: Incorrect number of input fields in a row");
                return;
            }

            const hardcoreVolume = parseFloat(values[1].value) || 0;
            const hardcoreCost = parseFloat(values[2].value) || 0;
            const marramVolume = parseFloat(values[3].value) || 0;
            const marramCost = parseFloat(values[4].value) || 0;
            const dpcAmount = parseFloat(values[5].value) || 0;
            const dpcCost = parseFloat(values[6].value) || 0;
            const brcMeshAmount = parseFloat(values[7].value) || 0;
            const brcMeshCost = parseFloat(values[8].value) || 0;
            const concreteVolume = parseFloat(values[9].value) || 0;
            const concreteCost = parseFloat(values[10].value) || 0;
            const screedMortarVolume = parseFloat(values[11].value) || 0;
            const mortarCost = parseFloat(values[12].value) || 0;

            const rowTotal = (hardcoreVolume * hardcoreCost) + (marramVolume * marramCost) +
                (dpcAmount * dpcCost) + (brcMeshAmount * brcMeshCost) +
                (concreteVolume * concreteCost) + (screedMortarVolume * mortarCost);

            totalFlooringCost += rowTotal;
        });

        totalFlooringCostInput.value = totalFlooringCost.toFixed(2);
        // Save input values to localStorage
let flooringData = [];

document.querySelectorAll("#flooringTable tbody tr").forEach(row => {
    let rowData = [];
    row.querySelectorAll("input").forEach(input => {
        rowData.push(input.value);
    });
    flooringData.push(rowData);
});

localStorage.setItem("flooringInputs", JSON.stringify(flooringData));
localStorage.setItem("flooringTotal", totalFlooringCost.toFixed(2));

    }

    function addFlooringRow() {
        let table = document.getElementById("flooringTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("flooring-row");

        newRow.innerHTML = `
            <td><input type="number" placeholder="Number"></td>
            <td><input type="number" placeholder="Hardcore Volume"></td>
            <td><input type="number" placeholder="Hardcore Cost"></td>
            <td><input type="number" placeholder="Marram Volume"></td>
            <td><input type="number" placeholder="Marram Cost"></td>
            <td><input type="number" placeholder="DPC Amount"></td>
            <td><input type="number" placeholder="DPC Cost"></td>
            <td><input type="number" placeholder="BRC Mesh Amount"></td>
            <td><input type="number" placeholder="BRC Mesh Cost"></td>
            <td><input type="number" placeholder="Concrete Volume"></td>
            <td><input type="number" placeholder="Concrete Cost"></td>
            <td><input type="number" placeholder="Screed Mortar Volume"></td>
            <td><input type="number" placeholder="Mortar Cost"></td>
        `;

        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateTotalFlooringCost);
        });
    }

    function deleteLastFlooringRow() {
        let table = document.getElementById("flooringTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateTotalFlooringCost();
        }
    }

    document.querySelectorAll("#flooringTable tbody input").forEach(input => {
        input.addEventListener("input", calculateTotalFlooringCost);
    });
    function loadFlooringInputs() {
        const savedData = localStorage.getItem("flooringInputs");
        const savedTotal = localStorage.getItem("flooringTotal");
    
        if (savedData) {
            const flooringData = JSON.parse(savedData);
            const tableBody = document.querySelector("#flooringTable tbody");
            tableBody.innerHTML = ""; // Clear existing rows
    
            flooringData.forEach(rowData => {
                let newRow = tableBody.insertRow();
                newRow.classList.add("flooring-row");
    
                rowData.forEach((value, i) => {
                    const td = newRow.insertCell();
                    const input = document.createElement("input");
                    input.type = "number";
                    input.placeholder = ""; // You can customize placeholder here if you like
                    input.value = value;
                    input.addEventListener("input", calculateTotalFlooringCost);
                    td.appendChild(input);
                });
            });
        }
    
        if (savedTotal) {
            document.getElementById("totalFlooringCost").value = savedTotal;
        }
    }
    loadFlooringInputs();
    window.addFlooringRow = addFlooringRow;
    window.deleteLastFlooringRow = deleteLastFlooringRow;
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Ceiling Cost Script Loaded");

    const totalCeilingCostInput = document.getElementById("totalCeilingCost");

    function calculateCeilingCost() {
        let totalCeilingCost = 0;

        document.querySelectorAll("#ceilingTable tbody tr").forEach(row => {
            const values = row.querySelectorAll("input");
            if (values.length < 12) {
                console.error("Error: Incorrect number of input fields in a row");
                return;
            }

            // Extract dimensions and quantities
            const length = parseFloat(values[1].value) || 0; // mm
            const width = parseFloat(values[2].value) || 0;  // mm

            const mainRunners = parseFloat(values[3].value) || 0;
            const runnerCostUnit = parseFloat(values[4].value) || 0;

            const crossTees = parseFloat(values[5].value) || 0;
            const crossTeeCostUnit = parseFloat(values[6].value) || 0;

            const wallAngles = parseFloat(values[7].value) || 0;
            const angleCostUnit = parseFloat(values[8].value) || 0;

            const hangerWires = parseFloat(values[9].value) || 0;
            const hangerWireCost = parseFloat(values[10].value) || 0;

            // Regenerated costs (quantity × unit cost)
            const runnerCost = mainRunners * runnerCostUnit;
            const crossTeeCost = crossTees * crossTeeCostUnit;
            const angleCost = wallAngles * angleCostUnit;
            const suspensionCost = hangerWires * hangerWireCost;

            // Update Total Suspension Cost Cell (index 11)
            values[11].value = (runnerCost + crossTeeCost + angleCost + suspensionCost).toFixed(2);

            // Total room ceiling cost
            totalCeilingCost += runnerCost + crossTeeCost + angleCost + suspensionCost;
        });

     // Additional materials (new simplified logic)
document.querySelectorAll("#ceilingMaterialTable tbody tr").forEach(row => {
    const inputs = row.querySelectorAll("input");
    if (inputs.length < 2) return;

    const units = parseFloat(inputs[0].value) || 0;
    const unitCost = parseFloat(inputs[1].value) || 0;

    const materialCost = units * unitCost;
    totalCeilingCost += materialCost;
});


        totalCeilingCostInput.value = totalCeilingCost.toFixed(2);

        // Save ceiling data
        let ceilingData = [];
        document.querySelectorAll("#ceilingTable tbody tr").forEach(row => {
            let rowData = [];
            row.querySelectorAll("input").forEach(input => {
                rowData.push(input.value);
            });
            ceilingData.push(rowData);
        });
        localStorage.setItem("ceilingInputs", JSON.stringify(ceilingData));

        let ceilingMaterialData = [];
        document.querySelectorAll("#ceilingMaterialTable tbody tr").forEach(row => {
            let select = row.querySelector("select");
            let inputs = row.querySelectorAll("input");
            let rowData = [select.value];
        
            inputs.forEach(input => rowData.push(input.value));
            ceilingMaterialData.push(rowData);
        });
        localStorage.setItem("ceilingMaterialInputs", JSON.stringify(ceilingMaterialData));
        
localStorage.setItem("ceilingMaterialInputs", JSON.stringify(ceilingMaterialData));

           
    }

    function addCeilingRow() {
        let table = document.getElementById("ceilingTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("ceiling-row");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Room"></td>
            <td><input type="number" placeholder="Room Length"></td>
            <td><input type="number" placeholder="Room Width"></td>
            <td><input type="number" placeholder="Main Runners"></td>
            <td><input type="number" placeholder="Runner Cost"></td>
            <td><input type="number" placeholder="Cross Tees"></td>
            <td><input type="number" placeholder="Cross Tee Cost"></td>
            <td><input type="number" placeholder="Wall Angles"></td>
            <td><input type="number" placeholder="Angle Cost"></td>
            <td><input type="number" placeholder="Hanger Wires"></td>
            <td><input type="number" placeholder="Hanger Wire Cost"></td>
            <td><input type="number" placeholder="Total Suspension System Cost"></td>
        `;

        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateCeilingCost);
        });
    }

    function deleteLastCeilingRow() {
        let table = document.getElementById("ceilingTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateCeilingCost();
        }
    }

    document.querySelectorAll("#ceilingTable tbody input, #ceilingMaterialTable tbody input").forEach(input => {
        input.addEventListener("input", calculateCeilingCost);
    });

    function loadCeilingInputs() {
        const ceilingData = JSON.parse(localStorage.getItem("ceilingInputs"));
        const ceilingMaterialData = JSON.parse(localStorage.getItem("ceilingMaterialInputs"));
        const savedTotal = localStorage.getItem("ceilingTotal");

        // Load ceiling rows
        if (ceilingData && Array.isArray(ceilingData)) {
            const tableBody = document.querySelector("#ceilingTable tbody");
            tableBody.innerHTML = "";

            ceilingData.forEach(rowData => {
                let newRow = tableBody.insertRow();
                newRow.classList.add("ceiling-row");

                rowData.forEach(value => {
                    const td = newRow.insertCell();
                    const input = document.createElement("input");
                    input.type = isNaN(value) ? "text" : "number";
                    input.placeholder = "";
                    input.value = value;
                    input.addEventListener("input", calculateCeilingCost);
                    td.appendChild(input);
                });
            });
        }

       // Load ceiling material rows
if (ceilingMaterialData && Array.isArray(ceilingMaterialData)) {
    const matBody = document.querySelector("#ceilingMaterialTable tbody");
    matBody.innerHTML = "";

    ceilingMaterialData.forEach(rowData => {
        let newRow = matBody.insertRow();

        rowData.forEach((value, index) => {
            const td = newRow.insertCell();

            if (index === 0) {
                // First cell: create <select> for ceiling material
                const select = document.createElement("select");
                select.title = "Select Ceiling Material";
                select.innerHTML = `
                    <option value="gypsum">Gypsum Ceilings</option>
                    <option value="plaster">Plaster Ceiling</option>
                    <option value="fiber">Fiber Ceiling</option>
                    <option value="wooden">Wooden Ceiling</option>
                    <option value="glass">Glass Ceiling</option>
                    <option value="metal">Metal Ceiling</option>
                    <option value="synthetic">Synthetic Leather or Cloth Ceiling</option>
                `;
                select.value = value;
                td.appendChild(select);
            } else {
                // Other cells: create <input>
                const input = document.createElement("input");
                input.type = "number";

                if (index === 1) {
                    input.placeholder = "Ceiling Units";
                    input.value = value;
                    input.addEventListener("input", calculateCeilingCost);
                } else if (index === 2) {
                    input.placeholder = "Unit Cost";
                    input.value = value;
                    input.addEventListener("input", calculateCeilingCost);
                } else if (index === 3) {
                    input.placeholder = "Material Cost";
                    input.value = value;
                    input.readOnly = true;
                }

                td.appendChild(input);
            }
        });
    });

    // Recalculate after loading
    calculateCeilingCost();
}


        // Load total cost
        if (savedTotal) {
            document.getElementById("totalCeilingCost").value = savedTotal;
        }
    }

    window.addCeilingRow = addCeilingRow;
    window.deleteLastCeilingRow = deleteLastCeilingRow;

    loadCeilingInputs();
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Equipment Cost Script Loaded");
    loadEquipmentData();

    function calculateEquipmentCost() {
        let totalEquipmentCost = 0;

        document.querySelectorAll("#equipmentTable tbody tr").forEach(row => {
            const inputs = row.querySelectorAll("input");
            if (inputs.length < 4) return;

            const hourlyRate = parseFloat(inputs[1].value) || 0;
            const operationHours = parseFloat(inputs[2].value) || 0;
            const totalCostField = inputs[3];

            const totalCost = hourlyRate * operationHours;
            totalCostField.value = totalCost.toFixed(2);

            totalEquipmentCost += totalCost;
            saveEquipmentData();

        });

        document.getElementById("totalEquipmentCost").value = totalEquipmentCost.toFixed(2);
    }

    function addEquipmentRow() {
        let table = document.getElementById("equipmentTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("equipment-row");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Equipment"></td>
            <td><input type="number" placeholder="Hourly Rate"></td>
            <td><input type="number" placeholder="Operation Hours"></td>
            <td><input type="number" placeholder="Total Cost" readonly></td>
        `;

        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateEquipmentCost);
        });
    }

    function deleteLastEquipmentRow() {
        let table = document.getElementById("equipmentTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateEquipmentCost();
        }
    }

    document.querySelectorAll("#equipmentTable tbody input").forEach(input => {
        input.addEventListener("input", calculateEquipmentCost);
    });

    window.addEquipmentRow = addEquipmentRow;
    window.deleteLastEquipmentRow = deleteLastEquipmentRow;
    function saveEquipmentData() {
        const rows = document.querySelectorAll("#equipmentTable tbody tr");
        rows.forEach((row, index) => {
            const inputs = row.querySelectorAll("input");
            if (inputs.length < 4) return;
            localStorage.setItem(`equipment_name_${index}`, inputs[0].value);
            localStorage.setItem(`hourly_rate_${index}`, inputs[1].value);
            localStorage.setItem(`operation_hours_${index}`, inputs[2].value);
            localStorage.setItem(`total_cost_${index}`, inputs[3].value);
        });
        localStorage.setItem("equipment_row_count", rows.length);
        localStorage.setItem("total_equipment_cost", document.getElementById("totalEquipmentCost").value);
    }
    
    function loadEquipmentData() {
        const rowCount = parseInt(localStorage.getItem("equipment_row_count") || "0");
        for (let i = 0; i < rowCount; i++) {
            if (i >= document.querySelectorAll("#equipmentTable tbody tr").length) {
                window.addEquipmentRow();
            }
            const inputs = document.querySelectorAll("#equipmentTable tbody tr")[i].querySelectorAll("input");
            inputs[0].value = localStorage.getItem(`equipment_name_${i}`) || "";
            inputs[1].value = localStorage.getItem(`hourly_rate_${i}`) || "";
            inputs[2].value = localStorage.getItem(`operation_hours_${i}`) || "";
            inputs[3].value = localStorage.getItem(`total_cost_${i}`) || "";
        }
        document.getElementById("totalEquipmentCost").value = localStorage.getItem("total_equipment_cost") || "";
    }
    
});


document.addEventListener('DOMContentLoaded', (event) => {
    const optimisticCostInput = document.getElementById('optimisticCost');
    const mostLikelyCostInput = document.getElementById('mostLikelyCost');
    const pessimisticCostInput = document.getElementById('pessimisticCost');
    const estimatedContingencyCostInput = document.getElementById('estimatedContingencyCost');
    const totalContingencyCostInput = document.querySelector('.total-cost input[title="Total Cost"]');

    if (!optimisticCostInput || !mostLikelyCostInput || !pessimisticCostInput || !estimatedContingencyCostInput || !totalContingencyCostInput) {
        console.error('One or more input elements not found');
        return;
    }

    function calculateTotalContingencyCost() {
        const optimisticCost = parseFloat(optimisticCostInput.value) || 0;
        const mostLikelyCost = parseFloat(mostLikelyCostInput.value) || 0;
        const pessimisticCost = parseFloat(pessimisticCostInput.value) || 0;

        // Calculate the estimated contingency cost using the PERT formula
        const estimatedContingencyCost = (optimisticCost + 4 * mostLikelyCost + pessimisticCost) / 6;

        console.log(`Optimistic Cost: ${optimisticCost}, Most Likely Cost: ${mostLikelyCost}, Pessimistic Cost: ${pessimisticCost}`);
        console.log(`Estimated Contingency Cost: ${estimatedContingencyCost}`);

        // Display the estimated contingency cost
        estimatedContingencyCostInput.value = estimatedContingencyCost.toFixed(2);

        // Display the total contingency cost
        totalContingencyCostInput.value = estimatedContingencyCost.toFixed(2);
    }

    optimisticCostInput.addEventListener('input', calculateTotalContingencyCost);
    mostLikelyCostInput.addEventListener('input', calculateTotalContingencyCost);
    pessimisticCostInput.addEventListener('input', calculateTotalContingencyCost);

    // Initial calculation to set the total cost on page load
    calculateTotalContingencyCost();
    // Load saved individual inputs
    loadContingencyCostInputsIndividually();

    // Save inputs individually on input
    [optimisticCostInput, mostLikelyCostInput, pessimisticCostInput].forEach(input => {
        input.addEventListener('input', () => {
            calculateTotalContingencyCost(); // Recalculate on input
            saveContingencyCostInputsIndividually(); // Save after change
        });
    });

    function saveContingencyCostInputsIndividually() {
        const optimisticEl = document.getElementById('optimisticCost');
        const mostLikelyEl = document.getElementById('mostLikelyCost');
        const pessimisticEl = document.getElementById('pessimisticCost');
        const estimatedEl = document.getElementById('estimatedContingencyCost');
    
        if (optimisticEl) localStorage.setItem('optimisticCost', optimisticEl.value || '');
        if (mostLikelyEl) localStorage.setItem('mostLikelyCost', mostLikelyEl.value || '');
        if (pessimisticEl) localStorage.setItem('pessimisticCost', pessimisticEl.value || '');
        if (estimatedEl) localStorage.setItem('estimatedContingencyCost', estimatedEl.value || '');
    }
    
    function loadContingencyCostInputsIndividually() {
        const optimisticEl = document.getElementById('optimisticCost');
        const mostLikelyEl = document.getElementById('mostLikelyCost');
        const pessimisticEl = document.getElementById('pessimisticCost');
        const estimatedEl = document.getElementById('estimatedContingencyCost');
    
        if (optimisticEl) optimisticEl.value = localStorage.getItem('optimisticCost') || '';
        if (mostLikelyEl) mostLikelyEl.value = localStorage.getItem('mostLikelyCost') || '';
        if (pessimisticEl) pessimisticEl.value = localStorage.getItem('pessimisticCost') || '';
        if (estimatedEl) estimatedEl.value = localStorage.getItem('estimatedContingencyCost') || '';
    }
    
    
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Overhead Cost Script Loaded");

    function calculateOverheadCost() {
        let totalOverheadCost = 0;

        document.querySelectorAll(".overhead-cost").forEach(input => {
            totalOverheadCost += parseFloat(input.value) || 0;
        });

        document.getElementById("totalOverheadCost").value = totalOverheadCost.toFixed(2);
    }

    function addOverheadRow() {
        let table = document.getElementById("overheadTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("overhead-row");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Overhead Cost Item"></td>
            <td><input type="number" class="overhead-cost" placeholder="Cost"></td>
        `;

        newRow.querySelector(".overhead-cost").addEventListener("input", calculateOverheadCost);
    }

    function deleteLastOverheadRow() {
        let table = document.getElementById("overheadTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateOverheadCost();
        }
    }

    document.querySelectorAll(".overhead-cost").forEach(input => {
        input.addEventListener("input", calculateOverheadCost);
    });

    window.addOverheadRow = addOverheadRow;
    window.deleteLastOverheadRow = deleteLastOverheadRow;
    loadOverheadCostsIndividually();

    // Save on every input
    document.querySelectorAll(".overhead-cost").forEach(input => {
        input.addEventListener("input", saveOverheadCostsIndividually);
    });

    function saveOverheadCostsIndividually() {
        const costInputs = document.querySelectorAll(".overhead-cost");
        costInputs.forEach((input, index) => {
            localStorage.setItem(`overheadCost_${index}`, input.value || '');
        });
        localStorage.setItem('overheadCostCount', costInputs.length); // Save number of rows
        const totalCost = document.getElementById("totalOverheadCost");
        if (totalCost) {
            localStorage.setItem('totalOverheadCost', totalCost.value || '');
        }
    }
    
    function loadOverheadCostsIndividually() {
        const overheadCostCount = parseInt(localStorage.getItem('overheadCostCount')) || 0;
        const tableBody = document.getElementById("overheadTable").getElementsByTagName("tbody")[0];
    
        // Ensure enough rows
        while (tableBody.rows.length < overheadCostCount) {
            window.addOverheadRow();
        }
    
        for (let i = 0; i < overheadCostCount; i++) {
            const value = localStorage.getItem(`overheadCost_${i}`) || '';
            const input = tableBody.querySelectorAll(".overhead-cost")[i];
            if (input) input.value = value;
        }
    
        const totalCost = localStorage.getItem('totalOverheadCost');
        if (document.getElementById("totalOverheadCost")) {
            document.getElementById("totalOverheadCost").value = totalCost || '';
        }
    }
    
});

document.addEventListener("DOMContentLoaded", function () {
    function calculateTotalConstructionCost() {
        const totalBeamCost = parseFloat(document.getElementById("totalBeamCost").value) || 0;
        const totalColumnCost = parseFloat(document.getElementById("totalColumnCost").value) || 0;
        const totalBaseCost   = parseFloat(document.getElementById("totalColumnBaseCost").value) || 0; 
        const totalWallingCost = parseFloat(document.getElementById("totalWallingCost").value) || 0;
        const totalDoorWindowCost = parseFloat(document.getElementById("totalDoorWindowCost").value) || 0;
        const totalFoundationCost = parseFloat(document.getElementById("totalFoundationCost").value) || 0;
        const totalExcavationCost = parseFloat(document.getElementById("totalExcavationCost").value) || 0;
        const totalRoofingCost = parseFloat(document.getElementById("totalRoofingCost").value) || 0;
        const totalFlooringCost = parseFloat(document.getElementById("totalFlooringCost").value) || 0;
        const totalCeilingCost = parseFloat(document.getElementById("totalCeilingCost").value) || 0;
        const totalEquipmentCost = parseFloat(document.getElementById("totalEquipmentCost").value) || 0;
        const estimatedContingencyCost = parseFloat(document.getElementById("estimatedContingencyCost").value) || 0;
        const totalOverheadCost = parseFloat(document.getElementById("totalOverheadCost").value) || 0;

        const totalConstructionCost = totalBeamCost + totalColumnCost  + totalBaseCost + totalWallingCost + totalDoorWindowCost +
            totalFoundationCost + totalExcavationCost + totalRoofingCost + totalFlooringCost + totalCeilingCost +
            totalEquipmentCost + estimatedContingencyCost + totalOverheadCost;

        document.getElementById("totalConstructionCost").value = totalConstructionCost.toFixed(2);
    }

    document.getElementById("calculateBtn").addEventListener("click", calculateTotalConstructionCost);
});
document.addEventListener("DOMContentLoaded", function () {
    // Get the stored total finishing cost from localStorage
    let savedFinishingCost = localStorage.getItem("totalFinishingCost");

    // Display the value if it exists
    if (savedFinishingCost !== null) {
        document.getElementById("totalFinishingCost").value = savedFinishingCost;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve from localStorage
    let storedTotalCost = localStorage.getItem("TotalBuildingServicesCost");

    // If there's a stored value, display it
    if (storedTotalCost) {
        document.getElementById("totalBuildingServicesCost").value = storedTotalCost;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", function () {
        // Retrieve values from the input fields
        let constructionCost = parseFloat(document.getElementById("totalConstructionCost").value) || 0;
        let finishingCost = parseFloat(document.getElementById("totalFinishingCost").value) || 0;
        let buildingServicesCost = parseFloat(document.getElementById("totalBuildingServicesCost").value) || 0;

        // Calculate total project cost
        let totalProjectCost = constructionCost + finishingCost + buildingServicesCost;

        // Display total project cost in the input field
        document.getElementById("totalProjectCost").value = totalProjectCost;
    });
});
document.addEventListener('DOMContentLoaded', (event) => { 
    // Function to save table data to localStorage along with total costs
    function saveTableData(tableId, totalId) {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tbody tr');
        const tableData = [];

        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll('input, select').forEach(cell => {
                rowData.push(cell.value);
            });
            tableData.push(rowData);
        });

        // Save table data and total cost to localStorage
        localStorage.setItem(tableId, JSON.stringify(tableData));
        const totalCell = document.getElementById(totalId);
        if (totalCell) {
            localStorage.setItem(totalId, totalCell.value); // Save total cost from input field
        }

        saveOverallTotals(); // Save overall construction-related totals
    }

    // Function to load table data and total costs from localStorage
    function loadTableData(tableId, totalId) {
        const table = document.getElementById(tableId);
        const tableData = JSON.parse(localStorage.getItem(tableId));

        if (tableData) {
            const rows = table.querySelectorAll('tbody tr');
            tableData.forEach((rowData, rowIndex) => {
                const row = rows[rowIndex];
                if (row) {
                    row.querySelectorAll('input, select').forEach((cell, cellIndex) => {
                        cell.value = rowData[cellIndex];
                    });
                }
            });
        }

        // Load total cost from localStorage
        const savedTotal = localStorage.getItem(totalId);
        if (savedTotal) {
            const totalCell = document.getElementById(totalId);
            if (totalCell) {
                totalCell.value = savedTotal; // Restore total cost to input
            }
        }
    }

    // Function to save overall categorized totals and total project cost
    function saveOverallTotals() {
        const overallTotals = [ 'totalBuildingServicesCost', 'totalFinishingCost', 'totalProjectCost'];
        overallTotals.forEach(totalId => {
            const totalCell = document.getElementById(totalId);
            if (totalCell) {
                localStorage.setItem(totalId, totalCell.value); // Save overall totals
            }
        });
    }

    // Function to load overall totals on page load
    function loadOverallTotals() {
        const overallTotals = ['totalBuildingServicesCost', 'totalFinishingCost', 'totalProjectCost'];
        overallTotals.forEach(totalId => {
            const savedTotal = localStorage.getItem(totalId);
            if (savedTotal) {
                const totalCell = document.getElementById(totalId);
                if (totalCell) {
                    totalCell.value = savedTotal; // Restore overall totals
                }
            }
        });
    }

    // Table IDs and corresponding total cost input IDs
    const tableData = [
        { tableId: 'beamTable', totalId: 'totalBeamCost' },
        { tableId: 'columnTable', totalId: 'totalColumnCost' },
        { tableId: 'wallTable', totalId: 'totalWallingCost' },
        { tableId: 'doorWindowTable', totalId: 'totalDoorWindowCost' },
        { tableId: 'foundationTable', totalId: 'totalFoundationCost' },
        { tableId: 'excavationTable', totalId: 'totalExcavationCost' },
        { tableId: 'roofingTable', totalId: 'totalRoofingCost' },
        { tableId: 'flooringTable', totalId: 'totalFlooringCost' },
        { tableId: 'ceilingTable', totalId: 'totalCeilingCost' },
        { tableId: 'equipmentTable', totalId: 'totalEquipmentCost' },
        { tableId: 'overheadTable', totalId: 'totalOverheadCost' },
        { tableId: 'contingencyTable', totalId: 'estimatedContingencyCost' }
    ];

    // Load table data and totals on page load
    tableData.forEach(({ tableId, totalId }) => loadTableData(tableId, totalId));
    loadOverallTotals();

    // Add event listeners to save data and totals on input change
    tableData.forEach(({ tableId, totalId }) => {
        const table = document.getElementById(tableId);
        table.addEventListener('input', () => saveTableData(tableId, totalId));
    });
});
