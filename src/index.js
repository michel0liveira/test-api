const express = require("express");
const app = express();

const api = require("./api");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "todo ok" });
});

app.get("/client", async (req, res) => {
  try {
    const { data } = await api.get("client/status");
    console.log(data);
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

app.get("/address/balennce/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const { data } = await api.get(`/address/balance/${address}`);
    console.log(data);
    return res.send({
      address: data.address,
      received: data.received,
      sent: data.sent,
      balance: {
        total: data.balance.total,
        locked: data.balance.locked,
        unlocked: data.balance.unlocked,
      },
      unconfirmed: {
        delta: data.unconfirmed.delta,
        transactions: [],
      },
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});
app.listen(5500, () => console.log("server up"));
