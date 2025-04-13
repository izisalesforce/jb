// app.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON in request bodies
// app.use(bodyParser.json());

// Register middleware that parses the request payload.
app.use(require('body-parser').raw({
	type: 'application/jwt'
}));


// Serve the public folder (where index.html, activity.js, postmonger.js, styles.css, etc. are located)
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Optional: Add endpoints for Journey Builder’s REST calls
 * (e.g., /execute, /save, /publish, /validate)
 */
app.post('/execute', (req, res) => {
  const secret = process.env.SALES;
    // Handle the data from Journey Builder, if needed
    jwt.verify(req.body.toString('utf8'), secret, {
      algorithm: 'HS256'
    }, function(err, decoded) {
      if (err) {
        console.log('Error decoding JWT:', err);
        return res.status(400).json({ error: 'Invalid JWT' });
      }
      console.log('Decoded JWT:', decoded);

      // console.log('Execute payload:', decoded);
      // console.log('Request Headers:', req.headers);
      const DUPLICATED_EMAILS = {
        emails: ['isandrearamirez@salesforce.com', 'test@example.com'] // Example emails
    };
    const inArguments = decoded.inArguments || [];
    let emailAddress;
  
    emailAddress = inArguments[0].emailAddress;
    const isDuplicated = DUPLICATED_EMAILS.emails.includes(emailAddress);
  
          console.log('Is email duplicated:', isDuplicated);
  
          if (isDuplicated) {
              return res.status(200).json({ branchResult: 'excluded' });
          } else {
              return res.status(200).json({ branchResult: 'accepted' });
          }
    });



    // Example: send a success response
    //return re(s.status(200).json({ status: 'ok' });
    // const responsePayload = { branchResult: "excluded" };
    // console.log('Response payload:',  JSON.stringify(responsePayload));
    // return res.status(200).json(responsePayload);
  });

app.post('/save', (req, res) => {
  // Handle the save event from Journey Builder
  console.log('Save payload:', req.body);
  // return res.status(200).json({});
  return res.status(200).json({success: true});
});

// Handle the publish event
app.post('/publish', (req, res) => {
  console.log('Publish payload:', req.body);
  return res.status(200).json({});
});

app.post('/validate', (req, res) => {
  // Handle the validate event
  console.log('Validate payload:', req.body);
  return res.status(200).json({});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});