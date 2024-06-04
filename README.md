### 👇🏻 Please visit my portfolio via the link below.
![qr_img_code](https://github.com/Iuryppedrosa/learning-nodejs-by-practicing/assets/89420889/1b96f1b2-1f50-452e-8613-03b23ccf9000)

## Overview
This small project allows users to generate QR codes from URLs using Node.js. We'll use the following npm packages:

1. **Inquirer**: To prompt users for input.
2. **qr-image**: For creating QR code images.
3. **fs**: To save the generated QR code as an image and store the specified URL in a text file.

## Steps

1. **Get User Input**:
   - We use the `inquirer` package to ask the user for a website address (URL).

2. **Generate QR Code**:
   - Using the `qr-image` package, we transform the entered URL into a QR image format.

3. **Save Information**:
   - With the help of the `fs` package, we store the user's URL as a text file (e.g., `URL.txt`).
