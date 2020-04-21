import React from "react";

import { connect } from 'react-redux';
// const useStyles = makeStyles(styles);
function CodeTest(props) {

  
  React.useEffect(() => {
    
  }, []);
  return (
    <div
    className="video"
    style={{
      position: "relative",
      paddingBottom: "56.25%" /* 16:9 */,
      paddingTop: 25,
      height: 0
    }}
  >
    <iframe
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
      src={`https://www.youtube.com/embed/sBws8MSXN7A`}
      frameBorder="0"
    />
  </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(CodeTest);