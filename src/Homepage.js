import React, { Component } from 'react';
// import { Container, Row, Col } from 'reactstrap';
import './Homepage.css';

export class Homepage extends Component {
    render() {
        return (
        <div>
            <header>
            <div className="jumbotron jumbotron-fluid gradient-header">
                <div className="container">
                    <div className="header-text">
                        <h1 className="display-6" id="change">Stage 1:HTML/CSS</h1>
                        <p id="change">A guide on America's Congresspeople</p>
                    </div>
                </div>
            </div>
            </header>

            <main>
            <section>
                <h2>Topic Overview</h2>
                <p>
                    Everyone knows that voting is important. We’ve all heard the
                    saying that every single vote matters. Nevertheless, when I
                    ask my friends whether they have voted or not, most of them
                    will say no. Most of the time, it is either because they were
                    unaware of an election, <a className="p-link" href="https://www.npr.org/2018/09/10/645223716/on-the-sidelines-of-democracy-exploring-why-so-many-americans-dont-vote">do
                        not know how to vote, or have no idea who to vote for.</a>
                    Only an estimated <a className="p-link" href="https://www.pbs.org/newshour/politics/voter-turnout-2016-elections">
                        58% of eligible voters voted for the 2016 presidential election</a>,
                    and generally, much less come out for local elections. Many people
                    believe that local or midterm elections are much less important
                    than the presidential election but this is simply not true.
                </p>
                <p>
    
                    Midterm elections occur in the middle of a president’s 4 year
                    term. That means that this November, Americans will be able
                    to vote for their state’s congress representatives. 435 seats
                    in the House of Representatives and 35 seats in the Senate
                    will be contested, meaning a total of <a className="p-link" href="https://en.wikipedia.org/wiki/United_States_elections,_2018">
                        470 congress seats will be up for grabs</a>. It does not matter
                    which political party has the most support, as the party with the
                    most voters will see the majority in Congress for the next 4 years.
                </p>
                <p>
                    With midterm elections coming up, I think there is a large
                    need to encourage people to vote as it is a historical trend
                    that these elections have a much lower turnout than
                    presidential elections. All of the data for this stage comes from
                    <cite><a className="p-link" href="https://github.com/unitedstates">here.</a></cite>
    
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
                <h2>My Application</h2>
                <p>
                    The idea behind my application is to educate and encourage people to vote, regardless of which
                    political party they stand for. I believe that our democracy works much better when everyone votes, as
                    our government officials should represent what the people want.
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
                <h2>Future Implementations</h2>
                <ul className="list">
                    <li className="list-item">
                        In the future, I hope to add a page which organizes information about voting in each area. This
                        page would give information about the deadlines of the last day to register, or the last day to
                        vote for any election. It could also show where people can go to vote or drop off their ballots.
                    </li>
                    <li className="list-item">
                        A different page could show information about the different political events users could attend to
                        learn more about a specific issue, political party, or candidate. This could include anything from
                        small club meetings to large canvassing events.
                    </li>
                </ul>
            </section>

            <section>
                <a className="redirect-top-link" href="">Back to Top</a>
            </section>
            </main>
        </div>
        );
    }
}