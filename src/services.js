const fetch = require('node-fetch');


async function getData() {
    let response = await fetch('https://cp.fn.sportradar.com/common/en/Etc:UTC/gismo/config_tournaments/1/17');
    let data = await response.json();
    let matches = data.doc[0].data;
    const { tournaments, uniquetournaments, cuptrees } = matches;

    console.log('Raw form:', matches, '= is type of', typeof (matches))

    const results = tournaments.reduce((acc, cur) => (
        Object.assign(Object.assign({}, acc),
            { [cur._id]: cur.name })),
        {});

    console.log('Results:', results, '= is type of', typeof (results))


    
    return results
}

getData();

module.exports = getData;

