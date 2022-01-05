
const fetch = require('node-fetch');

// Getting Data
const getTournaments = async () => {
    const url = 'https://cp.fn.sportradar.com/common/en/Etc:UTC/gismo/config_tournaments/1/17';
    const tournamentsResponse = await fetch(url);
    const tournamentsJson = await tournamentsResponse.json();
    
    return tournamentsJson.doc[0].data;
};

// Using the Names and Ids
const tournamentNamesAndIds = async (data) => {

    const tournamentNamesAndIds  = {};

    for (const tournament of data['tournaments'])
    tournamentNamesAndIds[Number(tournament['_id'])] = tournament['name'];

    for (const id of Object.keys(data['uniquetournaments']))
    tournamentNamesAndIds[Number(id)] = data['uniquetournaments'][id]['name'];

    return tournamentNamesAndIds ;
};

// Getting the specific results using the id's
const tournamentsData = async (tournamentNamesAndIds) => {
   
    const dataOfTournaments = {};
    
    const url = (id) => `https://cp.fn.sportradar.com/common/en/Etc:UTC/gismo/fixtures_tournament/${id}/2021`;
   
    for (const id of Object.keys(tournamentNamesAndIds)) {
        const tournamentsDataResponse = await fetch(url(id));
        const tournamentsDataJson = await tournamentsDataResponse.json();
        dataOfTournaments[id] = {
            'name': tournamentNamesAndIds[id],
            'data': tournamentsDataJson
        }
    }

    return dataOfTournaments
};

// Build the new list with the last 5 sorted results
const matchesData = async (dataOfTournaments) => {
   
    dataOfMatches = [];
   
    for (const id of Object.keys(dataOfTournaments)) {
        const matches = dataOfTournaments[id]['data']['doc']['0']['data']['matches'];
        for (const match of Object.values(matches)) {
            dataOfMatches.push({
                'mid': match['_id'],
                'uts': match['time']['uts'],
                'date': match['time']['date'],
                'time': match['time']['time'],
                'homeTeam': match['teams']['home']['name'],
                'awayTeam': match['teams']['away']['name'],
                'homeScore': match['result']['home'],
                'awayScore': match['result']['away'],
                'events': match['comment']
            });
        }
    }
    dataOfMatches.sort((data1, data2) => data2['uts'] - data1['uts'])

    return dataOfMatches.slice(0, 5)
};

// Connecting the functions into one main
async function manipulateData() {
    const tournaments = getTournaments();
    const namesAndIds = tournaments.then(data => tournamentNamesAndIds(data));
    const allTournamentsData = namesAndIds.then(data => tournamentsData(data));
    const allMatchesData = allTournamentsData.then(data => matchesData(data));
    
    return allMatchesData
}

module.exports = manipulateData;

