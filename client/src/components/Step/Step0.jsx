import React, { Component, useRef } from "react";

class Step0 extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            contract: props.contract,
            account: props.account,
            address: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount = async () => {
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit');
        console.log(this.props);
        console.log(this.state);
        
        const contract = this.state.contract;
        
        const object = await contract.methods.addVoter(this.state.address).send({ from: this.state.account });
        const newVoterAddress = await object.events.VoterRegistered.returnValues.voterAddress;
        alert('nouveau voter : ' + newVoterAddress);
        this.setState({
            status: this.props.status,
            contract: this.props.contract,
            address: '',
        });

        window.location.reload();
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            status: this.props.status,
            contract: this.props.contract,
            address: e.target.value,
        });
    }
    
    render() {
        return (
            <div className="row mt-100">
                <div className="col-6 offset-md-3 justify-content-start">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="mb-3">
                                <label>Voter wallet address</label>
                                <input type="text" className="form-control " id="voterWalletAddress" value={this.state.address} onChange={this.handleChange}/>
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

export default Step0;