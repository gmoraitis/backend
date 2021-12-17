// import fetch from 'node-fetch';
const fetch = require('node-fetch');

async function getData() {
    let  response = await fetch('https://cp.fn.sportradar.com/common/en/Etc:UTC/gismo/config_tournaments/1/17');
    let data = await response.json();
    let matches = data.doc[0].data;
    console.log(matches)
    return matches
}

// getData().then(matches => {
//     console.log(matches)  // fetched matches
//   });


module.exports = getData

