import express from 'express';

const app = express();
const port = 5001;

app.get('/', (req, res) => {
    res.send('Hello World Prod!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
