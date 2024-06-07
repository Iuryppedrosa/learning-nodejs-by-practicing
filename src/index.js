import express from 'express';
import {image as qrImage} from 'qr-image';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import FileModel from './service/models/FileModel.js';
import stream from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

mongoose.connect('')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => { 
        console.log('Could not connect to MongoDB', err);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/generate', (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    const qrCodeImage = qrImage(url);
    const imageBuffer = qrCodeImage.pipe(new stream.PassThrough()).read();
    const filePath = path.join(__dirname, '../public/qr_img_code.png');
    const writeStream = fs.createWriteStream(filePath);

    qrCodeImage.pipe(writeStream)
        .on('finish', () => {
            fs.readFile(filePath, (err, imageBuffer) => {
                if (err) {
                    console.log('Could not read the image', err);
                    return res.status(500).send('Could not generate QR code');
                }
                FileModel.create({
                    link: url,
                    image: {
                        data: imageBuffer,
                        contentType: 'image/png'
                    }
                })
                .then(() => {
                    res.download(filePath, 'qr_img_code.png', (err) => {
                        if (err) {
                            res.status(500).send('Could not download the image');
                        }
                        fs.unlinkSync(filePath);
                    });
                })
                .catch((err) => {
                    res.status(500).send('Could not save to database');
                });
            });
        })
        .on('error', () => {
            res.status(500).send('Could not generate QR code');
        });
});
    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

    // qrCodeImage.pipe(writeStream)
    //     .on('finish', () => {
    //         res.download(filePath, 'qr_img_code.png', (err) => {
    //             if (err) {
    //                 res.status(500).send('Could not download the image');
    //             }
    //             fs.unlinkSync(filePath);
    //         })
    //     })
    //     .on('error', () => {
    //         res.status(500).send('Could not generate QR code');
    //     });


