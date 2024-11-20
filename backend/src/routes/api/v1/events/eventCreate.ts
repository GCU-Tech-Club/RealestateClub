import { Router } from "express";
const router = Router();

router.post('/event', async (req, res) => {

    const { Name } = req.body.name;
    const  { Time } = req.body.time;
    const { Location } = req.body.location;
    const { Description } = req.body.description;
    const { Registered } = req.body.registered;
    const { Attended } = req.body.attended;

if (!Name || !Time || !Location || !Description || !Registered ||!Attended){
    console.log("error");
    res.status(400).send({error: "Please enter all event details."})
}
else{
    res.status(200).send
}
});