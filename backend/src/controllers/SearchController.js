const Dev = require('../models/Dev');

function parseStringAsArray(techs){
    return techs.split(',').map(tech => tech.trim());
}

module.exports = {
    async index(req, resp){
        const { latitude, logintude, techs } = req.body;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude, logintude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return resp.json({ devs });
    }
};