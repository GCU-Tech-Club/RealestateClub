import express from 'express';

const app = express();
const port = 5001;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api', (req, res) => {
    res.send('This is the api route');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
