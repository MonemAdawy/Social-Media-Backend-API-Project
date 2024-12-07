import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { Post } from "./post.model.js";
import { User } from "./user.model.js";

export const Comment = sequelize.define("comment", {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})


User.hasMany(Comment);
Comment.belongsTo(User);


Post.hasMany(Comment);
Comment.belongsTo(Post);