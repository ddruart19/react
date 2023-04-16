import { Request, Response, NextFunction } from "express"
const resetPwdRepository = require('../infrastructure/tokenResetPwd.repository')

//Is token valid
const isTokenValid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Check if email exists
        if(await resetPwdRepository.getByToken(req.query.token))return res.status(200).json({message : "Token does exist"})
        else return res.status(404).json({message : "Token doesnt exist"})
    } catch (err: any) {
        console.error(`Error while trying to reset password`, err.message)
        return res.status(500).send(err.message)
    }
}

module.exports = {
    isTokenValid
}