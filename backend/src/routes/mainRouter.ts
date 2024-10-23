import { Router } from 'express';

const router = Router();

router
.route("/logout")
.get(async (req, res) => {
    req.cookies.clear();
});

router
.route("/")
.get(async (req, res) => {
    console.log("Hello World from Main Endpoint!")
});

export default router;