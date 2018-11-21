import React, { Component } from 'react';
import * as d3 from 'd3';
import { Card, CardBody, CardTitle, CardText, Col } from 'reactstrap';
import './Homepage.css';

export class Search extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            data: [],
            reps: false
        }
        this.change = this.change.bind(this);
        // this.submit = this.submit.bind(this); UNCOMMENT THIS TO ADD THE SUBMIT BUTTON
      }

      filterData(currData, chosen) {
          if (currData.stateName == chosen) {
                return true;
            }
      }
    
      change(event) {
        this.setState({value: event.target.value});
      }
    
    //   submit(event) { UNCOMMENT THIS TO ADD THE SUBMIT BUTTON
    //     this.setState({ value: '', reps: true });
    //     // alert('A name was submitted: ' + this.state.value);
    //     event.preventDefault();
    //   }

      componentDidMount() {
        // Load data
        d3.csv('data/CongressRepOfficeData.csv').then(data => {
            this.setState({
                data: data
            })
        })
    }

    render() {
        let repData = d3.nest()
        .key(function(d) { return d.name; })
        .entries(this.state.data);

        let dataToRender =  this.state.data.map(d => this.filterData(d, this.state.value) ?
        <div>
            { <Col key={'name'}>
                <Card className= 'card-item'>
                <CardBody>
                <CardTitle>
                    { d.name }
                </CardTitle>
                    <CardText>
                    { d.officeName }
                    <br></br>
                    { d.officeAddress }
                    </CardText>
                    <p>Phone: {d.phone}</p>
                    <p>Fax: {d.fax}</p>
                </CardBody>
                </Card>
            </Col>
        }
        </div> :
        "");

        // function test() { THIS FUNCTION SHOULD WORK TO ADD THE TEST IF THE USER CLICKED THE SUBMIT BUTTON, BC REPS WILL BE TRUE AFTER THEY SUBMIT AND THIS MEANS TO RENDER THE REPS
        //     if (this.state.reps === true) {
        //         return this.state.data.map(d => this.filterData(d, this.state.value) ?  
        //         <div>
        //         {  
        //             <Col key={'name'}>
        //                 <Card className= 'card-item'>
        //                 <CardBody>
        //                 <CardTitle>
        //                     { d.name }
        //                 </CardTitle>
        //                         <CardText>
        //                         { d.officeName }
        //                         <br></br>
        //                         { d.officeAddress }
        //                         </CardText>
        //                         <p>Phone: {d.phone}</p>
        //                         <p>Fax: {d.fax}</p>
        //                 </CardBody>
        //                 </Card>
        //             </Col>
        //         }
        //         </div> :
        //         "");
        //     } else {
        //         return "";
        //     }
        // }

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
                                of congress people in the table below will show the congress people's phone number, 
                                and office address for you to communicate with the people to complain! :)
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main id="search-main">
                <form onSubmit={this.submit} className='submit-button'>
                    <input type="text" alt='type in your state' placeholder='State' className='state-placeholder' value={this.state.value} onChange={this.change} />
                    {/* <button type="submit" alt='click to submit' value="Submit" disabled={!this.state.value} onClick={this.submit} >Submit</button> UNCOMMENT THIS TO ADD THE SUBMIT BUTTON*/}
                </form>
                <br></br>
                <h3>Search For Who Represents You In Congress</h3>
                <br></br>
                { dataToRender }
            </main>
            </div>
        );
    }
}