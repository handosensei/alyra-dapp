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
        
        this.setState({ 
            label: this.workflowStatus[this.props.status],
            status: this.props.status,
            next: this.workflowStatus[parseInt(this.props.status) + 1],
            contract: contract,
            account: this.props.account,
            isOwner: this.props.isOwner
        });
    }

    forward = async () => {
        const contract = this.state.contract;
        let object;
        switch (this.state.status) {
            case '0':
                object = await contract.methods.startProposalsRegistering().send({from: this.state.account});
                break;
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
        window.location.reload();
    }

    render() {
        return (
            <div className="Workflow">
                <div className="row">
                    <div className="col-12">
                        
                        workflow en cours : {this.state.label}
                        <br />
                        prochaine étape : {this.state.next}
                        <br />
                        { (this.state.status < 5 && this.state.isOwner) ?
                            <button type="button" className="btn btn-primary" onClick={this.forward} >Prochaine étape</button> :
                            <div></div>
                        }
                        
                        
                    </div>  
                </div>  
                
            </div> 
            
        );
    }
}

export default Workflow;
