const express = require("express")
const server = require("./server");

const PORT = process.env.PORT || 8010;

server.listen(PORT, () => {
  console.log(`Biblos service listening on PORT ${PORT}`);
});
