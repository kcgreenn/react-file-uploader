import React, { useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

const propTypes = {};

const defaultProps = {};

export default function FileUpload(props) {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart-form-data"
        }
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <React.Fragment>
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
