const config = {
    // process.env.DB_URL
    PORT: process.env.PORT || 3000,
    HOSTNAME: process.env.HOST || "localhost",
    CLIENT_DIR: 'public',
    CLIENT_URL: '/',
}

module.exports = config