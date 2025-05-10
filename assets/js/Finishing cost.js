// Your floor finish cost script with additional data saving
document.addEventListener("DOMContentLoaded", function () {
    console.log("Floor Finish Cost Script Loaded");

    function calculateFloorFinishCost() {
        let totalFloorFinishCost = 0;
        let materialFloorFinishCost = 0;
        let laborFloorFinishCost = 0;
        
        // Track row data for detailed saving
        let rowData = [];

        document.querySelectorAll(".floor-finish-row").forEach((row, index) => {
            let floorType = row.querySelector("select")?.value || "";
            let quantity = parseFloat(row.querySelector(".floor-finish-quantity")?.value) || 0;
            let unitPrice = parseFloat(row.querySelector(".floor-finish-unit-price")?.value) || 0;
            let laborUnit = parseFloat(row.querySelector(".floor-finish-labor-unit")?.value) || 0;
            let laborCost = parseFloat(row.querySelector(".floor-finish-labor-cost")?.value) || 0;
            let totalCostField = row.querySelector(".floor-finish-total-cost");

            let materialCost = quantity * unitPrice;
            let laborTotal = laborUnit * laborCost;
            let totalCost = materialCost + laborTotal;

            if (totalCostField) {
                totalCostField.value = totalCost.toFixed(2); // Display calculated total cost
            }

            totalFloorFinishCost += totalCost; // Sum all costs
            materialFloorFinishCost += materialCost; // Sum material costs
            laborFloorFinishCost += laborTotal; // Sum labor costs
            
            // Save row data for detailed storage
            rowData.push({
                floorType,
                quantity,
                unitPrice,
                laborUnit,
                laborCost,
                materialCost,
                laborTotal,
                totalCost
            });
        });

        document.getElementById("totalFloorFinishCost").value = totalFloorFinishCost.toFixed(2);

        // Save all relevant data to localStorage
        saveFloorFinishData(totalFloorFinishCost, materialFloorFinishCost, laborFloorFinishCost, rowData);
    }
    
    function saveFloorFinishData(total, material, labor, rowData) {
        // Save individual key-value pairs for direct access
        localStorage.setItem("totalFloorFinishCost", total.toFixed(2));
        localStorage.setItem("materialFloorFinishCost", material.toFixed(2));
        localStorage.setItem("laborFloorFinishCost", labor.toFixed(2));
        
        // Save detailed row data
        localStorage.setItem("floorFinishRowData", JSON.stringify(rowData));
    }

    function loadFloorFinishData() {
        // Try to load saved data
        const totalCost = localStorage.getItem("totalFloorFinishCost");
        const rowData = JSON.parse(localStorage.getItem("floorFinishRowData") || "[]");
        
        if (totalCost) {
            document.getElementById("totalFloorFinishCost").value = totalCost;
        }
        
        // Repopulate rows if we have saved row data
        if (rowData.length > 0) {
            // Clear existing rows, keeping the first row
            const tbody = document.getElementById("floorFinishTable").getElementsByTagName("tbody")[0];
            while (tbody.rows.length > 1) {
                tbody.deleteRow(tbody.rows.length - 1);
            }
            
            // Populate first row with data from first saved row
            if (rowData[0]) {
                populateRow(tbody.rows[0], rowData[0]);
            }
            
            // Add and populate additional rows
            for (let i = 1; i < rowData.length; i++) {
                addFloorFinishRow();
                populateRow(tbody.rows[i], rowData[i]);
            }
        }
    }
    
    function populateRow(row, data) {
        row.querySelector("select").value = data.floorType;
        row.querySelector(".floor-finish-quantity").value = data.quantity;
        row.querySelector(".floor-finish-unit-price").value = data.unitPrice;
        row.querySelector(".floor-finish-labor-unit").value = data.laborUnit;
        row.querySelector(".floor-finish-labor-cost").value = data.laborCost;
        row.querySelector(".floor-finish-total-cost").value = data.totalCost.toFixed(2);
    }

    function addFloorFinishRow() {
        let table = document.getElementById("floorFinishTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("floor-finish-row");

        newRow.innerHTML = `
            <td>
                <select title="Select a flooring type">
                    <option value="hardwood">Hardwood</option>
                    <option value="laminate">Laminate</option>
                    <option value="vinyl">Vinyl</option>
                    <option value="tile">Tile</option>
                    <option value="carpet">Carpet</option>
                </select>
            </td>
            <td><input type="number" class="floor-finish-quantity" placeholder="0" title="Enter quantity"></td>
            <td><input type="number" class="floor-finish-unit-price" placeholder="0" title="Enter unit price"></td>
            <td><input type="number" class="floor-finish-labor-unit" placeholder="0" title="Enter labor units"></td>
            <td><input type="number" class="floor-finish-labor-cost" placeholder="0" title="Enter cost per labor unit"></td>
            <td><input type="text" class="floor-finish-total-cost" readonly title="Calculated total cost"></td>
        `;

        // Attach event listeners for real-time calculation
        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateFloorFinishCost);
        });
        
        newRow.querySelector("select").addEventListener("change", calculateFloorFinishCost);
    }

    function deleteLastFloorFinishRow() {
        let table = document.getElementById("floorFinishTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateFloorFinishCost();
        }
    }

    document.querySelectorAll(".floor-finish-quantity, .floor-finish-unit-price, .floor-finish-labor-unit, .floor-finish-labor-cost").forEach(input => {
        input.addEventListener("input", calculateFloorFinishCost);
    });
    
    document.querySelectorAll("#floorFinishTable select").forEach(select => {
        select.addEventListener("change", calculateFloorFinishCost);
    });

    // Load saved data when page loads
    loadFloorFinishData();

    window.addFloorFinishRow = addFloorFinishRow;
    window.deleteLastFloorFinishRow = deleteLastFloorFinishRow;
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Wall Finish Cost Script Loaded");

    function calculateWallFinishCost() {
        let totalWallFinishCost = 0;
        let materialWallFinishCost = 0;
        let laborWallFinishCost = 0;
        
        // Track row data for detailed saving
        let rowData = [];

        document.querySelectorAll(".wall-finish-row").forEach((row, index) => {
            let wallType = row.querySelector("select")?.value || "";
            let quantity = parseFloat(row.querySelector(".wall-finish-quantity")?.value) || 0;
            let unitPrice = parseFloat(row.querySelector(".wall-finish-unit-price")?.value) || 0;
            let laborUnit = parseFloat(row.querySelector(".wall-finish-labor-unit")?.value) || 0;
            let laborCost = parseFloat(row.querySelector(".wall-finish-labor-cost")?.value) || 0;
            let totalCostField = row.querySelector(".wall-finish-total-cost");

            let materialCost = quantity * unitPrice;
            let laborTotal = laborUnit * laborCost;
            let totalCost = materialCost + laborTotal;

            if (totalCostField) {
                totalCostField.value = totalCost.toFixed(2); // Display calculated total cost
            }

            totalWallFinishCost += totalCost; // Sum all costs
            materialWallFinishCost += materialCost; // Sum material costs
            laborWallFinishCost += laborTotal; // Sum labor costs
            
            // Save row data for detailed storage
            rowData.push({
                wallType,
                quantity,
                unitPrice,
                laborUnit,
                laborCost,
                materialCost,
                laborTotal,
                totalCost
            });
        });

        document.getElementById("totalWallFinishCost").value = totalWallFinishCost.toFixed(2);
        
        // Save all relevant data to localStorage
        saveWallFinishData(totalWallFinishCost, materialWallFinishCost, laborWallFinishCost, rowData);
    }
    
    function saveWallFinishData(total, material, labor, rowData) {
        // Save individual key-value pairs for direct Excel access
        localStorage.setItem("wallFinishTotal", total.toFixed(2));
        localStorage.setItem("materialWallFinishCost", material.toFixed(2));
        localStorage.setItem("laborWallFinishCost", labor.toFixed(2));
        
        // Save detailed row data for restoration
        localStorage.setItem("wallFinishRowData", JSON.stringify(rowData));
    }
    
    function loadWallFinishData() {
        // Try to load saved data
        const totalCost = localStorage.getItem("wallFinishTotal");
        const rowData = JSON.parse(localStorage.getItem("wallFinishRowData") || "[]");
        
        if (totalCost) {
            document.getElementById("totalWallFinishCost").value = totalCost;
        }
        
        // Repopulate rows if we have saved row data
        if (rowData.length > 0) {
            // Clear existing rows, keeping the first row
            const tbody = document.getElementById("wallFinishTable").getElementsByTagName("tbody")[0];
            while (tbody.rows.length > 1) {
                tbody.deleteRow(tbody.rows.length - 1);
            }
            
            // Populate first row with data from first saved row
            if (rowData[0]) {
                populateRow(tbody.rows[0], rowData[0]);
            }
            
            // Add and populate additional rows
            for (let i = 1; i < rowData.length; i++) {
                addWallFinishRow();
                populateRow(tbody.rows[i], rowData[i]);
            }
        }
    }
    
    function populateRow(row, data) {
        row.querySelector("select").value = data.wallType;
        row.querySelector(".wall-finish-quantity").value = data.quantity;
        row.querySelector(".wall-finish-unit-price").value = data.unitPrice;
        row.querySelector(".wall-finish-labor-unit").value = data.laborUnit;
        row.querySelector(".wall-finish-labor-cost").value = data.laborCost;
        row.querySelector(".wall-finish-total-cost").value = data.totalCost.toFixed(2);
    }

    function addWallFinishRow() {
        let table = document.getElementById("wallFinishTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("wall-finish-row");

        newRow.innerHTML = `
            <td>
                <select title="Select a wall finish type">
                    <option value="paint">Paint</option>
                    <option value="wallpaper">Wallpaper</option>
                    <option value="wood_paneling">Wood Paneling</option>
                    <option value="stucco">Stucco</option>
                    <option value="brick">Brick</option>
                </select>
            </td>
            <td><input type="number" class="wall-finish-quantity" placeholder="0" title="Enter quantity"></td>
            <td><input type="number" class="wall-finish-unit-price" placeholder="0" title="Enter unit price"></td>
            <td><input type="number" class="wall-finish-labor-unit" placeholder="0" title="Enter labor units"></td>
            <td><input type="number" class="wall-finish-labor-cost" placeholder="0" title="Enter cost per labor unit"></td>
            <td><input type="text" class="wall-finish-total-cost" readonly title="Calculated total cost"></td>
        `;

        // Attach event listeners for real-time calculation
        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateWallFinishCost);
        });
        
        // Add event listener for select dropdown
        newRow.querySelector("select").addEventListener("change", calculateWallFinishCost);
    }

    function deleteLastWallFinishRow() {
        let table = document.getElementById("wallFinishTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateWallFinishCost();
        }
    }

    // Add event listeners to existing inputs
    document.querySelectorAll(".wall-finish-quantity, .wall-finish-unit-price, .wall-finish-labor-unit, .wall-finish-labor-cost").forEach(input => {
        input.addEventListener("input", calculateWallFinishCost);
    });
    
    // Add event listeners to existing select dropdowns
    document.querySelectorAll("#wallFinishTable select").forEach(select => {
        select.addEventListener("change", calculateWallFinishCost);
    });
    
    // Load saved data when page loads
    loadWallFinishData();

    // Expose functions to global scope
    window.addWallFinishRow = addWallFinishRow;
    window.deleteLastWallFinishRow = deleteLastWallFinishRow;
    
    // Calculate initial values when page loads
    calculateWallFinishCost();
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Countertop Finish Cost Script Loaded");

    function calculateCountertopFinishCost() {
        let totalCountertopFinishCost = 0;
        let materialCountertopFinishCost = 0;
        let laborCountertopFinishCost = 0;
        
        // Track row data for detailed saving
        let rowData = [];

        document.querySelectorAll(".countertop-finish-row").forEach((row, index) => {
            let countertopType = row.querySelector("select")?.value || "";
            let quantity = parseFloat(row.querySelector(".countertop-finish-quantity")?.value) || 0;
            let unitPrice = parseFloat(row.querySelector(".countertop-finish-unit-price")?.value) || 0;
            let laborUnit = parseFloat(row.querySelector(".countertop-finish-labor-unit")?.value) || 0;
            let laborCost = parseFloat(row.querySelector(".countertop-finish-labor-cost")?.value) || 0;
            let totalCostField = row.querySelector(".countertop-finish-total-cost");

            let materialCost = quantity * unitPrice;
            let laborTotal = laborUnit * laborCost;
            let totalCost = materialCost + laborTotal;

            if (totalCostField) {
                totalCostField.value = totalCost.toFixed(2); // Display calculated total cost
            }

            totalCountertopFinishCost += totalCost; // Sum all costs
            materialCountertopFinishCost += materialCost; // Sum material costs
            laborCountertopFinishCost += laborTotal; // Sum labor costs
            
            // Save row data for detailed storage
            rowData.push({
                countertopType,
                quantity,
                unitPrice,
                laborUnit,
                laborCost,
                materialCost,
                laborTotal,
                totalCost
            });
        });

        document.getElementById("totalCountertopFinishCost").value = totalCountertopFinishCost.toFixed(2);
        
        // Save all relevant data to localStorage
        saveCountertopFinishData(totalCountertopFinishCost, materialCountertopFinishCost, laborCountertopFinishCost, rowData);
    }
    
    function saveCountertopFinishData(total, material, labor, rowData) {
        // Save individual key-value pairs for direct Excel access
        localStorage.setItem("countertopFinishTotal", total.toFixed(2));
        localStorage.setItem("materialCountertopFinishCost", material.toFixed(2));
        localStorage.setItem("laborCountertopFinishCost", labor.toFixed(2));
        
        // Save detailed row data for restoration
        localStorage.setItem("countertopFinishRowData", JSON.stringify(rowData));
    }
    
    function loadCountertopFinishData() {
        // Try to load saved data
        const totalCost = localStorage.getItem("countertopFinishTotal");
        const rowData = JSON.parse(localStorage.getItem("countertopFinishRowData") || "[]");
        
        if (totalCost) {
            document.getElementById("totalCountertopFinishCost").value = totalCost;
        }
        
        // Repopulate rows if we have saved row data
        if (rowData.length > 0) {
            // Clear existing rows, keeping the first row
            const tbody = document.getElementById("countertopFinishTable").getElementsByTagName("tbody")[0];
            while (tbody.rows.length > 1) {
                tbody.deleteRow(tbody.rows.length - 1);
            }
            
            // Populate first row with data from first saved row
            if (rowData[0]) {
                populateRow(tbody.rows[0], rowData[0]);
            }
            
            // Add and populate additional rows
            for (let i = 1; i < rowData.length; i++) {
                addCountertopFinishRow();
                populateRow(tbody.rows[i], rowData[i]);
            }
        }
    }
    
    function populateRow(row, data) {
        row.querySelector("select").value = data.countertopType;
        row.querySelector(".countertop-finish-quantity").value = data.quantity;
        row.querySelector(".countertop-finish-unit-price").value = data.unitPrice;
        row.querySelector(".countertop-finish-labor-unit").value = data.laborUnit;
        row.querySelector(".countertop-finish-labor-cost").value = data.laborCost;
        row.querySelector(".countertop-finish-total-cost").value = data.totalCost.toFixed(2);
    }

    function addCountertopFinishRow() {
        let table = document.getElementById("countertopFinishTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("countertop-finish-row");

        newRow.innerHTML = `
            <td>
                <select title="Select a countertop finish type">
                    <option value="granite">Granite</option>
                    <option value="quartz">Quartz</option>
                    <option value="marble">Marble</option>
                    <option value="laminate">Laminate</option>
                </select>
            </td>
            <td><input type="number" class="countertop-finish-quantity" placeholder="0" title="Enter quantity"></td>
            <td><input type="number" class="countertop-finish-unit-price" placeholder="0" title="Enter unit price"></td>
            <td><input type="number" class="countertop-finish-labor-unit" placeholder="0" title="Enter labor units"></td>
            <td><input type="number" class="countertop-finish-labor-cost" placeholder="0" title="Enter cost per labor unit"></td>
            <td><input type="text" class="countertop-finish-total-cost" readonly title="Calculated total cost"></td>
        `;

        // Attach event listeners for real-time calculation
        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateCountertopFinishCost);
        });
        
        // Add event listener for select dropdown
        newRow.querySelector("select").addEventListener("change", calculateCountertopFinishCost);
    }

    function deleteLastCountertopFinishRow() {
        let table = document.getElementById("countertopFinishTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateCountertopFinishCost();
        }
    }

    // Add event listeners to existing inputs
    document.querySelectorAll(".countertop-finish-quantity, .countertop-finish-unit-price, .countertop-finish-labor-unit, .countertop-finish-labor-cost").forEach(input => {
        input.addEventListener("input", calculateCountertopFinishCost);
    });
    
    // Add event listeners to existing select dropdowns
    document.querySelectorAll("#countertopFinishTable select").forEach(select => {
        select.addEventListener("change", calculateCountertopFinishCost);
    });
    
    // Load saved data when page loads
    loadCountertopFinishData();

    // Expose functions to global scope
    window.addCountertopFinishRow = addCountertopFinishRow;
    window.deleteLastCountertopFinishRow = deleteLastCountertopFinishRow;
    
    // Calculate initial values when page loads
    calculateCountertopFinishCost();
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("Exterior Finish Cost Script Loaded");

    function calculateExteriorFinishCost() {
        let totalExteriorFinishCost = 0;
        let materialExteriorFinishCost = 0;
        let laborExteriorFinishCost = 0;
        
        // Track row data for detailed saving
        let rowData = [];

        document.querySelectorAll(".exterior-finish-row").forEach((row, index) => {
            let exteriorType = row.querySelector("select")?.value || "";
            let quantity = parseFloat(row.querySelector(".exterior-finish-quantity")?.value) || 0;
            let unitPrice = parseFloat(row.querySelector(".exterior-finish-unit-price")?.value) || 0;
            let laborUnit = parseFloat(row.querySelector(".exterior-finish-labor-unit")?.value) || 0;
            let laborCost = parseFloat(row.querySelector(".exterior-finish-labor-cost")?.value) || 0;
            let totalCostField = row.querySelector(".exterior-finish-total-cost");

            let materialCost = quantity * unitPrice;
            let laborTotal = laborUnit * laborCost;
            let totalCost = materialCost + laborTotal;

            if (totalCostField) {
                totalCostField.value = totalCost.toFixed(2); // Display calculated total cost
            }

            totalExteriorFinishCost += totalCost; // Sum all costs
            materialExteriorFinishCost += materialCost; // Sum material costs
            laborExteriorFinishCost += laborTotal; // Sum labor costs
            
            // Save row data for detailed storage
            rowData.push({
                exteriorType,
                quantity,
                unitPrice,
                laborUnit,
                laborCost,
                materialCost,
                laborTotal,
                totalCost
            });
        });

        document.getElementById("totalExteriorFinishCost").value = totalExteriorFinishCost.toFixed(2);
        
        // Save all relevant data to localStorage
        saveExteriorFinishData(totalExteriorFinishCost, materialExteriorFinishCost, laborExteriorFinishCost, rowData);
    }
    
    function saveExteriorFinishData(total, material, labor, rowData) {
        // Save individual key-value pairs for direct Excel access
        localStorage.setItem("exteriorFinishTotal", total.toFixed(2));
        localStorage.setItem("materialExteriorFinishCost", material.toFixed(2));
        localStorage.setItem("laborExteriorFinishCost", labor.toFixed(2));
        
        // Save detailed row data for restoration
        localStorage.setItem("exteriorFinishRowData", JSON.stringify(rowData));
    }
    
    function loadExteriorFinishData() {
        // Try to load saved data
        const totalCost = localStorage.getItem("exteriorFinishTotal");
        const rowData = JSON.parse(localStorage.getItem("exteriorFinishRowData") || "[]");
        
        if (totalCost) {
            document.getElementById("totalExteriorFinishCost").value = totalCost;
        }
        
        // Repopulate rows if we have saved row data
        if (rowData.length > 0) {
            // Clear existing rows, keeping the first row
            const tbody = document.getElementById("exteriorFinishTable").getElementsByTagName("tbody")[0];
            while (tbody.rows.length > 1) {
                tbody.deleteRow(tbody.rows.length - 1);
            }
            
            // Populate first row with data from first saved row
            if (rowData[0]) {
                populateRow(tbody.rows[0], rowData[0]);
            }
            
            // Add and populate additional rows
            for (let i = 1; i < rowData.length; i++) {
                addExteriorFinishRow();
                populateRow(tbody.rows[i], rowData[i]);
            }
        }
    }
    
    function populateRow(row, data) {
        row.querySelector("select").value = data.exteriorType;
        row.querySelector(".exterior-finish-quantity").value = data.quantity;
        row.querySelector(".exterior-finish-unit-price").value = data.unitPrice;
        row.querySelector(".exterior-finish-labor-unit").value = data.laborUnit;
        row.querySelector(".exterior-finish-labor-cost").value = data.laborCost;
        row.querySelector(".exterior-finish-total-cost").value = data.totalCost.toFixed(2);
    }

    function addExteriorFinishRow() {
        let table = document.getElementById("exteriorFinishTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.classList.add("exterior-finish-row");

        newRow.innerHTML = `
            <td>
                <select title="Select an exterior finish type">
                    <option value="siding">Siding</option>
                    <option value="stucco">Stucco</option>
                    <option value="brick">Brick</option>
                </select>
            </td>
            <td><input type="number" class="exterior-finish-quantity" placeholder="0" title="Enter quantity"></td>
            <td><input type="number" class="exterior-finish-unit-price" placeholder="0" title="Enter unit price"></td>
            <td><input type="number" class="exterior-finish-labor-unit" placeholder="0" title="Enter labor units"></td>
            <td><input type="number" class="exterior-finish-labor-cost" placeholder="0" title="Enter cost per labor unit"></td>
            <td><input type="text" class="exterior-finish-total-cost" readonly title="Calculated total cost"></td>
        `;

        // Attach event listeners for real-time calculation
        newRow.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateExteriorFinishCost);
        });
        
        // Add event listener for select dropdown
        newRow.querySelector("select").addEventListener("change", calculateExteriorFinishCost);
    }

    function deleteLastExteriorFinishRow() {
        let table = document.getElementById("exteriorFinishTable").getElementsByTagName("tbody")[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculateExteriorFinishCost();
        }
    }

    // Add event listeners to existing inputs
    document.querySelectorAll(".exterior-finish-quantity, .exterior-finish-unit-price, .exterior-finish-labor-unit, .exterior-finish-labor-cost").forEach(input => {
        input.addEventListener("input", calculateExteriorFinishCost);
    });
    
    // Add event listeners to existing select dropdowns
    document.querySelectorAll("#exteriorFinishTable select").forEach(select => {
        select.addEventListener("change", calculateExteriorFinishCost);
    });
    
    // Load saved data when page loads
    loadExteriorFinishData();

    // Expose functions to global scope
    window.addExteriorFinishRow = addExteriorFinishRow;
    window.deleteLastExteriorFinishRow = deleteLastExteriorFinishRow;
    
    // Calculate initial values when page loads
    calculateExteriorFinishCost();
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("Trim and Molding Finishes Script Loaded");
  
    // Calculate total cost for each row and sum up overall total.
    function calculateTrimMoldingCost() {
        let totalTrimMoldingCost = 0;
        let materialTrimMoldingCost = 0;
        let laborTrimMoldingCost = 0;
        
        // Track row data for detailed saving
        let rowData = [];
  
        document.querySelectorAll(".trim-molding-row").forEach((row, index) => {
            const moldingType = row.querySelector("select")?.value || "";
            const quantity = parseFloat(row.querySelector(".tm-quantity")?.value) || 0;
            const unitPrice = parseFloat(row.querySelector(".tm-unit-price")?.value) || 0;
            const laborUnits = parseFloat(row.querySelector(".tm-labor-units")?.value) || 0;
            const laborCost = parseFloat(row.querySelector(".tm-labor-cost")?.value) || 0;
            const totalCostField = row.querySelector(".tm-total-cost");
    
            // Material cost = quantity x unit price
            // Labor cost = labor units x cost per labor unit
            const materialCost = quantity * unitPrice;
            const laborTotal = laborUnits * laborCost;
            const rowTotal = materialCost + laborTotal;
    
            if (totalCostField) {
                totalCostField.value = rowTotal.toFixed(2);
            }
    
            totalTrimMoldingCost += rowTotal;
            materialTrimMoldingCost += materialCost;
            laborTrimMoldingCost += laborTotal;
            
            // Save row data for detailed storage
            rowData.push({
                moldingType,
                quantity,
                unitPrice,
                laborUnits,
                laborCost,
                materialCost,
                laborTotal,
                rowTotal
            });
        });
  
        document.getElementById("totalTrimMoldingCost").value = totalTrimMoldingCost.toFixed(2);
        
        // Save all relevant data to localStorage
        saveTrimMoldingData(totalTrimMoldingCost, materialTrimMoldingCost, laborTrimMoldingCost, rowData);
    }
    
    function saveTrimMoldingData(total, material, labor, rowData) {
        // Save individual key-value pairs for direct Excel access
        localStorage.setItem("trimMoldingTotal", total.toFixed(2));
        localStorage.setItem("materialTrimMoldingCost", material.toFixed(2));
        localStorage.setItem("laborTrimMoldingCost", labor.toFixed(2));
        
        // Save detailed row data for restoration
        localStorage.setItem("trimMoldingRowData", JSON.stringify(rowData));
    }
    
    function loadTrimMoldingData() {
        // Try to load saved data
        const totalCost = localStorage.getItem("trimMoldingTotal");
        const rowData = JSON.parse(localStorage.getItem("trimMoldingRowData") || "[]");
        
        if (totalCost) {
            document.getElementById("totalTrimMoldingCost").value = totalCost;
        }
        
        // Repopulate rows if we have saved row data
        if (rowData.length > 0) {
            // Clear existing rows, keeping the first row if it exists
            const tbody = document.getElementById("trimMoldingTable").getElementsByTagName("tbody")[0];
            
            // If there's a first row, populate it; otherwise add a new row
            if (tbody.rows.length > 0) {
                // Populate first row with data from first saved row
                if (rowData[0]) {
                    populateRow(tbody.rows[0], rowData[0]);
                }
                
                // Remove any extra rows beyond the first one
                while (tbody.rows.length > 1) {
                    tbody.deleteRow(tbody.rows.length - 1);
                }
            } else {
                // Add a new row if table is empty
                addTrimMoldingRow();
                if (rowData[0]) {
                    populateRow(tbody.rows[0], rowData[0]);
                }
            }
            
            // Add and populate additional rows
            for (let i = 1; i < rowData.length; i++) {
                addTrimMoldingRow();
                populateRow(tbody.rows[i], rowData[i]);
            }
        }
    }
    
    function populateRow(row, data) {
        row.querySelector("select").value = data.moldingType;
        row.querySelector(".tm-quantity").value = data.quantity;
        row.querySelector(".tm-unit-price").value = data.unitPrice;
        row.querySelector(".tm-labor-units").value = data.laborUnits;
        row.querySelector(".tm-labor-cost").value = data.laborCost;
        row.querySelector(".tm-total-cost").value = data.rowTotal.toFixed(2);
    }
  
    // Attach event listeners to inputs in a given row.
    function attachRowListeners(row) {
        row.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculateTrimMoldingCost);
        });
        
        // Add event listener for select dropdown
        row.querySelector("select").addEventListener("change", calculateTrimMoldingCost);
    }
  
    // Add a new row to the table.
    window.addTrimMoldingRow = function addTrimMoldingRow() {
        let tbody = document.getElementById("trimMoldingTable").getElementsByTagName("tbody")[0];
        let newRow = document.createElement("tr");
        newRow.classList.add("trim-molding-row");
        newRow.innerHTML = `
            <td>
                <select title="Select a molding type">
                    <option value="crown">Crown Molding</option>
                    <option value="baseboards">Baseboards</option>
                    <option value="casings">Window & Door Casings</option>
                </select>
            </td>
            <td><input type="number" class="tm-quantity" placeholder="0" title="Enter quantity"></td>
            <td><input type="number" class="tm-unit-price" placeholder="0" title="Enter unit price"></td>
            <td><input type="number" class="tm-labor-units" placeholder="0" title="Enter labor units"></td>
            <td><input type="number" class="tm-labor-cost" placeholder="0" title="Enter cost per labor unit"></td>
            <td><input type="text" class="tm-total-cost" readonly title="Calculated total cost"></td>
            <td><button class="deleteRowButton" onclick="deleteTrimMoldingRow(this)">Delete</button></td>
        `;
        tbody.appendChild(newRow);
        attachRowListeners(newRow);
        calculateTrimMoldingCost();
    };
  
    // Delete a specific row using its delete button.
    window.deleteTrimMoldingRow = function deleteTrimMoldingRow(button) {
        let row = button.closest("tr");
        let tbody = document.getElementById("trimMoldingTable").getElementsByTagName("tbody")[0];
        if (tbody.rows.length > 1) {
            row.remove();
            calculateTrimMoldingCost();
        } else {
            alert("At least one row must remain.");
        }
    };
  
    // Attach listeners to initial rows.
    document.querySelectorAll(".trim-molding-row").forEach(row => {
        attachRowListeners(row);
    });
    
    // Add event listeners to existing select dropdowns
    document.querySelectorAll("#trimMoldingTable select").forEach(select => {
        select.addEventListener("change", calculateTrimMoldingCost);
    });
    
    // Load saved data when page loads
    loadTrimMoldingData();
  
    // Initial calculation.
    calculateTrimMoldingCost();
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Painting Cost Script Loaded");

    function calculatePaintingCost() {
        let totalPaintingCost = 0;
        let materialPaintingCost = 0;
        let laborPaintingCost = 0;
        
        // Track row data for detailed saving
        let rowData = [];

        document.querySelectorAll(".painting-cost-row").forEach((row, index) => {
            const paintType = row.querySelector("select")?.value || "";
            const quantity = parseFloat(row.querySelector(".paint-quantity")?.value) || 0;
            const unitPrice = parseFloat(row.querySelector(".paint-unit-price")?.value) || 0;
            const laborUnits = parseFloat(row.querySelector(".paint-labor-units")?.value) || 0;
            const laborCost = parseFloat(row.querySelector(".paint-labor-cost")?.value) || 0;
            const totalCostField = row.querySelector(".paint-total-cost");
            
            const materialCost = quantity * unitPrice;
            const laborTotal = laborUnits * laborCost;
            const rowTotal = materialCost + laborTotal;
            
            if (totalCostField) {
                totalCostField.value = rowTotal.toFixed(2);
            }
            
            totalPaintingCost += rowTotal;
            materialPaintingCost += materialCost;
            laborPaintingCost += laborTotal;
            
            // Save row data for detailed storage
            rowData.push({
                paintType,
                quantity,
                unitPrice,
                laborUnits,
                laborCost,
                materialCost,
                laborTotal,
                rowTotal
            });
        });
        
        document.getElementById("totalPaintingCost").value = totalPaintingCost.toFixed(2);
        
        // Save all relevant data to localStorage
        savePaintingData(totalPaintingCost, materialPaintingCost, laborPaintingCost, rowData);
        
        // Call the global finishing cost update if it exists
        if (typeof updateTotalFinishingCost === 'function') {
            updateTotalFinishingCost();
        }
    }
    
    function savePaintingData(total, material, labor, rowData) {
        // Save individual key-value pairs for direct Excel access
        localStorage.setItem("paintingTotal", total.toFixed(2));
        localStorage.setItem("materialPaintingCost", material.toFixed(2));
        localStorage.setItem("laborPaintingCost", labor.toFixed(2));
        
        // Save detailed row data for restoration
        localStorage.setItem("paintingRowData", JSON.stringify(rowData));
    }
    
    function loadPaintingData() {
        // Try to load saved data
        const totalCost = localStorage.getItem("paintingTotal");
        const rowData = JSON.parse(localStorage.getItem("paintingRowData") || "[]");
        
        if (totalCost) {
            document.getElementById("totalPaintingCost").value = totalCost;
        }
        
        // Repopulate rows if we have saved row data
        if (rowData.length > 0) {
            // Clear existing rows, keeping the first row
            const tbody = document.getElementById("paintingCostTable").getElementsByTagName("tbody")[0];
            
            // Keep first row and populate it
            if (tbody.rows.length > 0 && rowData[0]) {
                populateRow(tbody.rows[0], rowData[0]);
                
                // Remove any additional rows
                while (tbody.rows.length > 1) {
                    tbody.deleteRow(tbody.rows.length - 1);
                }
            }
            
            // Add and populate additional rows
            for (let i = 1; i < rowData.length; i++) {
                addPaintingRow();
                populateRow(tbody.rows[i], rowData[i]);
            }
        }
        
        // Call the global finishing cost update if it exists
        if (typeof updateTotalFinishingCost === 'function') {
            updateTotalFinishingCost();
        }
    }
    
    function populateRow(row, data) {
        // Set select value if it exists
        if (row.querySelector("select") && data.paintType) {
            row.querySelector("select").value = data.paintType;
        }
        
        // Set input values
        row.querySelector(".paint-quantity").value = data.quantity;
        row.querySelector(".paint-unit-price").value = data.unitPrice;
        row.querySelector(".paint-labor-units").value = data.laborUnits;
        row.querySelector(".paint-labor-cost").value = data.laborCost;
        row.querySelector(".paint-total-cost").value = data.rowTotal.toFixed(2);
    }
    
    function addPaintingRow() {
        let table = document.getElementById("paintingCostTable").getElementsByTagName('tbody')[0];
        let newRow = table.rows[0].cloneNode(true);
        newRow.querySelectorAll("input").forEach(input => input.value = "");
        table.appendChild(newRow);
        
        // Attach event listeners
        attachRowListeners(newRow);
    }
    
    function deleteLastPaintingRow() {
        let table = document.getElementById("paintingCostTable").getElementsByTagName('tbody')[0];
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
            calculatePaintingCost();
        }
    }
    
    // Attach event listeners to a row
    function attachRowListeners(row) {
        row.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calculatePaintingCost);
        });
        
        // Add event listener for select dropdown if it exists
        if (row.querySelector("select")) {
            row.querySelector("select").addEventListener("change", calculatePaintingCost);
        }
    }
    
    // Add event listeners to all existing rows
    document.querySelectorAll(".painting-cost-row").forEach(row => {
        attachRowListeners(row);
    });
    
    // Load saved data when page loads
    loadPaintingData();
    
    // Expose functions to global scope
    window.addPaintingRow = addPaintingRow;
    window.deleteLastPaintingRow = deleteLastPaintingRow;
    window.calculatePaintingCost = calculatePaintingCost;
    
    // Calculate initial values when page loads
    calculatePaintingCost();
});
  // Function to update Total Finishing Cost
  function updateTotalFinishingCost() {
    let total = 0;

    // Get values from different finishing cost inputs
    let floorCost = parseFloat(document.getElementById("totalFloorFinishCost").value) || 0;
    let wallCost = parseFloat(document.getElementById("totalWallFinishCost").value) || 0;
    let countertopCost = parseFloat(document.getElementById("totalCountertopFinishCost").value) || 0;
    let exteriorCost = parseFloat(document.getElementById("totalExteriorFinishCost").value) || 0;
    let trimMoldingCost = parseFloat(document.getElementById("totalTrimMoldingCost").value) || 0;
    let paintingCost = parseFloat(document.getElementById("totalPaintingCost").value) || 0; // Include total painting cost

    // Calculate total finishing cost
    total = floorCost + wallCost + countertopCost + exteriorCost + trimMoldingCost + paintingCost;

    // Set the total finishing cost in the input field
    document.getElementById("totalFinishingCost").value = total;

    // Store the total finishing cost in localStorage
    localStorage.setItem("totalFinishingCost", total);
}

