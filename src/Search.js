import React, { Component } from 'react';
import './Homepage.css';

export class Search extends Component {
    constructor() {
        super();
        this.state = {value: ''};
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
      }
    
      change(event) {
        this.setState({value: event.target.value});
      }
    
      submit(event) {
        this.setState({ value: '' });
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

    render() {
        return (
            <div className='body'>
            <header>
                <div className="jumbotron jumbotron-fluid gradient-header">
                    <div className="container">
                        <div className="header-text">
                            <h1 className="display-6">Contact Local Congress People Near You</h1>
                            <p>
                                In this section, you are able to type in the state you currently live in
                                to get a result of all congress people in your state. Additionally, the list
                                of congress people in the table below will show the congress people's twitter,
                                phone number, and email for you to communicate with the people to complain! :)
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main id="search-main">
                <form onSubmit={this.submit} className='submit-button'>
                    <input type="text" placeholder='State' className='state-placeholder' value={this.state.value} onChange={this.change} />
                    <button type="submit" value="Submit" disabled={!this.state.value} onClick={this.submit}>Submit</button>
                </form>
                <br></br><br></br>
            </main>

            </div>
        );
    }
}