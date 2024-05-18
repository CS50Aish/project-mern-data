const express = require('express');
const bodyParser = require('body-parser');
const Bank = require('./bank');

const app = express();
const port = 3000;
const bank = new Bank();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Express Banking System');
});

app.post('/addAccount', (req, res) => {
    const { accountNumber, balance } = req.body;
    bank.addAccount(accountNumber, balance);
    res.send(`Account ${accountNumber} added with balance ${balance}`);
});

app.post('/transfer', (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;
    const success = bank.transfer(fromAccount, toAccount, amount);
    if (success) {
        res.send(`Transferred ${amount} from account ${fromAccount} to ${toAccount}`);
    } else {
        res.send(`Transfer failed`);
    }
});

app.get('/balance/:accountNumber', (req, res) => {
    const { accountNumber } = req.params;
    const balance = bank.checkBalance(accountNumber);
    if (balance !== null) {
        res.send(`The balance of account ${accountNumber} is ${balance}`);
    } else {
        res.send(`Account ${accountNumber} not found`);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