// Call update function whenever costs are updated
document.addEventListener("input", updateTotalFinishingCost);
document.addEventListener('DOMContentLoaded', function () {
    loadSavedValues();

    // Save cell values and totals when inputs change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', saveAllValues);
    });

    function saveAllValues() {
        const dataToSave = {};

        // Loop through each row and save inputs and totals
        document.querySelectorAll('tbody tr').forEach((row, index) => {
            dataToSave[`row_${index}`] = Array.from(row.querySelectorAll('input, select')).map(input => input.value);
        });

        // Save all total values for each section
        document.querySelectorAll('.total-cost input').forEach(input => {
            dataToSave[input.id] = input.value;
        });

        localStorage.setItem('finishingCostData', JSON.stringify(dataToSave));
    }

    function loadSavedValues() {
        const savedData = JSON.parse(localStorage.getItem('finishingCostData'));

        if (savedData) {
            Object.keys(savedData).forEach(key => {
                if (key.startsWith('row_')) {
                    const inputs = document.querySelectorAll('tbody tr')[key.split('_')[1]]?.querySelectorAll('input, select');
                    savedData[key].forEach((value, i) => {
                        if (inputs && inputs[i]) {
                            inputs[i].value = value;
                        }
                    });
                } else {
                    const input = document.getElementById(key);
                    if (input) input.value = savedData[key];
                }
            });
        }
    }
});
// JavaScript: Saving and Loading the Total Finishing Cost
document.addEventListener("DOMContentLoaded", function () {
    const totalFinishingCostInput = document.getElementById("totalFinishingCost");

    // Load saved total cost from localStorage if available
    const savedTotalFinishingCost = localStorage.getItem("totalFinishingCost");
    if (savedTotalFinishingCost) {
        totalFinishingCostInput.value = parseFloat(savedTotalFinishingCost); // Set saved value
    }

    // Save the total cost in localStorage whenever it changes
    totalFinishingCostInput.addEventListener("change", function () {
        const currentTotal = parseFloat(totalFinishingCostInput.value) || 0;
        localStorage.setItem("totalFinishingCost", currentTotal);
    });
});

