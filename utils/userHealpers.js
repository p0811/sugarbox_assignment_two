const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const Users = require('../models/suggerboxUsers');



/**
 * 
 * @param {*} pwd 
 * this method is used to convert user password in to hash using bcrypt.
 */
exports.createUserPassword = (pwd) => {
    return new Promise(async(resolve, reject) => {
        try {
            bcrypt.hash(pwd, 10, (err, hash) => {
                if (err) reject(new Error(err));
                else resolve(hash);
            })
        } catch (error) {
            reject(new Error(error))
        }

    })
}

/**
 * 
 * @param {*} emailId 
 *  this function wil check email id already registerd or not 
 */
exports.getUserIfEmailExists = (emailId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await Users.findOne({ email: emailId })
            resolve(user)
        } catch (error) {
            reject(new Error(error))
        }
    })
}


/**
 * 
 * @param {*} id 
 * this method is used to give user data 
 */

exports.getUserDetails = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let is_id_valid = mongoose.Types.ObjectId.isValid(id);
            if (is_id_valid) {
                let user = await Users.findById({ _id: id }, 'name email');
                if (user)
                    resolve(user)
                else
                    reject(new Error("No data found"))
            } else {
                reject(new Error("No data found"))
            }

        } catch (error) {
            reject(new Error(error))
        }
    })
}

/**
 * 
 * @param {*} payload 
 * this method is used to generate JWT Token 
 */

exports.generateJwtToken = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            let jwtToken = jwt.sign({
                payload
            }, config.jwt_secreat_key, {
                expiresIn: "10h"
            })
            resolve(jwtToken)
        } catch (error) {
            reject(new Error(error))
        }
    })
}