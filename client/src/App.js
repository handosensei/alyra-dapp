import React, { Component } from "react";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Workflow from "./components/Workflow/Workflow.jsx";
import Step0 from "./components/Step/Step0.jsx";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    contract: null,
    status: null,
    isOwner: null,
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
      const status = await instance.methods.getStatus().call();
      const nbVoters = await instance.methods.getNbVoters().call();

      this.setState({ 
        web3, 
        accounts, 
        status: status,
        contract: instance, 
        nbVoters: nbVoters,
        isOwner: (owner === accounts[0]), 
      });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
    }
  };

  getStep() {
    console.log(this.state);
    switch(this.state.status) {
      case '0':
        if (this.state.isOwner) {
          return <Step0 
            status={this.state.status}
            contract={this.state.contract}
            account={this.state.accounts[0]} />
        }
        
        break;
      default:
        return;
    }
  }

  render() {

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (     
      
      <div className="App">
        <div className="container">
          <h4>{this.state.accounts[0]}</h4>
          <div className="row">
            <div className="col-12">
              { !this.state.isOwner ? 
                <h2>Page d'accueil de VOTING</h2> : 
                <h2>Dashboard d'administration du VOTE</h2> } 
            </div>
            <div>
              <p>Nombre de votant : {this.state.nbVoters}</p>
            </div>
          </div>
          
          <Workflow 
            status={this.state.status}
            contract={this.state.contract} 
            account={this.state.accounts[0]} 
            isOwner={this.state.isOwner}
          />
          
          <div>{this.getStep()}</div>
          
        </div>
      </div> 
    );
  }
}
      
export default App;
