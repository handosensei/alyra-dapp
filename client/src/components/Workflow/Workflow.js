import React, { Component } from "react";

class Workflow extends Component 
{
    state = { 
        label: null, 
    };
      
    workflowStatus = {
        0: 'Inscription des électeurs',
        1: 'Enregistrement des candidats',
        2: 'Fermeture des enregistrements des candidats',
        3: 'Ouverture des votes',
        4: 'Fermeture des votes',
        5: 'Dépouillement des votes'
    };

    componentDidMount = async () => {
        const contract = this.props.contract;
        const status = await contract.methods.getStatus().call();

        this.setState({ 
            label: this.workflowStatus[status],
            workflowStatus: status,
        });
    }

    render() {
        return (<div>workflow en cours : {this.state.label}</div>);
    }
}

export default Workflow;