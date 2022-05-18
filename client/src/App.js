import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import multiSigArtifact from './artifacts/contracts/MultisigWallet.sol/MultiSigWallet.json';

function App() {

  const account = "0x123456"
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [multiSigContract, setMultiSigContract] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const multiSigContract = await new ethers.Contract("0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0", multiSigArtifact.abi, provider);
      setMultiSigContract(multiSigContract);

    }

    init();
  }, [])

  const isConnected = () => (signer !== undefined)

  const getSigners = async provider => { 
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigners();

    signer.getAddress()
      .then(address => {
        setSignerAddress(address)
      })

    return signer
  }

  const connect = () => {
    getSigners(provider)
      .then(signer => {
        setSigner(signer)
      })

  }

  const handleConnect = (e) => {
    e.preventDefault();

    connect();
  }

  return (
    <div className="App">
      <div className='app__header'>
        <h1>MultiSig Wallet</h1>
        <div className='app__account'>Account: {signer}</div>

        <p className='app__warning'>Metamask is not connected</p>
        <button className='app__login' onClick={handleConnect}>
          Connect to Metamask
        </button>
      </div>
    </div>
  );
}

export default App;
