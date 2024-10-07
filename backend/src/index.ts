import express from 'express';

const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node Express!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
