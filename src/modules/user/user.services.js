import {User} from "../../DB/models/user.model.js";

export const signUp = async (req, res) => {
    try{
        const {email} = req.body;

        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // i put validation role in user.model.js

        const user = await User.create(req.body);
        await user.save();
        return res.status(201).json({ message: "User added successfully." });

    }
    catch(error){
        if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                success: false, 
                error: error.errors.map((err) => err.message)
            });
        }
        return res.status(500).json({success: false, error  });
    }
};



export const createOrUpdateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {skipValidation} = req.query;
        console.log(id);

        let user;
        user = await User.findByPk(id);

        if (user) {
            if (skipValidation === "true") {
                await user.update(req.body, {validate: false});
            } else{
                await user.update(req.body, {validate: true});
            }
            return res.status(200).json({message: "User updated successfully.", user});
        }


        if (skipValidation === "true") {
            user = await User.create(req.body, {validate: false});
        } else {
            user = await User.create(req.body, {validate: true});
        }

        return res.status(201).json({message:"User created successfully.", user});
    } 
    catch (error) {
        if (error.errors) {
            return res.status(400).json({
                success: false,
                error: error.errors.map((err) => err.message),
            });
        }
        return res.status(500).json({success: false, error: error.message});
    }
};





export const getUserByEmail = async (req, res) => {
    try {
        const {email} = req.query;

        if (!email) {
            return res.status(400).json({message: "Email is required."});
        }

        const user = await User.findOne({where: {email}});

        if (!user) {
            return res.status(404).json({message: "No user found"});
        }
        return res.status(200).json({user});
    }
    catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
};



export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findOne({
            where: {id},
            attributes: {exclude: ['role']}
        });

        if (!user) {
            return res.status(404).json({message: "No user found"});
        }

        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message });
    }
};
