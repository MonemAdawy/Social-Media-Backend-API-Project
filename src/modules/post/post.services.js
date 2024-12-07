import {User} from "../../DB/models/user.model.js";
import {Post} from "../../DB/models/post.model.js";
import {Comment} from "../../DB/models/comment.model.js";
import { sequelize } from "../../DB/connection.js";


export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);

        await post.save();

        return res.status(201).json({
            message: "Post created successfully.",
            post,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deletePostById = async (req, res) => {
    try {
        const {postId} = req.params;
        const {userId} = req.body;
        console.log(userId);
        
        
        const post = await Post.findByPk(postId);
        console.log(post.userId);
        if (!post) {
            return res.status(404).json({message: "Post not found."});
        }

        if (post.userId != userId) {
            return res.status(403).json({message:"You are not authorized to delete this post."});
        }

        await post.destroy();
        return res.status(200).json({message: "Post deleted successfully."});
    } 
    catch (error) {
        return res.status(500).json({message: "Server error.", error: error.message});
    }
};


export const getPostDetails = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title"],
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["id", "content"],
                },
            ],
        });
        if (posts.length === 0) {
            return res.status(404).json({message: "No posts found."});
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error fetching posts'});
    }
};


export const getPostsCommentCount = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                "id",
                "title",
                [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
            ],
            include: [
                {
                    model: Comment,
                    attributes: [],
                },
            ],
            group: ["post.id"],
        });

        if (!posts || posts.length === 0) {
            return res.status(404).json({message: "No posts found."});
        }

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
};
