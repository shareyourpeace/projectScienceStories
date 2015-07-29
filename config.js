/* 
 * export all of the data to be used 
 * you will require this file inside of server.js
 * mongolab.com  create new > aws > single node ? sandbox
 * DB name (lowercase) sciencestories
 * select db sciencestories > create new user > username: root password: 
 * copy the script for 'connect using standard uri driver
 */


module.exports = {
    "database": "mongodb://root:2014monL@ds041831.mongolab.com:41831/sciencestories",
    "port" : process.env.PORT || 3000,
    "secretKey" : "mySecretKey"
};