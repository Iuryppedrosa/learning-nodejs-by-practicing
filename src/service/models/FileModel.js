import { link } from 'fs';
import mongoose from 'mongoose';
import { type } from 'os';

const FileSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
}, {
    collection: 'BancoQrCodeAPI'
}
);

const FileModel = mongoose.model('File', FileSchema);
export default FileModel;