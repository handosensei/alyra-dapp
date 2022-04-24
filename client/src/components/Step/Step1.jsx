import React, { Component, useRef } from "react";

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            contract: props.contract,
            account: props.account,
            proposal: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = async () => {
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const contract = this.state.contract;
        const object = await contract.methods.addProposal(this.state.proposal).send({ from: this.state.account });
        const newProposal = await object.events.ProposalRegistered.returnValues.proposalId;

        alert('Proposal numéro ' + newProposal + 'enregistrée');

        this.setState({
            status: this.props.status,
            contract: this.props.contract,
            account: this.props.account,
            proposal: '',
        });

        window.location.reload();
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            status: this.props.status,
            contract: this.props.contract,
            account: this.props.account,
            proposal: e.target.value,
        });
    }
        
    render() {
        return (
            <div className="row">
                <div className="col-6 offset-md-3 justify-content-start">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="mb-3">
                                <label>Proposal</label>
                                <input type="text" className="form-control " id="proposal" value={this.state.proposal} onChange={this.handleChange}/>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

export default Step1;