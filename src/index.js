const express = require("express");
const app = express();

const api = require("./api");

app.use(express.json());

app.get("/client", async (req, res) => {
  try {
    const { data } = await api.get("client/status");

    return res.send({
      started: data.started,
      uptime: data.uptime,
      version: data.version,
      protocolversion: data.protocolversion,
      blocks: data.blocks,
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get("/address/balance/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const { data } = await api.get(`/address/balance/${address}`);
    return res.send({
      addrStr: data.address,
      balance: data.balance.total,
      balanceSat: data.balance.total * 100000000,
      totalReceived: data.received,
      totalReceivedSat: data.sent * 100000000,
      totalSent: data.sent,
      totalSentSat: data.sent * 100000000,
      transactions: data.unconfirmed.transactions,
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get("/api/tx/:txid", async (req, res) => {
  const { txid } = req.params;
  try {
    const { data } = await api.get(`/transaction/check/${txid}`);

    res.send({
      txid: data.txid,
      version: data.version,
      size: data.size,
      locktime: data.locktime,
      blockhash: data.blockhash,
      blockheight: data.blockheight,
      confirmations: data.confirmations,
      time: data.time,
      blocktime: data.blocktime,
      isCoinBase: data.isCoinBase,
      vin: data.vin,
      vout: data.vout,
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.listen(5500, () => console.log("server up"));
