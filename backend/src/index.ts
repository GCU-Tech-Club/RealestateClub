
import express from 'express'; // import the express variable
import routeHandler from './routes/routeHandler'; // import the routes variable

const app = express();
const port = 5001;


app.use('/', routeHandler);

app.listen(port, () => {
    console.log(`Server is at http://localhost:${port}`);        
});
