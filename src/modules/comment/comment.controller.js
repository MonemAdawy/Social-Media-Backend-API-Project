import { Router } from "express";
import * as commentServices from "./comment.services.js";

const router = Router();

router.post("/", commentServices.createBulkComments);

router.patch("/:commentId", commentServices.updateComment);

router.post("/find-or-create", commentServices.findOrCreateComment);

router.get("/search?", commentServices.searchComments);

router.get("/newest/:postId", commentServices.getRecentComments);

router.get("/details/:id", commentServices.getCommentDetails);

export default router;