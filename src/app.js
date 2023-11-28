const express = require('express');
const app = express();
app.use(express.json());

function encryptString(str) {
  let encrypted = '';
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    let encryptedCharCode = (charCode + 13) % 256;
    encrypted += String.fromCharCode(encryptedCharCode);
  }
  return encrypted;
}

// Write a GET route which encrypts the secret code and returns it to the client
/*
Sample Output: 
HTTP Status Code: 200
{
  "secret": "<encrypted value>"
}

Use the encryptString function given above to encrypt the secret code
*/

app.get('/api/get-env', (req, res) => {
    //Write your code here
  const secretCode = process.env.SECRET_CODE;

  if (!secretCode) {
    return res.status(500).json({
      error: 'Secret code is not defined in the environment variables.',
    });
  }

  const encryptedSecret = encryptString(secretCode);

  res.status(200).json({
    secret: encryptedSecret,
  });
});

module.exports = app;
