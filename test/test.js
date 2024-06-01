const { expect } = require("chai");

function tokens(n) {
  return hre.ethers.utils.parseEther(n.toString());
}

describe("Dappcord", async function () {
  let Dappcord, dappcord;
  let owner, addr1, addr2, addrs;

  before(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    Dappcord = await ethers.getContractFactory("Dappcord");
    dappcord = await Dappcord.deploy();
    await dappcord.deployed();
    console.log("Dappcord deployed to:", dappcord.address);
  });

  it("should allow owner to create a channel", async function () {
    const channel = ["general", "dev", "memes"];
    const cost = [tokens(0), tokens(1), tokens(0.5)];

    for (let i = 0; i < 3; i++) {
      const transaction = await dappcord
        .connect(owner)
        .createChannel(channel[i], cost[i]);
      await transaction.wait();
    }
    expect(await dappcord.totalChannels()).to.equal(3);
  });

  it("should not allow other users to create a channel", async function () {
    await expect(
      dappcord.connect(addr1).createChannel("dev", tokens(1))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("get all the channel details", async function () {
    const channel = await dappcord.getChannel(1);
    expect(channel.name).to.equal("general");
    expect(channel.cost).to.equal(tokens(0));
  });

  it("should mint a token", async function () {
    await dappcord.mint(1, { value: tokens(0) });
    expect(await dappcord.totalSupply()).to.equal(1);
  });

  it("should not allow to mint token if id is 0", async function () {
    await expect(dappcord.mint(0, { value: tokens(0) })).to.be.revertedWith(
      "Invalid channel id"
    );
  });

  it("should not allow to mint token if id is greater than totalChannels", async function () {
    await expect(dappcord.mint(20, { value: tokens(0) })).to.be.revertedWith(
      "Channel does not exist"
    );
  });

  it("should not allow to mint token if user has already joined the channel", async function () {
    await expect(dappcord.mint(1, { value: tokens(0) })).to.be.revertedWith(
      "Already joined this channel"
    );
  });

  it("should not allow to mint token if value is less than channel cost", async function () {
    await expect(dappcord.mint(2, { value: tokens(0.5) })).to.be.revertedWith(
      "Insufficient funds"
    );
  });

  it("owner should be able to withdraw funds", async function () {
    const initialBalance = await ethers.provider.getBalance(owner.address);
    console.log("Initial balance:", initialBalance.toString());

    // mint the token so that contract has some balance
    await dappcord.connect(addr1).mint(2, { value: tokens(1) });
    await dappcord.connect(addr1).mint(3, { value: tokens(0.5) });

    const contractBalance = await ethers.provider.getBalance(dappcord.address);
    console.log("Contract balance:", contractBalance.toString());

    const tx = await dappcord.connect(owner).withdraw();
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

    const finalBalance = await ethers.provider.getBalance(owner.address);
    console.log("Final balance:", finalBalance.toString());

    expect(finalBalance).to.be.equal(
      initialBalance.add(contractBalance).sub(gasUsed)
    );
  });

  it("should not allow others to withdraw funds", async function () {
    await expect(dappcord.connect(addr1).withdraw()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
