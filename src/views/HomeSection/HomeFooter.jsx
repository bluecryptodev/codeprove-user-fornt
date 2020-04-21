import React from "react";

import Grid from '@material-ui/core/Grid';
//icon
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import styles from '../../assets/jss/home/homefooter.js';
const useStyles = makeStyles(styles);
function HomeFooter(props) {
    
    const classes = useStyles();
    
    React.useEffect(() => {
    }, []);
    return (
        <div className={classes.container}>
            <Grid container spacing={3} className={classes.Content1}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.footerLogo}>
                        <img  src={require('../../assets/img/logo.png')} alt="logo"/>
                    </div>
                    
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.contactInfo}>
                    <h3 style={{color: 'white'}}>Reach Us</h3>
                    <div className={classes.socialIconList}>
                        <FacebookIcon />
                        <InstagramIcon />
                        <YouTubeIcon />
                        <TwitterIcon />
                        <LinkedInIcon />
                    </div>
                    <div>
                        <p>1800-123-3598</p>
                        <p>contact@codingninjas.in</p>
                    </div>
                    <br />
                    <p>
                        Plot Number 360, Kohat Enclave,<br />
                        Main Pitam Pura Road, Delhi 110034<br />
                        Opposite Kohat Metro Station exit 3
                    </p>
                </Grid>
            </Grid>
        </div>
    );
    }
    const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(HomeFooter);