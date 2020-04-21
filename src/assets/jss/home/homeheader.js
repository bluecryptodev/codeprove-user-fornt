
const homeHeader = {
    registerTopbar: {
        width: '100%',
        height: '100px',
        background: 'linear-gradient(to bottom,#5377d7,#2b29a1)'
    },
    root: {
        padding: '0px',
        '& img': {
            width: '130px'
        }
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: '10px'
    }, 
    content: {
        width: '100%',
        margin: 'auto',
        padding: '0px'
    },
    navbaritem: {
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        '&:hover': {
            "& svg": {
                transform: 'rotate(-180deg)',
            }
        }
    },
    navbar: {
        textDecoration: 'none',
        padding: '25px 15px',
        fontSize: '12px',
        color: 'black',
        fontFamily: 'Montserrat,sans-serif',
        transition: "all 0.3s ease 0s",
        "&:hover" :{
            color: 'red',
            background: '#f6f6f6',
            
        },
        "& svg": {
            fontSize: '20px',
            position: 'relative',
            top: '5px',
            marginTop: '-10px',
            margin: '-2px 0px 0px 5px',
            transition: "all 0.3s ease 0s",
        },
    },
    active: {
        textDecoration: 'none',
        padding: '5px 15px',
        // margin: '0px 15px',
        color: 'red',
        fontWeight: 'bolder'
    },
    menuItems: {
        top: '65px',
        background: '#f6f6f6',
        position: 'absolute',
        boxShadow: '0 12px 20px -10px rgba(0, 0, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 0, 0, 0.2)',
        borderBottom: '3px solid #ff1456',
        "& ul": {
            padding: '0px 10px',
            '& p': {
                margin: '15px 0px',
                color: '#ff1456',
                fontWeight: '700'
            },
            '& li': {
                lineHeight: '48px',
                listStyle: 'none',
            },
            "& li a": {
                transition: "all 0.3s ease 0s",
                borderRadius: '3px',
                fontFamily: 'Montserrat,sans-serif',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'black',
                fontSize: '14px',
                padding: '15px 10px',
                '&:hover': {
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white'
                }
            },
            
        }
    },
    LoginModal: {
        width: 400
    },
    loginButton: {
        margin: '0px 30px 0px 10px',
        background: 'linear-gradient(62deg,#fbab7e 0,#f7ce68 100%)',
        color: 'white',
        padding: '0px 20px!important'
    },
    socialLoginButton: {
        borderRadius: '100px',
        border: '1px solid #d6d1d1',
        transition: "all 0.3s ease 0s",
        padding: '10px',
        cursor: 'pointer',
        marginBottom: '20px',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        '&:hover': {
            background: '#e4e4e4'
        },
        '& img': {
            float: 'left',
            width: '25px'
        },
        '& p': {
            color: '#777',
            fontSize: '18px',
            margin: '3px',
            textAlign: 'center'
        }
    },
    loginContiuneButton: {
        width: '100%',
        background: 'linear-gradient(62deg,#fbab7e 0,#f7ce68 100%)',
        color: 'white'
    },
    divider: {
        display: 'table',
        '&:after': {
            width: '50%',
            borderBottom: '1px solid grey',
            display: 'table-cell',
            content: '""',
            position: 'relative',
            top: '-10px'
        },
        '&:before': {
            width: '50%',
            borderBottom: '1px solid grey',
            display: 'table-cell',
            content: '""',
            position: 'relative',
            top: '-10px'
        },
        '& span': {
            padding: '0px 10px',
            fontWeight: 'bolder'
        }
    },
    inputSuccess: {
        "& .MuiInput-underline": {
            '&:after': {
                borderColor: 'green'
            }
        },
        '& label': {
            color: 'green!important'
        }
    },
    avatarImg: {
        margin: '0px 10px',
        cursor: 'pointer'
    },
    avartarPart: {
        "&:hover": {
            '& .viewMenu': {
                transition: "all 0.3s ease 0s",
                opacity: '1!important',
                zIndex: '100'
            }
        }
    },
    profileMenu: {
        float: 'right',
        padding: '10px',
        position: 'absolute',
        right: 10,
        top: '56px',
        transition: "all 0.3s ease 0s",
        opacity: 0,
        zIndex: '-1'
    },
    logoutButton: {
        background: 'linear-gradient(to bottom,#fda547,#fa6c22)',
        color: 'white',
        padding: '5px 20px',
        borderRadius: '50px',
    },
    countryList: {
        zIndex: '1000!important'
    },
    field: {
        width: '100%', 
        marginTop: '20px'
    }
}

export default homeHeader;