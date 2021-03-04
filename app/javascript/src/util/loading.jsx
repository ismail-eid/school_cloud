import React from 'react';
import './loading.scss'

const LoadingWidget = (props) => {
  return (
    <div className="container" id="loading">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <div className="loader m-auto"></div> 
        </div>
      </div>
    </div>
  )
}

export default LoadingWidget;