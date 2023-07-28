const fs = require('fs');

// Check if the command line argument (string2) is provided
if (process.argv.length < 3) {
  console.error('Please provide the string2 as a command line argument.');
  process.exit(1);
}

// Get the string2 from the command line arguments
const string2 = process.argv[2];

// File path of the particular file where the statement is present
const filePath = 'GlobalKYCAutomation/RunSettings.runsettings';

// Read the file content
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    process.exit(1);
  }

  // Regular expression to match the "value" key in the XML-like statement
  const regex = /<Parameter name\s*=\s*"(environment)"\s*value\s*=\s*"([^"]+)"\s*\/>/;

  // Replace the old value with string2
  const updatedData = data.replace(regex, `<Parameter name="environment" value="${string2}" />`);

  // Write the updated content back to the file
  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
      process.exit(1);
    }
    console.log(`Successfully replaced the value with "${string2}" in the file.`);
  });
});
