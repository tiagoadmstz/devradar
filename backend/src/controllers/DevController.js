const axios = require('axios');
const Dev = require('../models/Dev');

function mountLocation(latitude, longitude){
    return {
        type: 'Point',
        coordinates: [latitude, longitude]
    };
}

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        let dev = await Dev.findOne({ github_username });
        
        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs,
                location: mountLocation(latitude, longitude),
            });
        }
        return res.json(dev);
    },

    async update(req, res){
        const { github_username, techs, latitude, longitude } = req.body;
            const dev = await Dev.findOneAndUpdate({ github_username },
                { $set: {
                    techs,
                    location: mountLocation(latitude, longitude),
                    }
                },
                (err, raw) => {
                    if(err) return res.status(400).json({ err })
                }
            );
        return !dev ? res.status(404).json({}) : res.json(dev);
    },

    async destroy(req, res){
        const id = req.params.id;
        const dev = await Dev.findByIdAndDelete(id, (err, resp) => {
            if(err) return resp.status(400).json({ err });
        });
        return dev ? res.status(204).json() : res.status(404).json();
    }
};