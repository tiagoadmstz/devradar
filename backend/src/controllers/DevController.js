const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
    async index(req, resp) {
        const devs = await Dev.find();

        return resp.json(devs);
    },

    async store(req, resp) {
        const { github_username, techs, latitude, longitude } = req.body;
    
        let dev = Dev.findOne({ github_username });

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio } = response.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        return resp.json(dev);
    },

    async update(){

    },

    async destroy(){

    },
};