
const homeHeader = {
    registerTopbar: {
        width: '100%',
        background: 'linear-gradient(to bottom,#5377d7,#2b29a1)',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    registerClose: {
        transition: "all 5s ease 0s",
        height: '0px'
    },
    bannerLeft: {
        position: 'absolute',
        left: '0px'
    },
    bannerRight: {
        position: 'absolute',
        right: '0px',
        top: '0px'
    },
    bannerContent: {
        position: 'relative',
        zIndex: 100,
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        '& img': {
            float: 'left',
            width: '170px',
            height: '90px',
            marginRight: '30px'
        }
    },
    bannerText: {
        float: 'left',
        padding: '27px 10px',
        '& *': {
            fontFamily: 'Avenir-Light'
        },
        '& p': {
            margin: '0px',
            color: 'white'
        },
        '& p:first-child': {
            fontWeight: 'bolder',
            fontSize: '22px',

        }
    },
    registerButton: {
        marginTop: '30px',
        float: 'right',
        background: 'transparent',
        color: 'white',
        textTransform: 'capitalize',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '0px 20px!important',
        '&:hover': {
            background: 'linear-gradient(to bottom,#f1d605,#a12929)'
        }
    },
    bannerClose: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: 'white'
    }
}

export default homeHeader;