import React, { useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import Message from "../Message/Message";
import ProgressBar from "../ProgressBar/ProgressBar";

const propTypes = {};

const defaultProps = {};

export default function FileUpload(props) {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart-form-data"
        },
        onUploadProgress: progressEvent => {
          setUploadPercent(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(() => setUploadPercent(0), 5000);
        }
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem on the server");
      } else {
        setMessage("There was a problem on the server");
      }
    }
  };
  const removeMessage = () => setMessage("");

  return (
    <React.Fragment>
      <ProgressBar percentage={uploadPercent} />
      {message ? <Message msg={message} removeMessage={removeMessage} /> : null}
      <form onSubmit={onSubmit} className="row justify-content-start">
        <div className="custom-file col-6 mt-4">
          <input
            type="file"
            className="custom-file-input  "
            id="customFile"
            onChange={onChange}
          />
          <label
            className="custom-file-label text-primary"
            htmlFor="customFile"
          >
            {fileName}
          </label>
        </div>
        <div className="col-1" />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4 col-2"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5 justify-content-center">
          {" "}
          <div className="col-6">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
          </div>{" "}
        </div>
      ) : null}
    </React.Fragment>
  );
}

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;
