import { connectDB, syncTables } from "../DB/connection.js";
import { Comment } from "../DB/models/comment.model.js";
import { Post } from "../DB/models/post.model.js";
import { User } from "../DB/models/user.model.js";
import userRouter from "../modules/user/user.controller.js";
import postRouter from "../modules/post/post.controller.js";
import commentRouter from "../modules/comment/comment.controller.js";

const bootstrap = async (app, express) => {
    app.use(express.json());

    await connectDB();

    await syncTables();

    app.use(express.json());

    app.use("/users", userRouter);
    app.use("/posts", postRouter);
    app.use("/comments", commentRouter);

    app.all("*", (req, res) => 
        res.status(404).json({success: false, message: "Page not found"})
    );
};


export default bootstrap;