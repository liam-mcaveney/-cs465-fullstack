var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET travel view */
const travel = (req, res) => {
    res.redner('travel',{ title: 'Tarvlr Getaways', trips});
};

module.exports = {
    travel
};