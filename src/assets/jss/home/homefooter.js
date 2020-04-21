
const homeFooter = {
    container: {
        padding: '40px 20px ',
        background: '#ffb17b'
    },
    footerLogo: {
        width: '200px',
        margin: 'auto',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    socialIconList: {
        '& svg': {
            fontSize: '40px',
            marginRight: '10px',
            color: 'white',
            cursor: 'pointer'
        }
    },
    contactInfo: {
        '& *': {
            color: 'white'
        }
    },
    mapStyle: {
        width: '100%!important',
        height: '100%!important',
        position: 'relative!important'
    }
}

export default homeFooter;