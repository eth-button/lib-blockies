# lib-blockies

A simple, object-oriented approach to Ethereum identicons.

## Usage

```javascript
import Blockie from 'lib-blockies';

const identicon = new Blockie("0xffcf8fdee72ac11b5c542428b35eef5769c409f0");
const canvas = identicon.createCanvas(8);
document.body.appendChild(canvas);
```

This will render a canvas element (of size `8 * scale` pixels square) containing the identicon representation of the provided Ethereum address.  These are the same identicons as seen in Mist or MyEthereumWallet.

For example, the above should look like this:

![0xffcf8fdee72ac11b5c542428b35eef5769c409f0](./0xffcf8fdee72ac11b5c542428b35eef5769c409f0.png)
