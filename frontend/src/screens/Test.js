import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

export const Test = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    if (url) {
        console.log(url);
    }

    function showloading() {
        return (
            <div>
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const postDetails = () => {
        showloading();
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

    return (
        <div
            className="card input-filed"
            style={{
                margin: "70px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center",
                marginTop: "200px",
            }}
        >
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            <div className="file-field input-field" placeholder="Upload Image">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => {
                    postDetails();
                    showloading();
                }}
            >
                Upload
      </button>
        </div>
    );
};
export default Test;