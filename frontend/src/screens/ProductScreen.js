import React, { useEffect, useState } from 'react';
import { detailsProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function ProductScreen(props) {
	const [qty, setQty] = useState(1);
	const productDetails = useSelector(state => state.productDetails);
	const { product, loading, error } = productDetails;

	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(detailsProduct(props.match.params.id));
		return () => {


		};


	}, [])

	const handleAddToCart = () => {
		props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
	}
	return (

		<div>
			<div className="back-to-result">
				<Link to="/">Back to result</Link>
			</div>
			{loading ? <div>Loading...</div> :
				error ? <div> {error}</div> :
					(
						<div className="details">
							<div className="details-image">
								<img src={product.image}></img>
							</div>
							<div className="details-info">
								<ul>
									<li>
										<h1>{product.name}</h1>

									</li>
									<li>
										{product.rating} stars ({product.numReviews} Reviews)
					</li>
									<li>
										price: <b>&#x20b9;{product.price}</b>
									</li>
									<li>
										Description
						<div>
											{product.description}
										</div>
									</li>
								</ul>

							</div>
							<div className="details-action">
								<ul>
									<li>
										price: &#x20b9; {product.price}
									</li>
									<li>
										Status: {product.countInStock > 0 ? "Available" : "Unavailable."}
									</li>
									<li>
										Qty:<select value={qty} onChange={(e) => { setQty(e.target.value) }}>
											{[...Array(product.countInStock).keys()].map(x =>
												<option key={x + 1} value={x + 1}>{x + 1}</option>
											)}
										</select>
									</li>
									<li>
										{product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
										}
									</li>

								</ul>


							</div>

						</div>

					)
			}

		</div>
	)
}
export default ProductScreen;