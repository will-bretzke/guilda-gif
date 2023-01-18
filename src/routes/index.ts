import { Router } from "express";

import gifsRoutes from "./gifs.routes";

const router = Router();

router.use("/gif", gifsRoutes);

export default router;