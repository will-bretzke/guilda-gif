import { Router } from "express";

import gifsRoutes from "./gifs.routes";
import loadTestRouter from "./test.routes";

const router = Router();

router.use("/gif", gifsRoutes);
router.use("/load-test", loadTestRouter)

export default router;