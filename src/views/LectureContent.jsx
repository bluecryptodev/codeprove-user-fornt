import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";


const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#ff6c5c',
  },
  barColorPrimary: {
    backgroundColor: 'white',
  },
})(LinearProgress);

function CodeTest(props) {
  React.useEffect(() => {
    
  }, []);
  return (
      <div style={{position: 'absolute', width: '100%', zIndex: '100'}}>
        <ColorLinearProgress />
        asfasfasfasd
      </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

export default connect(mapStateToProps)(CodeTest);