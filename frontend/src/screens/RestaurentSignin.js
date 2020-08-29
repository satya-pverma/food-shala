import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ressignin } from '../actions/restaurentAction';

function RestaurentSignin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const restaurentSignin = useSelector(state => state.restaurentSignin);
    const { loading, restInfo, error } = restaurentSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if (restInfo) {
            props.history.push(redirect);
            console.log(restInfo)
        }
        return () => {
            //
        };
    }, [restInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(ressignin(email, password));

    }
    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Restaurent Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
          </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    New to ShopEasy?
        </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your ShopEasy account</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default RestaurentSignin;