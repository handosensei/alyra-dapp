import React, { Component } from "react";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Workflow from "./components/Workflow/Workflow.jsx";
import Step0 from "./components/Step/Step0.jsx";
import Step1 from "./components/Step/Step1.jsx";
import Step3 from "./components/Step/Step3.jsx";

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
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const instance = new web3.eth.Contract(Voting.abi, deployedNetwork && deployedNetwork.address);

      const accounts = await web3.eth.getAccounts();

      const owner = await instance.methods.owner().call();
      const status = await instance.methods.getStatus().call();
      const nbVoters = await instance.methods.getNbVoters().call();
      const nbProposals = await instance.methods.getNbProposals().call();

      this.setState({ 
        web3, 
        accounts, 
        status: status,
        contract: instance, 
        nbVoters: nbVoters,
        nbProposals: nbProposals,
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
    switch(this.state.status) {
      case '0':
        if (this.state.isOwner) {
          return <Step0 
            status={this.state.status}
            contract={this.state.contract}
            account={this.state.accounts[0]} />
        }
        break;
      case '1':
        if (!this.state.isOwner) {
          return <Step1 
            status={this.state.status}
            contract={this.state.contract}
            account={this.state.accounts[0]} />
        }
      case '3':
          return <Step3 
            status={this.state.status}
            contract={this.state.contract}
            account={this.state.accounts[0]} />
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
              <ul>
                <li>Nombre de votant : {this.state.nbVoters}</li>
                { this.state.status > 0 ? 
                <li>Nombre de proposal : {this.state.nbProposals}</li> : 
                <li>&nbsp;</li>
                }
              </ul>
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
