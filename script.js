// Initialize array with sample string data
let stringArray = ['Honda', 'Yamaha', 'BMW', 'RE', 'Aprilia'];
let operationCount = 0;

// Update the display
function updateDisplay() {
    const arrayDisplay = document.getElementById('arrayDisplay');
    if (stringArray.length === 0) {
        arrayDisplay.innerHTML = '<span style="color: #999; font-style: italic;">Array is empty</span>';
    } else {
        arrayDisplay.innerHTML = stringArray.map(item =>
            `<span class="array-item">"${item}"</span>`
        ).join('');
    }
}

// Log operations
function logOperation(operation, result = null) {
    const logContainer = document.getElementById('operationLog');
    operationCount++;
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';

    let logText = `${operationCount}. ${operation}`;
    if (result !== null) {
        logText += ` → Result: ${JSON.stringify(result)}`;
    }
    logText += ` | Array: [${stringArray.map(item => `"${item}"`).join(', ')}]`;

    logEntry.textContent = logText;
    logContainer.insertBefore(logEntry, logContainer.firstChild);

    // Keep only last 10 entries
    const entries = logContainer.querySelectorAll('.log-entry');
    if (entries.length > 10) {
        entries[entries.length - 1].remove();
    }
}

// Get input values
function getInputValue() {
    return document.getElementById('inputValue').value.trim();
}

function getIndexInput() {
    const value = document.getElementById('indexInput').value;
    return value === '' ? null : parseInt(value);
}

function getDeleteCountInput() {
    const value = document.getElementById('deleteCountInput').value;
    return value === '' ? 1 : parseInt(value);
}

// Array Methods
function pushItem() {
    const value = getInputValue();
    if (!value) {
        alert('Please enter a value to push');
        return;
    }
    const newLength = stringArray.push(value);
    logOperation(`push("${value}")`, `Length: ${newLength}`);
    updateDisplay();
    document.getElementById('inputValue').value = '';
}

function popItem() {
    if (stringArray.length === 0) {
        alert('Array is empty!');
        return;
    }
    const poppedItem = stringArray.pop();
    logOperation('pop()', poppedItem);
    updateDisplay();
}

function unshiftItem() {
    const value = getInputValue();
    if (!value) {
        alert('Please enter a value to unshift');
        return;
    }
    const newLength = stringArray.unshift(value);
    logOperation(`unshift("${value}")`, `Length: ${newLength}`);
    updateDisplay();
    document.getElementById('inputValue').value = '';
}

function shiftItem() {
    if (stringArray.length === 0) {
        alert('Array is empty!');
        return;
    }
    const shiftedItem = stringArray.shift();
    logOperation('shift()', shiftedItem);
    updateDisplay();
}

function filterItems() {
    const value = getInputValue();
    if (!value) {
        alert('Please enter a value to filter by');
        return;
    }
    const originalLength = stringArray.length;
    stringArray = stringArray.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    logOperation(`filter(contains "${value}")`, `Filtered ${originalLength - stringArray.length} items`);
    updateDisplay();
    document.getElementById('inputValue').value = '';
}

function findItem() {
    const value = getInputValue();
    if (!value) {
        alert('Please enter a value to find');
        return;
    }
    const foundItem = stringArray.find(item => item.toLowerCase().includes(value.toLowerCase()));
    logOperation(`find(contains "${value}")`, foundItem || 'Not found');
    document.getElementById('inputValue').value = '';
}

function deleteItem() {
    const index = getIndexInput();
    if (index === null) {
        alert('Please enter an index to delete');
        return;
    }
    if (index < 0 || index >= stringArray.length) {
        alert('Index out of bounds!');
        return;
    }
    const deletedItem = stringArray[index];
    delete stringArray[index];
    logOperation(`delete array[${index}]`, `Deleted "${deletedItem}" (left undefined)`);
    updateDisplay();
    document.getElementById('indexInput').value = '';
}

function concatArray() {
    const value = getInputValue();
    if (!value) {
        // Concat with a default array
        const defaultArray = ['mango', 'grape'];
        stringArray = stringArray.concat(defaultArray);
        logOperation('concat(["mango", "grape"])', 'Arrays merged');
    } else {
        // Concat with input values (split by comma)
        const newItems = value.split(',').map(item => item.trim()).filter(item => item);
        stringArray = stringArray.concat(newItems);
        logOperation(`concat([${newItems.map(item => `"${item}"`).join(', ')}])`, 'Arrays merged');
        document.getElementById('inputValue').value = '';
    }
    updateDisplay();
}

function sortArray() {
    stringArray.sort();
    logOperation('sort()', 'Array sorted alphabetically');
    updateDisplay();
}

function reverseArray() {
    stringArray.reverse();
    logOperation('reverse()', 'Array reversed');
    updateDisplay();
}

function sliceArray() {
    const startIndex = getIndexInput();
    const deleteCount = getDeleteCountInput();

    if (startIndex === null) {
        // Slice from middle if no input
        const sliced = stringArray.slice(1, 3);
        logOperation('slice(1, 3)', sliced);
    } else {
        const endIndex = deleteCount ? startIndex + deleteCount : undefined;
        const sliced = stringArray.slice(startIndex, endIndex);
        logOperation(`slice(${startIndex}${endIndex ? ', ' + endIndex : ''})`, sliced);
    }
    document.getElementById('indexInput').value = '';
    document.getElementById('deleteCountInput').value = '';
}

function spliceArray() {
    const index = getIndexInput();
    const deleteCount = getDeleteCountInput();
    const value = getInputValue();

    if (index === null) {
        alert('Please enter an index for splice');
        return;
    }

    if (index < 0 || index > stringArray.length) {
        alert('Index out of bounds!');
        return;
    }

    let spliced;
    if (value) {
        // Insert new item while deleting
        const newItems = value.split(',').map(item => item.trim()).filter(item => item);
        spliced = stringArray.splice(index, deleteCount, ...newItems);
        logOperation(`splice(${index}, ${deleteCount}, ${newItems.map(item => `"${item}"`).join(', ')})`, spliced);
    } else {
        // Just delete items
        spliced = stringArray.splice(index, deleteCount);
        logOperation(`splice(${index}, ${deleteCount})`, spliced);
    }

    updateDisplay();
    document.getElementById('indexInput').value = '';
    document.getElementById('deleteCountInput').value = '';
    document.getElementById('inputValue').value = '';
}

function resetArray() {
    stringArray = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    operationCount = 0;
    document.getElementById('operationLog').innerHTML = '<div class="log-entry">Array reset to initial state</div>';
    logOperation('reset()', 'Array initialized');
    updateDisplay();

    // Clear inputs
    document.getElementById('inputValue').value = '';
    document.getElementById('indexInput').value = '';
    document.getElementById('deleteCountInput').value = '';
}

// Initialize display
updateDisplay();