import {Comment} from "../../DB/models/comment.model.js";
import {Op} from "sequelize";
import {User} from "../../DB/models/user.model.js";
import {Post} from "../../DB/models/post.model.js";


export const createBulkComments = async (req, res) => {
    try {
        const comments = req.body.comments;

        if (!Array.isArray(comments) || comments.length === 0) {
            return res.status(400).json({
                message: "Invalid input. Please provide an array of comments.",
            });
        }

        const createdComments = await Comment.bulkCreate(comments);
        return res.status(201).json({
            message: "Comments created successfully.",
            createdComments,
        });
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
};



export const updateComment = async (req, res) => {
    const {commentId} = req.params;
    const {userId, content} = req.body;
    console.log(commentId);
    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found.",
            });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this comment.",
            });
        }

        comment.content = content;
        await comment.save();

        return res.status(200).json({
            message: "Comment updated successfully.",
            comment,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};



export const findOrCreateComment = async (req, res) => {
    const { postId, userId, content } = req.body;

    try {
        const existingComment = await Comment.findOne({
            where: {
                postId,
                userId,
                content,
            },
        });

        if (existingComment) {
            return res.status(200).json({
                comment: existingComment,
                created: false
            });
        }

        const newComment = await Comment.create({
            postId,
            userId,
            content,
        });

        await newComment.save();
        return res.status(201).json({
            comment: newComment,
            created: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};



export const searchComments = async (req, res) => {
    const { word } = req.query;
    if (!word) {
        return res.status(400).json({
            message: "Please provide a word to search.",
        });
    }

    try {
        const { rows, count } = await Comment.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`,
                },
            },
        });

        return res.status(200).json({
            message: `Found ${count} comments containing the word "${word}".`,
            count,
            comments: rows,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};



export const getRecentComments = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({
            message: "Post ID is required.",
        });
    }

    try {
        const recentComments = await Comment.findAll({
            where: { postId },
            order: [["createdAt", "DESC"]],
            limit: 3,
        });

        if (recentComments.length === 0) {
            return res.status(404).json({
                message: "No comments found for this post.",
            });
        }

        return res.status(200).json({
            message: `Found ${recentComments.length} most recent comments for post ${postId}.`,
            comments: recentComments,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};


export const getCommentDetails = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: "Comment ID is required.",
        });
    }

    try {
        const comment = await Comment.findByPk(id, {
            attributes: [
                "id",
                "content"
            ],
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Post,
                    attributes: ["id", "title", "content"],
                },
            ],
        });

        if (!comment) {
            return res.status(404).json({
                message: `No comment found with ID ${id}.`,
            });
        }

        return res.status(200).json({
            message: "Comment details retrieved successfully.",
            comment,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error.",
            error: error.message,
        });
    }
};