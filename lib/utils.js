const crypto = require('crypto');
const fs = require('fs');
module.exports = function(app) {
    const _self = {};
    const algorithm = 'aes-256-ctr';
    const hash = 'q1w2e3r4';

    /**
     * getRandomInt
     * @param min
     * @param max
     * @returns {*}
     */
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * checkBasicFolders
     */
    _self.checkBasicFolders = () => {
        const folders = ["logs"];
        try {
            for (let i = 0; i < folders.length; i++) {
                if (!fs.existsSync("./" + folders[i])) {
                    _self.debugging("Creating folder: " + folders[i]);
                    fs.mkdirSync("./" + folders[i]);
                }
            }
        } catch (error) {
            app.logger.log('error',"config - utils - checkFolderExists - " + error);
            console.error(error);
        }
    }

    /**
     * decrypt
     * @param text
     * @returns {*}
     */
    _self.decrypt = (text) => {
        const decipher = crypto.createDecipher(algorithm, hash);
        let dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    /**
     * encrypt
     * @param text
     * @returns {*}
     */
    _self.encrypt = (text) => {
        const cipher = crypto.createCipher(algorithm,hash);
        let crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    /**
     * randomString
     * @param len
     * @returns {string}
     */
    _self.randomString = (len) => {
        const date = new Date();
        let buf = []
            , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getHours() + date.getMinutes() + date.getSeconds()
            , charlen = chars.length;
        for (let i = 0; i < len; ++i) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }
        return buf.join('');
    }

    /**
     * validEmail
     * @param e-mail
     * @return boolean
     */
    _self.validEmail = (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            return true;
        }
        return false;
    }

    /**
     * validDateYYYYMMDD
     * @param date
     * @return boolean
     */
    _self.validDateYYYYMMDD = (date) => {
        const regex = /\b\d{4}[-.]?\d{2}[-.]?\d{2}\b/;
        if (regex.test(date)) {
            return true;
        }
        return false;
    }

    /**
     * validDateDDMMYYYY
     * @param date
     * @return boolean
     */
    _self.validDateDDMMYYYY = (date) => {
        const regex = /\b\d{2}[/.]?\d{2}[/.]?\d{4}\b/;
        if (regex.test(date)) {
            return true;
        }
        return false;
    }

    /**
     * validPhoneNumber
     * @param phone
     * @return boolean
     */
    _self.validPhoneNumber = (phone) => {
        const regex = /\b\d{2}[-.]?\d{5}[-.]?\d{4}\b/;
        if (regex.test(phone)) {
            return true;
        }
        return false;
    }


   /**
    * replaceAll
    * @param {String} value
    * @param {String} search
    * @param {String} replace
    * @return {String} value
    */
    _self.replaceAll = (value, search, replace) => {
        for (let i = value.length - 1; i >= 0; i--) {
            value = value.replace(search,replace);
        }
        return value;
    }

    /**
     * debugging
     * @param {String} message
     */
    _self.debugging = (message) => {
        if(app.debug) {
            app.debugging.log('info',message); 
        }
    }

    /**
     * checkPathConversionExists
     * @param {String} folder
     */
    _self.checkFolderExists = (folder) => {
        try {
            if (!fs.existsSync(folder)) {
                _self.debugging("config - utils - checkFolderExists - create folder: " + folder);
                fs.mkdirSync(folder);
            }
        } catch (error) {
            app.logger.log('error',"config - utils - checkFolderExists - " + error);
            console.error(error);
        }
    }

    /**
     * checkFileExists
     * @param {String} file
     * @return {Boolean} true/false
     */
    _self.checkFileExists = (file) => {
        try {
            if (fs.existsSync(file)) {
                return true;
            }
            return false;
        } catch (error) {
            app.logger.log("error", "config - utils - checkFileExists - " + error);
            console.error(error);
        }
    }

    /**
     * deleteFolder
     * @param {String} path
     */
    _self.deleteFolder = (path) => {
        try {
            if(fs.existsSync(path)) {
                fs.readdirSync(path).forEach(function(file,index){
                    let curPath = path + "/" + file;
                    if(fs.lstatSync(curPath).isDirectory()) {
                        _self.deleteFolder(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                        _self.debugging("Removing: " + curPath);
                    }
                });
                _self.debugging("Removing: " + path);
                fs.rmdirSync(path);
            }
        } catch (error) {
            app.logger.log("error","config - utils - deleteFolder - " + error);
            console.error(error);
        }
    }
    
    return _self;
}