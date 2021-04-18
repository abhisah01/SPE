const {
    createLogger,
    transports,
    format
} = require("winston");

const logger = createLogger({

    transports: [
        new transports.File({
            filename: 'logs.json',
            //format: format.timestamp(),
            format: format.combine(format.timestamp(), format.json())
            //json: false
        })
    ]
});



module.exports = logger;