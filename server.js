import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoutes';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import restaurentRoute from './routes/restaurentRoute'
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
