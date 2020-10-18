import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import resthomeView from '../views/resthome_view';
import * as Yup from 'yup';


import Resthome from '../models/Resthome';

export default {
    async index(req:Request, res:Response){
        const resthomesRepository = getRepository(Resthome);

        const resthomes =  await resthomesRepository.find({
            relations: ['images']
        });

        return res.json(resthomeView.renderMany(resthomes));
    },

    async show(req: Request, res: Response){
        const { id } = req.params;

        const resthomesRepository = getRepository(Resthome);

        const resthome =  await resthomesRepository.findOneOrFail(id,{
            relations: ['images']
        });

        return res.json(resthomeView.render(resthome));
    },

    async create(req:Request, res:Response){
        const { 
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
        
    
        const resthomesRepository = getRepository(Resthome);

        const requestImages = req.files as Express.Multer.File[]; // específica p/ o cód que isso é um array de arquivos do Multer
        const images = requestImages.map(image => {
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };
        //esquema de validação da resthome
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            })
          )
        });

        await schema.validate(data, {
            abortEarly: false, // se ele encontrar um erro ele já retorna antecipadamente qual(quais) o(s) campo(s) não está(estão) válido(s)
        })

        const resthome = resthomesRepository.create(data);
    
        //salva no banco
        await resthomesRepository.save(resthome);
    
        return res.status(201).json(resthome);
    }
};