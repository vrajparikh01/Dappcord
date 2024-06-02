import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { io } from "socket.io-client";

// Components
import Navigation from "./components/Navigation";
import Servers from "./components/Servers";
import Channels from "./components/Channels";
import Messages from "./components/Messages";

// ABIs
import Abi from "./abis/Dappcord.json";

// Config
import config from "./config.json";

// Socket
const socket = io("ws://localhost:3030");

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappcord, setDappcord] = useState(null);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/UMrTCtF9CvJeDZbZKIkt2jgpaqDUcb81"
    );
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);
    const dappcord = new ethers.Contract(
      config[network.chainId].Dappcord.address,
      Abi,
      provider
    );
    setDappcord(dappcord);

    const totalChannels = await dappcord.totalChannels();
    console.log(totalChannels.toString());

    const channels = [];
    for (let i = 1; i <= totalChannels; i++) {
      const channel = await dappcord.getChannel(i);
      channels.push(channel);
    }
    setChannels(channels);

    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <main>
        <Servers />
        <Channels
          provider={provider}
          account={account}
          dappcord={dappcord}
          channels={channels}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />
        <Messages />
      </main>
    </div>
  );
}

export default App;
