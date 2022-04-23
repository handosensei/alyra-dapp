import React, { Component } from "react";

class Workflow extends Component 
{
    workflowStatus = {
        0: 'Inscription des électeurs',
        1: 'Enregistrement des candidats',
        2: 'Fermeture des enregistrements des candidats',
        3: 'Ouverture des votes',
        4: 'Fermeture des votes',
        5: 'Dépouillement des votes'
    };

    componentDidMount = async () => {
        console.log(this.props);
    }

    render() {
        return (<div>workflow</div>);
    }
}

export default Workflow;