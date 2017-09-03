# Simple blockchain

Shamefully inspired from [this article](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54) ([code](https://github.com/lhartikk/naivechain/blob/master/main.js)).

## Principle

* When connected to peers, it's become an **node**.
* When generates a new block, **node** broadcasts it to others connected peers.
* When a **node** connects to a new peer it querys for the latest block.
* When a **node** encounters a block that has an index larger than the current known block, it either adds the block the its current chain or querys for the full blockchain.

## HTTP methods

* Get all blocks: GET `/blocks`
* Start mining: POST `/mine`
* Get all connected peers: GET `/peers`
* Connect to peers: POST `/peers`

## Get started

Run HTTP and P2P servers:

```bash
$ yarn run dev
```

## Tests

Run tests:

```bash
$ yarn run test
```
