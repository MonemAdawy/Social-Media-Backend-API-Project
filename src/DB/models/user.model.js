import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkNameLength(value) {
                if (value.length <= 2) {
                    throw new Error("Name must be longer than 2 characters.");
                }
            },
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            checkLengthPass(value){
                if(value.length <= 6) {
                    throw new Error("password length less than 6 characters.");
                }
            }
        }
    },
    role: {
        type: DataTypes.ENUM(
            "admin",
            "user"
        ),
        allowNull: false,
        validate: {
            isIn: {
                args: [["user", "admin"]],
                msg: "Role must be either 'user' or 'admin'.",
            }
        }
    },
    
}
)


User.beforeCreate((user) => {
    if (user.email) {
        user.email = user.email.toLowerCase();
    }
});


User.beforeUpdate((user) => {
    if (user.email) {
        user.email = user.email.toLowerCase();
    }
});



