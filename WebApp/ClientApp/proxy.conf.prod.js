const {env} = require('process');

const target = `https://mymessaging.codevergetech.com`;

const PROXY_CONFIG = [
    {
        context: [
            "/hangfire"
        ],
        target: target,
        secure: true,
        headers: {
            Connection: 'Keep-Alive'
        }
    }
]

module.exports = PROXY_CONFIG;
