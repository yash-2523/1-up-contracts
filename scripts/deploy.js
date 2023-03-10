// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const deployer = await hre.ethers.getSigner();

  const FIFA = await hre.ethers.getContractFactory("Fifa");
  const fifa = await FIFA.deploy("20000000000000000000000000000000000000000000000000000000000000000");

  await fifa.deployed();

  console.log(
    `fifa deployed to ${fifa.address}`
  );

  const FAUCET = await hre.ethers.getContractFactory("FaucetToken");
  const faucet = await FAUCET.deploy(fifa.address);

  await faucet.deployed();

  console.log(
    `faucet deployed to ${faucet.address}`
  );

  const ADMINFEE = await hre.ethers.getContractFactory("AdminFee");
  const adminFEE = await ADMINFEE.deploy(fifa.address);

  await adminFEE.deployed();

  console.log(
    `adminFEE deployed to ${adminFEE.address}`
  );

  const VAULT = await hre.ethers.getContractFactory("Vault");
  const vault = await VAULT.deploy(fifa.address, adminFEE.address, "ydLT+pqKEUox7Y67NV2LvRn66i1/ZtnAeNTJjPCE+bZMnKpFqiZ8vTZNd9PO1kM6QPX4wVngSHAXpwQcB8jIGXhfPcbCBf+9QoqmTYP1KM3o93ACTswsK+yeVp/C4Z1HtmncQrqRAxkb4Um4UM/TCmuxNIrxQ5tr2uSSX7RRgN5AjpZ5941ogRmIcoShzCz60NqJE9aDKB0pux2Qf1PXriydj0ExeuVrczIyAJd8ECOKXtKAlkHlTTuI1TJdfjIujBdstOufbDyhhMeBHxIht0zKfvXBRfWRaFFam6/NS8Zi30PIInR/UMT/TrOYjMTTY4uPUKXfPGN705irmYsjtw==", "yXjxShvfQ2V/zahhUSRtWZ1rkpqqQVjmTG+GMPyl7KU2rHWKMgHTzNgXsV1GRqw08SLAj5jzdWiozB3/CGT+28yANCtXYxjAOsrKMrkW1OCVPTKN8v9nIuhACfmu7jnu/SRK+Ipq8Q4RZ+kWpyI12zTOlFvs5EyjhOnerF+OKwBDXcqgUjnsZbpMQjO/n2PxAHmKo5wtKtOv6H59LeCBzBdEbN9qwLgnG/37PmszX2FgtxSVsU7UKD7eoBlVK/m5dUgYqWaYtyaCTElpWEab+CeHcGM2brAkaVyPv1zNY+xPddNn3XI7cG1lgLb5oBIDWRJlnz4JZRV9X+6kkrxTIQ==");

  await vault.deployed();

  console.log(
    `vault deployed to ${vault.address}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
