import React, { Component } from "react";

class Step3 extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            status: props.status,
            contract: props.contract,
            account: props.account,
            nbProposals: 0,
            htmlProposals: null,
            proposalSelected: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = async () => {
        const contract = this.state.contract;
        const nbProposals = await contract.methods.getNbProposals().call();
        const proposals = await contract.methods.getProposals().call();

        console.log(proposals);
        
        var htmlProposals = '';
        for (let i = 0; i < nbProposals; i++) {
            htmlProposals += '<option value="' + i + '">"' +proposals[i].description+ '</option>';
        }
        
        this.state = {
            status: this.props.status,
            contract: this.props.contract,
            account: this.props.account,
            nbProposals: nbProposals,
            htmlProposals: htmlProposals,
            proposalSelected: '',
        };        
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            status: this.props.status,
            contract: this.props.contract,
            account: this.props.account,
            proposalSelected: e.target.value,
            proposals: this.props.proposals,
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-6 offset-md-3 justify-content-start">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="mb-3">
                                <label>Proposals</label>
                                <select className="form-control " id="proposal" value={this.state.proposalSelected} onChange={this.handleChange}>
                                    <option value=''>---Sélectionnez une proposal---</option>
                                    {this.state.htmlProposals}
                                </select>
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

export default Step3;
