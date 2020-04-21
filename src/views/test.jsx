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
    
  </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(CodeTest);