import multer from 'multer';
import path from 'path';

export default {
    //salva as imgs no disco
    storage: multer.diskStorage({
        //local onde ficará os arquivos quando fizer o upload
        destination: path.join(__dirname, '..', '..', 'uploads'),
        //coloca um novo nome nos arquivos
        filename:(req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;

            cb(null, filename);
        },
    }) 
};