const {
    createLogger,
    transports,
    format
} = require("winston");

const logger = createLogger({

    transports: [
        new transports.File({
            filename: 'info.log',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});



module.exports = logger;