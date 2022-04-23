import React, { Component } from "react";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import Homepage from "./components/Homepage/homepage";
import Workflow from "./components/Workflow/Workflow.jsx";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    contract: null,
    isOwner: null
  };

  componentDidMount = async () => {

    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    })

    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const instance = new web3.eth.Contract(Voting.abi, deployedNetwork && deployedNetwork.address);

      const owner = await instance.methods.owner().call();
      
      this.setState({ 
        web3, 
        accounts, 
        contract: instance, 
        isOwner: (owner == accounts[0]), 
      });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
    }
  };

  render() {

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (     
      
      <div className="App">
        <BrowserRouter fallback={<div>Chargement...</div>}>
          <Routes>
            <Route path="/" element={ this.state.isOwner ? (<Navigate replace to="/dashboard" />) : <Homepage /> } />
            <Route path="dashboard" element={ !this.state.isOwner ? (<Navigate replace to="/homepage" />) : (<Dashboard account={this.state.accounts[0]} contract={this.state.contract} />) } />
          </Routes>
        </BrowserRouter>
        
        <Workflow 
          contract={this.state.contract} 
          account={this.state.accounts[0]} 
        />
      </div> 
    );
  }
}
      
export default App;
