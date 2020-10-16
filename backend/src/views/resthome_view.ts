import Resthome from '../models/Resthome';
import restHomeView from './images_view';


export default {
    render(resthome: Resthome){
        return{
            id: resthome.id,
            name: resthome.name,
            latitude: resthome.latitude,
            longitude: resthome.longitude,
            about: resthome.about,
            instructions: resthome.instructions,
            opening_hours: resthome.opening_hours,
            open_on_weekends: resthome.open_on_weekends,
            images: restHomeView.renderMany(resthome.images)
        };
    },

    renderMany(resthomes: Resthome[]){
        return resthomes.map(resthome => this.render(resthome));
    }
};