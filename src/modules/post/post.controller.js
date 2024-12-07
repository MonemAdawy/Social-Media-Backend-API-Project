import { Router } from "express";
import * as postServices from "./post.services.js";


const router = Router();


router.post("/", postServices.createPost);


router.delete("/:postId", postServices.deletePostById);


router.get("/details", postServices.getPostDetails);


router.get("/comment-count", postServices.getPostsCommentCount);


export default router;