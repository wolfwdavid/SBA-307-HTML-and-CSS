const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const app = express();

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const client = new OAuth2Client(CLIENT_ID);

app.post('/callback', async (req, res) => {
    const token = req.body.id_token;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // Here, you would check if the user exists in your DB, and if not, create a new user
    // Then you would create a session or JWT token for your app

    res.status(200).send('User signed in');
});

app.listen(3000, () => console.log('Server started on port 3000'));
