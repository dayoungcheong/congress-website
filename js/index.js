let view = {
    position: "country"
};

let stateView = {
    location: ""
};

let eVal = "";


function countryView() {
    map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);
    let appendInfo = document.getElementById("information");
    appendInfo.innerHTML = "";
    let country = document.createElement("h2");
    country.innerHTML = "THE UNITED STATES";
    let desc = document.createElement("p");
    desc.innerHTML = "Click on a state or dot to learn more about our Congress!"
    desc.classList.add("text-center");
    appendInfo.appendChild(country);
    appendInfo.appendChild(desc);
}




let mapcontainer = document.getElementById('mymap');


mapboxgl.accessToken = mapkey;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-96, 40],
    zoom: 3.5
});


let hoveredStateId = null;

mapcontainer.append(map);

map.on('load', function () {

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';

    // set map bounds to the continental US
    view.position = "country";
    countryView();

   

    map.addSource("states", {
        "type": "geojson",
        "data": "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    });

    map.addSource("congress", {
        "type": "geojson",
        "data": legislators
    });

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
    });

    map.addLayer({
        "id": "state-borders",
        "type": "line",
        'source': "states",
        "layout": {},
        "paint": {
            "line-color": "#00ffff",
            "line-width": 2
        }
    });


    map.on("mousemove", "state-fills", function (e) {
        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: false });
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: true });
        }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on("mouseleave", "state-fills", function () {
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

    map.on('click', 'legislators', function (e) {

        view.position = "person";
        map.flyTo({
            center: [e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1]],
            zoom: 7
        })

        let appendInfo = document.getElementById("information");
        appendInfo.innerHTML = "";

        let memID = e.features[0].properties.bioguide_id;
        let name = document.createElement("h2");
        name.innerHTML = e.features[0].properties.name;
        appendInfo.appendChild(name);
        let imgdiv = document.createElement("div");
        imgdiv.classList.add("image-container");
        let img = document.createElement("img");
        img.src = "https://theunitedstates.io/images/congress/225x275/" + memID + ".jpg";
        img.alt = "official portrait of " + e.features[0].properties.name;
        img.classList.add("centerimg");
        imgdiv.appendChild(img);

        appendInfo.appendChild(imgdiv);
        let description = document.createElement("p");
        description.classList.add("text-center");
        description.innerHTML = (e.features[0].properties.name + " is a " + e.features[0].properties.party + " " + e.features[0].properties.type + " from " + e.features[0].properties.stateName + " with an end term date of " + e.features[0].properties.end);
        appendInfo.appendChild(description);


        let URL = "https://api.propublica.org/congress/v1/members/" + memID + "/votes.json";

        togglerSpinner();
        fetch(URL, {
            headers: {
                Accept: 'application/json',
                'X-API-KEY': prokey
            }
        }).then(function (response) {
            return (response.json());
        }).then(function (body) {
            let h2 = document.createElement("h2");
            h2.innerHTML = "Recent Votes";

            let ul = document.createElement("ul");
            appendInfo.appendChild(h2);
            appendInfo.appendChild(ul);

            for (let i = 0; i < body.results[0].votes.length; i++) {
                let title = (body.results[0].votes[i].bill.title);
                let desc = (body.results[0].votes[i].description);
                let pos = (body.results[0].votes[i].position).toUpperCase()
                let question = (body.results[0].votes[i].question);
                let result = (body.results[0].votes[i].result).toUpperCase();

                pos = (pos == "YES") ? pos.fontcolor("#00ff00") : pos.fontcolor("red");
                result = (result == "PASSED") ? result.fontcolor("#00ff00") : result.fontcolor("red");

                let liItem = document.createElement("li");
                liItem.innerHTML = (body.results[0].votes[i].date + ": result: " + result + " --  Voted " + pos + " " + question + " for " + title + " " + desc + ".")
                ul.appendChild(liItem);

            }
        }).then(function() {
            togglerSpinner();
        }).catch(function(error){
            renderError(error);
        });
    });
});




