
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ResthomeController from './controllers/ResthomeController';


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/resthomes', ResthomeController.index); //index= listagem
routes.get('/resthomes/:id', ResthomeController.show);
routes.post('/resthomes', upload.array('images'), ResthomeController.create); 

export default routes;