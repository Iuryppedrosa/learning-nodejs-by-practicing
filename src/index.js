import express from 'express';
import {image as qrImage} from 'qr-image';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

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
    const filePath = path.join(__dirname, '../public/qr_img_code.png');
    const writeStream = fs.createWriteStream(filePath);

    qrCodeImage.pipe(writeStream)
        .on('finish', () => {
            res.download(filePath, 'qr_img_code.png', (err) => {
                if (err) {
                    res.status(500).send('Could not download the image');
                }
                fs.unlinkSync(filePath);
            })
        })
        .on('error', () => {
            res.status(500).send('Could not generate QR code');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// inquirer
//     .prompt([{
//         name: 'url',
//         message: 'Enter a URL to turn into a QR code:',
//     }])
//     .then(answers => {
//         const userUrl = answers.url;
//         const qrCode = qr.image(userUrl); // type is default to 'png'
//         // const qrCode = qr.image(userUrl, { type: 'png' });
//         qrCode.pipe(fs.createWriteStream('qr_img_code.png'));
//         fs.writeFile('qr_code_url.txt', userUrl, (err) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log('QR code image and URL saved successfully!');
//             }
//         });
//     })
//     .catch(err => {
//         if (err) {
//             console.log(err.isTtyError);
//         }
//         else {
// //             console.log('Something went wrong!');
// //         }
// });


