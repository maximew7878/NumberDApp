const express = require("express");
const Storage = require("./contracts/Storage.json");
const app = express();
app.use(express.json());

const { Web3 } = require("web3");

const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3 = new Web3(provider);

const deployedNetwork = Storage.networks[5777];
const contract = new web3.eth.Contract(Storage.abi, deployedNetwork.address);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/number", async (req, res) => {
    const number = await contract.methods.getter().call();
    res.json({ number: number.toString() });
});

app.post("/number", async (req, res) => {
    const { number } = req.body;
    const account = await web3.eth.getAccounts();
    contract.methods.setter(number).send({ from: account[0] });
    res.send({ success: true });
});

app.listen(3000, async () => {
    console.log("Server is running on http://localhost:3000");
});
