https://github.com/Iuryppedrosa/learning-nodejs-by-practicing/assets/89420889/c82425f5-9b96-419f-aefe-7a67e1f65946
### 👇🏻 QRCode portfolio was made by this code. Please visit it.
![qr_img_code](https://github.com/Iuryppedrosa/learning-nodejs-by-practicing/assets/89420889/1b96f1b2-1f50-452e-8613-03b23ccf9000)

# QR Code Generator API

## Description
The QR Code Generator API is a Node.js application that allows users to generate QR codes for provided URLs and save them to a MongoDB database. Users can submit a URL through a POST request, and the API will generate a QR code image corresponding to that URL. The generated QR code image is then saved to the database along with the URL.

## Features
- Generates QR codes for provided URLs
- Saves QR code images along with corresponding URLs to a MongoDB database
- Allows users to download the generated QR code image

## Installation
1. Clone the repository to your local machine:

    ```
    git clone https://github.com/<your-username>/<your-repository>.git
    ```

2. Navigate to the project directory:

    ```
    cd <your-repository>
    ```

3. Install dependencies using npm:

    ```
    npm install
    ```

4. Configure MongoDB connection:
    - Replace the MongoDB connection string in `app.js` with your own MongoDB URI.

## Usage
1. Start the server:

    ```
    npm start
    ```

2. Send a POST request to `/generate` endpoint with a JSON body containing the URL to generate QR code for:

    ```json
    {
        "url": "https://example.com"
    }
    ```

3. The API will generate a QR code image for the provided URL and save it to the database.

4. To download the generated QR code image, visit the provided URL or retrieve it from the database.
![Captura de Tela 2024-06-06 às 15 28 49](https://github.com/Iuryppedrosa/learning-nodejs-by-practicing/assets/89420889/cd055730-e85d-499c-b5ec-a2ee06ca6190)
![Captura de Tela 2024-06-06 às 15 28 19](https://github.com/Iuryppedrosa/learning-nodejs-by-practicing/assets/89420889/43e20b1d-8ebe-4602-afac-a7d8c5b3917c)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- qr-image
- mongoose

## Contributing
Contributions are welcome! Please feel free to fork the repository and submit pull requests to contribute to this project.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

