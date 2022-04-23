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
            next: this.workflowStatus[parseInt(status) + 1],
        });
    }

    render() {
        return (
            <div>
                workflow en cours : {this.state.label}
                <br />
                prochaine étape : {this.state.next}
                <br />
                <button type="button" class="btn btn-primary">Prochaine étape</button>
            </div>  
        );
    }
}

export default Workflow;