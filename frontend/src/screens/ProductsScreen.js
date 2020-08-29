import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProdcut } from '../actions/productActions';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const restaurentSignin = useSelector(state => state.restaurentSignin);
  const { restInfo } = restaurentSignin;

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);


  }


  const postDetails = () => {

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "spv0075");
    fetch("	https://api.cloudinary.com/v1_1/spv0075/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    if (url) {
      dispatch(saveProduct({
        _id: id,
        name, price, image: url, description, restaurent: restInfo.name
      }));
    }
  }
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  }
  return <div className="content content-margined">

    <div className="product-header">
      <h3>Products</h3>
      <button className="button primary" onClick={() => openModal({})}>Create Product</button>
    </div>
    {modalVisible &&
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Create Product</h2>
            </li>
            <li>
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
            </li>

            <li>
              <label htmlFor="name">
                Name
              </label>
              <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="price">
                Price
          </label>
              <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}>
              </input>
            </li>
            <li>

              <div className="file-field input-field" placeholder="Upload Image">
                <div className="btn">
                  <span>Upload Image</span>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                  <button onClick={() => postDetails()}>click to save image</button>
                  {
                    url ?
                      <h5>image saved</h5> :
                      <div></div>
                  }
                </div>
              </div>
            </li>


            <li>
              <label htmlFor="description">
                Description
          </label>
              <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
            </li>
            <li>
              <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
            </li>
            <li>
              <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
            </li>
          </ul>
        </form>
      </div>
    }


    <div className="product-list">

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>

          </tr>
        </thead>
        <tbody>
          {products.map(product => (<tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>

            <td>
              <button className="button" onClick={() => openModal(product)} >Edit</button>
              {' '}
              <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  </div>
}
export default ProductsScreen;