const getsongId = (headers) => {
    return headers.app_song_uuid
}

const getUserName = (headers) => {
    return headers.app_user_name
}

const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*'
    }
}

module.exports = {
    getsongId,
    getUserName,
    getResponseHeaders
}