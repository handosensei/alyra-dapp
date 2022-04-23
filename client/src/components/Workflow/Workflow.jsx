import React, { Component } from "react";



class Workflow extends Component 
{
    state = { 
        label: null, 
        status: null,
        next: null,
        contract: null,
        account: null,
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
            status: status,
            next: this.workflowStatus[parseInt(status) + 1],
            contract: contract,
            account: this.props.account
        });
    }

    forward = async () => {
        const contract = this.state.contract;
        await contract.methods.startProposalsRegistering().send({from: this.state.account});
    }

    render() {
        return (
            <div>
                workflow en cours : {this.state.label} ({this.state.status})
                <br />
                prochaine étape : {this.state.next}
                <br />
                <button type="button" className="btn btn-primary" onClick={this.forward}>Prochaine étape</button>
            </div>  
        );
    }
}

export default Workflow;