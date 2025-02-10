const bcrypt = require('bcryptjs');

const hashPass = async (pass,saltNum) => {
    try { 
        const salt = await bcrypt.genSalt(saltNum);
        const hash = await bcrypt.hash(pass,salt)
        return hash
    } catch (error) {
        return error
    }
}

const comparePass = async(hash,pass) => {
    try { 
        const result = await bcrypt.compare(pass,hash)
        return result
    } catch (error) {
        return "error to compare password"
    }
}

module.exports = {hashPass,comparePass}