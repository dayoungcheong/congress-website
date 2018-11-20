import React, { Component } from 'react';
// import { Container, Row, Col } from 'reactstrap';
import './Homepage.css';

export class Homepage extends Component {
    render() {
        return (
        <div className='body'>

            <header>
            <div className="jumbotron jumbotron-fluid gradient-header">
                <div className="container">
                    <div className="header-text">
                        <h1 className="display-6" id="change">A Guide To America's Congress People</h1>
                        <p id="change">Learn more about representatives around your area so you can make a difference in your community!</p>
                    </div>
                </div>
            </div>
            </header>

            <main>
            <section>
                <h2>Importance of Voter Turn Out</h2>
                <p>
                    Everyone knows that voting is important. We’ve all heard the
                    saying that every single vote matters. Nevertheless, when we
                    ask friends and family whether they have voted or not, most of them
                    will say no. Most of the time, it is either because they were
                    unaware of an election, <a className="p-link" href="https://www.npr.org/2018/09/10/645223716/on-the-sidelines-of-democracy-exploring-why-so-many-americans-dont-vote">do
                        not know how to vote, or have no idea who to vote for. </a>
                    Only an estimated <a className="p-link" href="https://www.pbs.org/newshour/politics/voter-turnout-2016-elections">
                        58%</a> of eligible voters voted for the 2016 presidential election,
                    and generally, much less come out for local elections. Many people
                    believe that local or midterm elections are much less important
                    than the presidential election but this is simply not true.
                </p>
                <p>
    
                    Midterm elections occur in the middle of a president’s 4 year
                    term. That means that in November, Americans will be able
                    to vote for their state’s congress representatives. 435 seats
                    in the House of Representatives and 35 seats in the Senate
                    will be contested, meaning a total of <a className="p-link" href="https://en.wikipedia.org/wiki/United_States_elections,_2018">
                        470 congress seats will be up for grabs</a>. It does not matter
                    which political party has the most support, as the party with the
                    most voters will see the majority in Congress for the next 4 years.
                </p>
                <p>
                    Midterm elections are important in many way, however not many people see it in that way.
                    This results in a large need to encourage people to vote as historical data shows
                    these elections have a much lower voter turnout than presidential elections. 
                    All of the data for this stage comes from <cite><a className="p-link" href="https://github.com/unitedstates"> here.</a></cite>
    
                </p>
                <div className="row">
                    <div className="column">
                        <img src="data/flag.jpg" className="img-fluid" alt="Congresspeople in the Capitol Building"></img>
                    </div>
                    <div className="column">
                        <img src="data/fist.jpg" className="img-fluid" alt="Hands reaching for democracy sign"></img>
                    </div>
                </div>
            </section>

            <section>
                <h2>Importance of Knowing Who Your Representatives Are</h2>
                <p>
                    It is extremely important to educate and encourage people to vote, regardless of which
                    political party they stand for. In order to uphold Democractic values and perform civic duty, we the people
                    need to understand who our government representatives and what they stand for so the elected officials represent
                    and can uphold our individual values.
                </p>
                <p>
                    My web application has a page which will later include an interactive map which users can look at to
                    find their current congress representatives. Each representative will have additional information shown
                    about them, including their political party, their past votes/endorsements, and their sponsors. This
                    information will be laid out in a way for users to understand the basics of who their representatives
                    are and what they stand for. This will hopefully allow users to gain the needed knowledge and
                    confidence to vote.
                </p>
            </section>

            <section>
                <h2>What You Can Do On This Website</h2>
                <ul className="list">
                    <li className="list-item">
                        The <b>Congress</b> page includes an interactive map which users can look at and drill down into to find their
                        current congress representatives by state. Each representative has additional information shown
                        about them, including their political party, their past votes/endorsements, and their sponsors. This
                        information will be laid out in a way for users to understand the basics of who their representatives
                        are and what they stand for.
                    </li>
                    <li className="list-item">
                        The <b>Contact</b> page allows the user to input their current state to learn more about how to contact representatives
                        of their residing state. This allows for increased communication with the representative so if the congress person 
                        has been defending bills that the user disagrees with, the user can contact the rep's team or the rep directly to complain!
                    </li>
                </ul>
            </section>

            <section>
                <a className="redirect-top-link" href=".navbar">Back to Top</a>
            </section>
            </main>
            
        </div>
        );
    }
}