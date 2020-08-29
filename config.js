module.exports = {
    PORT: process.env.PORT || 5050,
    MONGODB_URL: "mongodb+srv://shopeasy:o9ahhIhx23IZWAxQ@cluster0.d0nxu.mongodb.net/<dbname>?retryWrites=true&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'


}
    // o9ahhIhx23IZWAxQ
    // mongodb+srv://shopeasy:o9ahhIhx23IZWAxQ@cluster0.d0nxu.mongodb.net/<dbname>?retryWrites=true&w=majority