import React, { Component } from 'react';
// import { Container, Row, Col } from 'reactstrap';
import './Homepage.css';

export class Congress extends Component {
    render() {
        return (
            <div>
            <header>
                <div class="jumbotron jumbotron-fluid gradient-header">
                    <div class="container">
                        <div class="header-text">
                            <h1 class="display-6">Choosing your Congressperson</h1>
                            <p>In order to get information about your congressperson, click on your state. Afterwards, you can
                                click on the dot representing your congress representative, or choose their name from the list
                                below to go to their personal site. To go back to your past selection, click on the button
                                that says "back". If you ever want to go to the original home view, click on the button that says "home" 
                                or click on water on the map. The dots represent all congresspeople, INCLUDING the
                                6 non-voting delegates from different U.S. territories.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main id="congress-page-main">
                <i class="d-none fa fa-spinner fa-spin" aria-hidden="true" id="spinner"></i> 
                <div class="wrapper">
                <div id='map'></div>
                <div id="buttons">
                <button type="button" class="btn btn-light" id="home-button">Home <i class="fas fa-home" aria-label="home"></i></button>
                </div>
                </div>

                <script id='mymap'></script>
                <section id="information"></section>
            </main>
            </div>
        );
    }
}