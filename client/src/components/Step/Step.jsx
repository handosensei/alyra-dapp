import React, { Component } from "react";

class Step extends Component 
{
    state = { 
        status: null,
        contract: null,
    };

    componentDidMount = async () => {
        const contract = this.props.contract;
        const status = this.props.status;
        this.setState({
            status: this.props.status,
            contract: this.props.contract,
        });
    }
    
    render() {
        return (
            <div>fdsqfdqs</div>
        );
    }
}

export default Step;