function onMapClick(e) {
    let features = map.queryRenderedFeatures(e.point);
    let arrOfStates = Object.values(stateFullName);
    if (arrOfStates.indexOf(features[0].properties.name) > -1) {
        currState = features[0].properties.name;

        view.position = "state";
        stateView.location = currState;
        map.flyTo({
            center: stateCenters[currState],
            zoom: 5
        })

        let appendInfo = document.getElementById("information");
        appendInfo.innerHTML = "";

        let state = document.createElement("h2");
        state.innerHTML = currState.toUpperCase();
        let desc = document.createElement("p");
        desc.innerHTML = "Click on each congressperson to go to their personal website and learn more information about them!"
        desc.classList.add("text-center");
        appendInfo.appendChild(state);
        appendInfo.appendChild(desc);

        let listdiv = document.createElement("div");
        listdiv.classList.add("list");
        appendInfo.appendChild(listdiv);


        let statelist = legislators.features.filter(function (features) {
            return features.properties.stateName == currState;
        });

        let senlist = statelist.filter(function (people) {
            return people.properties.type == "senator";
        });

        let replist = statelist.filter(function (people) {
            return people.properties.type == "representative";
        });

        let dellist = statelist.filter(function (people) {
            return people.properties.type == "delegate";
        });

        let rclist = statelist.filter(function (people) {
            return people.properties.type == "Resident Commissioner";
        });

        if (senlist.length > 0) {
            let section = document.createElement("section");
            let header = document.createElement("h3");
            header.innerHTML = "Senators"
            let ul = document.createElement("ul");
            for (let i = 0; i < senlist.length; i++) {
                let li = document.createElement("li");
                let link = document.createElement("a");
                link.classList.add("p-link");
                link.href = senlist[i].properties.url;
                link.innerHTML = senlist[i].properties.name;
                li.appendChild(link);
                li.classList = (senlist[i].properties.party == "Democrat") ? "D" : (senlist[i].properties.party == "Republican") ? "R" : "O";
                ul.appendChild(li);
            }
            section.appendChild(header);
            section.appendChild(ul);
            listdiv.appendChild(section);

        }
        if (replist.length > 0) {

            let section = document.createElement("section");
            let header = document.createElement("h3");
            header.innerHTML = "Representatives"
            let ul = document.createElement("ul");
            for (let i = 0; i < replist.length; i++) {
                let li = document.createElement("li");
                let link = document.createElement("a");
                link.classList.add("p-link");
                link.href = replist[i].properties.url;
                link.innerHTML = replist[i].properties.name;
                li.appendChild(link);
                li.classList = (replist[i].properties.party == "Democrat") ? "D" : (replist[i].properties.party == "Republican") ? "R" : "O";
                ul.appendChild(li);
            }
            section.appendChild(header);
            section.appendChild(ul);
            listdiv.appendChild(section);

        }
        if (dellist.length > 0) {

            let section = document.createElement("section");
            let header = document.createElement("h3");
            header.innerHTML = "Delegates"
            let ul = document.createElement("ul");
            for (let i = 0; i < dellist.length; i++) {
                let li = document.createElement("li");
                let link = document.createElement("a");
                link.classList.add("p-link");
                link.href = dellist[i].properties.url;
                link.innerHTML = dellist[i].properties.name;
                li.appendChild(link);
                li.classList = (dellist[i].properties.party == "Democrat") ? "D" : (dellist[i].properties.party == "Republican") ? "R" : "O";
                ul.appendChild(li);
            }
            section.appendChild(header);
            section.appendChild(ul);
            listdiv.appendChild(section);

        }
        if (rclist.length > 0) {

            let section = document.createElement("section");
            let header = document.createElement("h3");
            header.innerHTML = "Resident Commisioner"
            let ul = document.createElement("ul");
            for (let i = 0; i < rclist.length; i++) {
                let li = document.createElement("li");
                let link = document.createElement("a");
                link.classList.add("p-link");
                link.href = rclist[i].properties.url;
                link.innerHTML = rclist[i].properties.name;
                li.appendChild(link);
                li.classList = (rclist[i].properties.party == "Democrat") ? "D" : (rclist[i].properties.party == "Republican") ? "R" : "O";
                ul.appendChild(li);
            }
            section.appendChild(header);
            section.appendChild(ul);
            listdiv.appendChild(section);

        }

    } else {
        view.position = "country";
        countryView();
    }
}

map.on('click', function (e) {
    eVal = e;
    onMapClick(eVal); 
 });


let homeButton = document.getElementById("home-button");
homeButton.addEventListener('click', function() {
    view.position = "country";
    countryView();
});

let navButton = document.createElement("button");
navButton.type = "button";
navButton.id = "navButton";
navButton.classList = "btn btn-light";
let leftArrow = document.createElement("i");
leftArrow.classList = "fas fa-arrow-left";
leftArrow.setAttribute("aria-hidden", true);
navButton.innerHTML = "Back ";
navButton.appendChild(leftArrow);
let wrap = document.getElementById("buttons");
wrap.appendChild(navButton);


navButton.addEventListener('click', function() {
    if(stateView.location === "country" || stateView.location === "state") {
        view.position = "country";
        countryView();
    } else {
        view.position = "state";
        onMapClick(eVal); 
    }
});


