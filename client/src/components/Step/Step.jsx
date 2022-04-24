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

    form() {
        switch (this.state.status) {
            case '0': return <input type='text' />
                break;

                
        }
    }
    
    render() {
        return (
            
            <form>
                <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                
            </form>
        );
    }
}

export default Step;