import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    console.log(account);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>Dappcord</h1>
      </div>

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 5) + "...." + account.slice(39, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
