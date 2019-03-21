module.exports = {
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    }
}