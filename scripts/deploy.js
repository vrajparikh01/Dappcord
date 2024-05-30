const hre = require("hardhat");

function tokens(n) {
  return hre.ethers.utils.parseEther(n.toString());
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  const Dappcord = await hre.ethers.getContractFactory("Dappcord");
  const dappcord = await Dappcord.deploy();
  await dappcord.deployed();
  console.log("Dappcord deployed to:", dappcord.address);

  const channel = ["general", "dev", "memes"];
  const cost = [tokens(0), tokens(1), tokens(0.5)];

  for (let i = 0; i < 3; i++) {
    const transaction = await dappcord
      .connect(deployer)
      .createChannel(channel[i], cost[i]);
    await transaction.wait();

    console.log(`Created channel #${channel[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
