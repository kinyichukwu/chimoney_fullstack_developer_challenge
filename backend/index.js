import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const corsOptions = {
    origin: ['http://127.0.0.1:5173', null]
  };
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const baseUrl = "https://api-v2-sandbox.chimoney.io"


app.get("/all_transactions", async (req, res) => {
    try {
        const url = `${baseUrl}/v0.2/accounts/transactions`;

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY,
            // "Access-Control-Allow-Origin": "*" // You don't need to set this header when making a request to another server
        };

        const response = await axios.post(url, {}, { headers: headers });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('There was an error!', error);
        res.status(500).send(error.toString());
    }
});



app.post('/initiate_payment', async (req, res) => {
    try {
        const { valueInUSD, payerEmail, currency, amount, redirect_url } = req.body;

        const url = `${baseUrl}/v0.2/payment/initiate`;

        const payload = {
            valueInUSD,
            payerEmail,
            currency,
            amount,
            redirect_url
        };

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY
        };

        const response = await axios.post(url, payload, { headers });

        console.log(response.data);

        res.json(response.data);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

app.get('/', (req, res) => {
    res.send("Hello World lallals!!!");
});

app.post('/verify_payment', async (req, res) => {
    try {
        const url = `${baseUrl}/v0.2/payment/verify`;
        const { id } = req.body;

        const payload = { id };

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": process.env.API_KEY
        };

        const response = await axios.post(url, payload, { headers });

        console.log(response.data);

        res.json(response.data);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});



app.post('/chimoney_transfer', async (req, res) => {
    try {
        const url = `${baseUrl}/v0.2/payouts/initiate-chimoney`;

        const { chimoneys } = req.body;

        const payload = {
            chimoneys
        };

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": process.env.CHIMONEY_API_KEY
        };

        const response = await axios.post(url, payload, { headers });
        res.json(response.data);
    } catch (e) {
        if (e.response) {
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        } else if (e.request) {
            coneole.log(e.request);
        } else {
            console.log('Error', e.message);
        }
        console.log(e.config);
        res.status(500).send(e.toString());
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


