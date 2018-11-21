let stateFullName = { "AL": "Alabama", "AK": "Alaska", "AS": "American Samoa", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FM": "Federated States Of Micronesia", "FL": "Florida", "GA": "Georgia", "GU": "Guam", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MH": "Marshall Islands", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "MP": "Northern Mariana Islands", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VI": "Virgin Islands", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }

let legislators = {
    "type": "FeatureCollection",
    "features": []
}

fetch("https://theunitedstates.io/congress-legislators/legislators-current.json").then(function (reply) {
    return (reply.json());
}).then(function(content) {
    let arr = [];
    for (let j = 0; j < 534; j++) {
        arr.push(content[j].id["bioguide"])
    }

    fetch("https://theunitedstates.io/congress-legislators/legislators-district-offices.json").then(function (response) {
        return (response.json());
    }).then(function (body) {
        for (let i = 0; i < 533; i++) {
            let id = body[i].id["bioguide"];
            let lat = 0;
            let long = 0;
            if (body[i].offices[0]["latitude"]) {
                lat = body[i].offices[0]["latitude"];
                long = body[i].offices[0]["longitude"];
            } else if (id === "W000810") {
                lat = 33.952220;
                long = -83.994340;
            } else if (id === "G000582") {
                lat = 18.465540;
                long = -66.105736;
            } else if (id === "N000184") {
                lat = 44.0816004;
                long = -103.2614256;
            } else if (id === "S001177") {
                lat = 15.156980;
                long = 145.705040;
            }

            let index = arr.indexOf(id);

            let name = content[index].name["official_full"];
            let type = content[index].terms[content[index].terms.length - 1]["type"];
            let stateabb = content[index].terms[content[index].terms.length - 1]["state"];
            let stateName = stateFullName[stateabb];
            if (stateabb === "AS" || stateabb === "DC" || stateabb === "MP" || stateabb === "VI" || stateabb === "GU") {
                type = "delegate"
            } else if (stateabb === "PR") {
                type = "Resident Commissioner"
            }
            let party = content[index].terms[content[index].terms.length - 1]["party"];
            let end = content[index].terms[content[index].terms.length - 1]["end"];
            let url = content[index].terms[content[index].terms.length - 1]["url"];



            let obj = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [long, lat]
                },
                "properties": {
                    "name": name,
                    "bioguide_id": id,
                    "type": (type === "rep") ? "representative" : (type === "sen") ? "senator" : (type === "delegate") ? "delegate" : "Resident Commissioner",
                    "party": party,
                    "end": end,
                    "stateabb": stateabb,
                    "stateName": stateName,
                    "url": url,
                    "color": (party === "Democrat") ? "#0033cc" : (party === "Republican") ? "#ff0000" : "#ffffff"
                }
            }
            legislators.features.push(obj);
        }

    })
    // .catch(function(error){
    //     renderError(error);
    // });

})
// .catch(function(error){
//     renderError(error);
// });

export { legislators };
