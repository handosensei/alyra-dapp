import React, { Component } from "react";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
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
        <div className="container">
          <h4>{this.state.accounts[0]}</h4>
          { !this.state.isOwner ? 
            (<Homepage />) : 
            (<Dashboard account={this.state.accounts[0]} contract={this.state.contract} />) } 
          <div className="row">
            <div className="col-12">
            <Workflow 
              contract={this.state.contract} 
              account={this.state.accounts[0]} 
              isOwner={this.state.isOwner}
            />
            </div>
          </div>
        </div>
      </div> 
    );
  }
}
      
export default App;
