const process = require("process");
const util = require("util");

// Decodes a bencoded string or integer.
function decodeBencode(bencodedValue) {
	// Check if the first character is a digit (string encoding)
	if (!isNaN(bencodedValue[0])) {
		const firstColonIndex = bencodedValue.indexOf(":");
		if (firstColonIndex === -1) {
			throw new Error("Invalid encoded value");
		}
		return bencodedValue.substr(firstColonIndex + 1);
	}
	// Check if it's a bencoded integer
	else if (bencodedValue[0] === "i") {
		// Take a bencoded integer string (like "i52e")
		// Remove the leading "i" and trailing "e".
		return +bencodedValue.slice(1, -1);
	} else {
		throw new Error("Only strings and integers are supported at the moment");
	}
}

// Decodes a bencoded list.
function decodeBencodedList(bencodedValue) {
	if (bencodedValue[0] !== "l") {
		throw new Error("List should start with 'l'");
	}

	let elements = [];
	bencodedValue = bencodedValue.slice(1); // Remove the leading 'l'

	// Keep decoding elements until we encounter the closing 'e'
	while (bencodedValue[0] !== "e") {
		let element;
		if (bencodedValue[0] === "l") {
			// Recursively decode nested lists
			const endOfList = findClosingBracket(bencodedValue);
			element = decodeBencodedList(bencodedValue.slice(0, endOfList + 1));
			bencodedValue = bencodedValue.slice(endOfList + 1);
		} else {
			// Decode string or integer
			element = decodeBencode(bencodedValue);
			const strLength = element.toString().length;
			bencodedValue = bencodedValue.slice(strLength + (isNaN(element) ? 0 : 1)); // Adjust the string length
		}
		elements.push(element);
	}

	return elements;
}

// Helper function to find the closing 'e' for the list
function findClosingBracket(bencodedValue) {
	let openCount = 1; // The initial 'l' has been removed
	let i = 0;

	while (openCount > 0 && i < bencodedValue.length) {
		if (bencodedValue[i] === "l") {
			openCount++;
		} else if (bencodedValue[i] === "e") {
			openCount--;
		}
		i++;
	}

	return i - 1;
}

function main() {
	const command = process.argv[2];

	// You can use print statements as follows for debugging, they'll be visible when running tests.
	console.error("Logs from your program will appear here!");

	if (command === "decode") {
		const bencodedValue = process.argv[3];

		// Decode the bencoded value
		if (bencodedValue[0] === "l") {
			console.log(JSON.stringify(decodeBencodedList(bencodedValue))); // Decode the list
		} else {
			console.log(JSON.stringify(decodeBencode(bencodedValue))); // Decode a string or integer
		}
	} else {
		throw new Error(`Unknown command ${command}`);
	}
}

main();
