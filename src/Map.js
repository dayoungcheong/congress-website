import { stateFullName, legislatorsData } from "./data/legislators"
import { stateCenters } from "./data/stateCenters"
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: "country",
      state: null,
      person: null
    };
  }


  componentDidMount() {
    let hoveredStateId = null;
    legislatorsData(this.setState.bind(this));

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF5b3VuZ2NoZW9uZyIsImEiOiJjam81dGJ5YjUwMHlzM3FxNWY1ZzZ1c2N1In0.I9E1kpz0Kdi4qCiS5yJ4zA';
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-96, 40],
      zoom: 3.5
    });

    map.on('load', () => {
      map.getCanvas().style.cursor = 'default';

      map.addSource("states", {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
      }); // end source

      map.addSource("congress", {
        "type": "geojson",
        "data": this.state.legislatorsData
      }); // end source

      map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': "states",
        'layout': {},
        'paint': {
          'fill-color': '#00ffff',
          'fill-opacity': ["case",
            ["boolean", ["feature-state", "hover"], false],
            0.5,
            0
          ]
        }
      }); // end layer

      map.addLayer({
        "id": "state-borders",
        "type": "line",
        'source': "states",
        "layout": {},
        "paint": {
          "line-color": "#00ffff",
          "line-width": 2
        }
      }); // end layer

      map.on("mousemove", "state-fills", (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: false });
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: true });
        }
      });

      map.on("mouseleave", "state-fills", () => {
        if (hoveredStateId) {
          map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = null;
      });

      map.addLayer({
        "id": "legislators",
        "type": "circle",
        "source": "congress",
        "paint": {
          "circle-radius": 6,
          "circle-color": ['get', 'color'],
          'circle-stroke-color': '#000000',
          'circle-stroke-width': 2
        }
      });

      let locationView = null;
      let stateView = null;
      let personView = null;


      map.on('click', (e) => {
        let features = map.queryRenderedFeatures(e.point);
        let arrOfStates = Object.values(stateFullName);
        let currState = "";


        if (arrOfStates.indexOf(features[0].properties.name) > -1) {
          currState = features[0].properties.name;
          map.flyTo({
            center: stateCenters[currState],
            zoom: 5
          });
          locationView = "state";
          stateView = currState;
          personView = null;



        } else if (features[0].layer.id == "legislators") {
          let memID = features[0].properties.bioguide_id;
          let img = "https://theunitedstates.io/images/congress/225x275/" + memID + ".jpg";
          let URL = "https://api.propublica.org/congress/v1/members/" + memID + "/votes.json";


          fetch(URL, {
            headers: {
              Accept: 'application/json',
              'X-API-KEY': "dC1mwkwTSpo6pFWhibDwiCYLcG3WP0xj1yIzuuG2"
            }
          }).then(response => response.json())
            .then(body => personView = { id: features[0].properties.bioguide_id, name: features[0].properties.name, party: features[0].properties.party, type: features[0].properties.type, state: features[0].properties.stateName, end: features[0].properties.end, img: img, votes: body.results[0].votes }
            ).then(() => this.setState({
              person: personView
            }));

          map.flyTo({
            center: [features[0].geometry.coordinates[0], features[0].geometry.coordinates[1]],
            zoom: 7
          });


          locationView = "person";
          stateView = null;



        } else {
          map.flyTo({
            center: { lng: -96, lat: 40 },
            zoom: 3.5
          });

          locationView = "country";
          stateView = null;
          personView = null;
        }
        this.setState({
          view: locationView,
          state: stateView,
          person: personView
        });


      }); // end click


    }); // end load


  } // end of mount



  render() {
    let info;
    if (this.state.person) {

      info = <> <h2>{this.state.person.name}</h2>
        <img alt={"official portrait of " + this.state.person.name} className="centerimg" src={this.state.person.img} />
        <p className="text-center">{this.state.person.name} is a {this.state.person.party} {this.state.person.type} from {this.state.person.state} with an end term date of {this.state.person.end}</p>
        <VoteList items={this.state.person.votes} /> </>


    } else if (this.state.view === "state") {

      let stateList = this.state.legislatorsData.features.filter(features => {
        return features.properties.stateName === this.state.state
      });
      let obj = {};
      for (let i = 0; i < stateList.length; i++) {
        if (!obj[stateList[i].properties.type]) {
          obj[stateList[i].properties.type] = 1
        }
      }

      info = [];
      for (let key in obj) {
        let propObj = stateList.filter((it) => {
          return it.properties.type === key
        })
        info.push(<StateList items={propObj} type={key}/>);
      };
    } else {
      info = <><h2>THE UNITED STATES</h2>
      <p className="text-center">Click on a state or dot to learn more about our Congress!</p> </>
    }

    return (
      <>
        <div id="map">
          <div ref={el => this.mapContainer = el} />
        </div>
        <div>
          {info}
        </div>
        </>

    );
  }


} // end of component

class VoteListItem extends Component {
  render() {
    let item = this.props.item
    let result = item.result;
    // result = (result == "PASSED") ? result.fontcolor("#00ff00") : result.fontcolor("red");
    let pos = item.position;
    // pos = (pos == "YES") ? pos.fontcolor("#00ff00") : pos.fontcolor("red");
    return (
      <li>
        {item.date}: result: {result} -- Voted {pos} {item.question} for {item.bill.title} {item.description}.
        </li>
    );
  }
}

class VoteList extends Component {
  render() {

    let items = this.props.items
    let printItems = items.map((item, index) =>
      <VoteListItem key={index} item={item} />
    )
    return (
      <ul>
        {printItems}
      </ul>
    );
  }
}



class StateListItem extends Component {
  render() {
    let item = this.props.item
    let cl = (item.properties.party === "Democrat")? "D" :(item.properties.party === "Republican") ? "R" : "O";

    return (
      <li className={cl}><a className="p=link" href={item.properties.url}>{item.properties.name}</a></li>
    );
  }
}

class StateList extends Component {
  render() {

    let items = this.props.items
    items = items.map((item, index) =>
      <StateListItem key={index} item={item} />
    )

    return (
      <>
      <h2>{this.props.type.toUpperCase()}</h2>
      <ul className="text-center">
        {items}
      </ul>
      </>
    );
  }
}

export default Map;
