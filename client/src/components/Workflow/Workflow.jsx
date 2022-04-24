import React, { Component } from "react";

class Workflow extends Component 
{
    state = { 
        label: null, 
        status: null,
        next: null,
        contract: null,
        account: null,
        isOwner: null,
    };
      
    workflowStatus = {
        0: 'Inscription des électeurs',
        1: 'Enregistrement des propositions',
        2: 'Fermeture des propositions',
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
            account: this.props.account,
            isOwner: this.props.isOwner
        });
    }

    forward = async () => {
        const contract = this.state.contract;
        let object;
        switch (this.state.status) {
            case '1':
                object = await contract.methods.endProposalsRegistering().send({from: this.state.account});
                break;
            case '2':
                object = await contract.methods.startVotingSession().send({from: this.state.account});
                break;
            case '3':
                object = await contract.methods.endVotingSession().send({from: this.state.account});
                break;
            case '4':
                object = await contract.methods.tallyVotes().send({from: this.state.account});
                break;
        }
        
        const newStatus = await object.events.WorkflowStatusChange.returnValues.newStatus;

        this.setState({ 
            label: this.workflowStatus[newStatus],
            status: newStatus,
            next: this.workflowStatus[parseInt(newStatus) + 1],
            contract: contract,
            account: this.state.account
        });

        alert('Workflow en cours : ' + this.workflowStatus[newStatus]);
    }

    render() {
        return (
            <div className="Workflow">
                workflow en cours : {this.state.label}
                <br />
                prochaine étape : {this.state.next}
                <br />
                { (this.state.status < 5 && this.state.isOwner) ?
                    <button type="button" className="btn btn-primary" onClick={this.forward} >Prochaine étape</button> :
                    <div></div>
                }
            </div>  
        );
    }
}

export default Workflow;