import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([{
        name: 'url',
        message: 'Enter a URL to turn into a QR code:',
    }])
    .then(answers => {
        const userUrl = answers.url;
        const qrCode = qr.image(userUrl); // type is default to 'png'
        // const qrCode = qr.image(userUrl, { type: 'png' });
        qrCode.pipe(fs.createWriteStream('qr_img_code.png'));
        fs.writeFile('qr_code_url.txt', userUrl, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('QR code image and URL saved successfully!');
            }
        });
    })
    .catch(err => {
        if (err) {
            console.log(err.isTtyError);
        }
        else {
            console.log('Something went wrong!');
        }
});


