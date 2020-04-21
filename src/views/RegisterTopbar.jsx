import React from "react";
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

//icon
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import styles from '../assets/jss/header.js';
const useStyles = makeStyles(styles);
function RegisterTopBar(props) {

    const classes = useStyles();
    const [bannerClose, setBannerClose] = React.useState(true);

    function BannerClose() {
        setBannerClose(false);
    }
    React.useEffect(() => {
        
    }, []);
    return (
        <Collapse in={bannerClose} >
            <div className={classes.registerTopbar}>
                <div className={classes.bannerLeft}>
                    <img src={require('../assets/img/bannerLeft.svg')} alt="bannerLeft"/>
                </div>
                <div className={classes.bannerContent} style={{width: '80%', margin: 'auto'}}>
                    <img src={require('../assets/img/codingimg.png')} alt="bannerLeft"/>
                    <div className={classes.bannerText}>
                        <p>Avail 20% off on the new online batches.</p>
                        <p>Last date to avail the discount is 12 Jan'20.</p>
                    </div>
                    <Fab variant="extended" size='small' className={classes.registerButton}>
                        Register Now
                    </Fab>
                </div>
                <div className={classes.bannerRight}>
                    <img src={require('../assets/img/bannerRight.svg')} alt="bannerRight"/>
                    
                </div>
                <IconButton aria-label="delete" className={classes.bannerClose} size="small" onClick={BannerClose}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            </div>
        </Collapse>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(RegisterTopBar);