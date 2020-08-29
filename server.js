const express = require('express');
const config = require('./config');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const restaurentRoute = require('./routes/restaurentRoute')
const path = require('path');
dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, (
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}
)).catch(error => console.log(error));

const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/restaurent', restaurentRoute)
app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

/*
app.get("/api/products/:id", (req, res) => {

				const productId = req.params.id;
				const product = data.products.find(x => x._id=== productId);
				if(product)
				{
					res.send(product);
				}
				else
				{
					res.status(404).send({msg:"product not found"})
				}
});
*/

app.get("/api/products", (req, res) => {

	res.send(data.products);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('*', (req, res) => {
		res.sendFile(ath.resolve(__dirname, 'frontend', 'build', 'index.html'));

	});
}

app.listen(PORT, () => { console.log("server started at http://localhost:" + PORT) });
