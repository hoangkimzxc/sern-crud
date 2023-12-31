import db from '../models/index'
import bcrypt from 'bcryptjs'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exist
                //compare password

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'Ok'

                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password! Please try again!`
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                    resolve(userData)
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your user's email isn't exist in our system. Plz try other email!`
            }
            resolve(userData)
        }
        catch (e) {
            reject(e)
        }
    })
}

let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try { }
        catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}