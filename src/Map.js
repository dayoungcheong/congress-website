// import React, { Component } from 'react';
// import mapboxgl from 'mapbox-gl'

// mapboxgl.accessToken = 'pk.eyJ1IjoiZGF5b3VuZ2NoZW9uZyIsImEiOiJjam81dGJ5YjUwMHlzM3FxNWY1ZzZ1c2N1In0.I9E1kpz0Kdi4qCiS5yJ4zA';

// class Map extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: -96,
//       lat: 40,
//       zoom: 3.5
//     };
//   }

//   componentDidMount() {
//     const { lng, lat, zoom } = this.state;

//     const map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: 'mapbox://styles/mapbox/streets-v9',
//       center: [lng, lat],
//       zoom
//     });




//     map.on('move', () => {
//       const { lng, lat } = map.getCenter();

//       this.setState({
//         lng: lng.toFixed(4),
//         lat: lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2)
//       });
//     });
//   }

//   render() {
//     const { lng, lat, zoom } = this.state;

//     return (
//       <div id="map">
//         <div >
//           <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
//         </div>
//         <div ref={el => this.mapContainer = el}  />
//       </div>
//     );
//   }
// }


// export default Map;



import { legislators } from "./data/legislators"
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      renderInfo: "",
      lng: -96,
      lat: 40,
      zoom: 3.5,
      hoveredStateID: null
    };
  }


  // countryView() {
  //       this.setState({
  //       lng: 96,
  //       lat: 40,
  //       zoom: 3.5
  //     });

  //   this.state.renderInfo = 
  //   <div>
  //     <h2>THE UNITED STATES</h2>
  //     <p className="text-center">Click on a state or dot to learn more about our Congress!</p>
  //   </div>
  //   }


  componentDidMount() {
    // this.countryView();


    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF5b3VuZ2NoZW9uZyIsImEiOiJjam81dGJ5YjUwMHlzM3FxNWY1ZzZ1c2N1In0.I9E1kpz0Kdi4qCiS5yJ4zA';
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('load', () => {
      map.getCanvas().style.cursor = 'default';

      map.addSource("states", {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
      }); // end source

      map.addSource("congress", {
        "type": "geojson",
        "data": legislators
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
        if (this.state) {
          if (e.features.length > 0) {
            console.log(this.state);
            if (this.state.hoveredStateId) {
              map.setFeatureState({ source: 'states', id: this.state.hoveredStateId }, { hover: false });
            }
            this.setState({
              hoveredStateId: e.features[0].id
            });
            map.setFeatureState({ source: 'states', id: this.state.hoveredStateId }, { hover: true });
          }
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on("mouseleave", "state-fills", () => {
        console.log('Mouse off')
        if (this.state) {
          if (this.state.hoveredStateId) {
            map.setFeatureState({ source: 'states', id: this.state.hoveredStateId }, { hover: false });
          }
          this.setState({
            hoveredStateId: null
          });
        }
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


    }) // end load


  } // end of mount


  render() {

    const { renderInfo, lng, lat, zoom, hoveredStateID } = this.state;
    return (
      <div id="map">

        <div ref={el => this.mapContainer = el} />
      </div>
    );
  }


} // end of component

export default Map;
