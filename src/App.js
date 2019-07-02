import React from "react";

import FileUpload from "./components/FileUpload/FileUpload";

function App() {
  return (
    <React.Fragment>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">React File Uploader</h1>
          <p className="lead">
            This is a demo file uploader using React and Bootstrap
          </p>
        </div>
      </div>
      <div className="container">
        <FileUpload />
      </div>
    </React.Fragment>
  );
}

export default App;
