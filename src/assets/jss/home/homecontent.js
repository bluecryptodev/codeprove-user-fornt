
const homeContent = {
    container: {
        margin: 'auto',
        background: 'white'
    },
    Content1: {
        padding: '20px 50px',
        width: '100%',
        '& h1': {
            fontSize: 'calc(64px + 1vw)',
            fontFamily: 'Bebas Neue',
            fontWeight: 'none',
            // textFillColor: 'transparent',
            webkitBackgroundClip: 'text',
            margin: '0px 0px 30px'
        },
        '& .p1': {
            fontSize: '18px',
            letterSpacing: '.3px',
            color: '#7c7c7c',
            fontFamily: "Nunito Sans, sans-serif"
        },
        '& .p2': {
            marginTop: '55px',
            fontSize: '15px',
            letterSpacing: '.3px',
            color: 'black',
            fontFamily: "Nunito Sans, sans-serif"
        },
    },
    introAmount: {
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    introAmountItem: {
        float: 'left',
        marginRight: '20px',
        padding: '10px',
        '& h2': {
            fontSize: '36px',
            color: '#f96c6c',
            margin: '0px 0px 10px'
        },
        '& span': {
            color: 'rgba(0,0,0,.5)'
        },
        boxShadow: '0 2px 13px 0 rgba(0,0,0,.07)'
    },
    learnImg: {
        float: 'left',
        marginRight: '30px',
        cursor: 'pointer',
        boxShadow: '12px 8px 23px 0 rgba(0,0,0,.16)',
        width: '280px',
        height: '350px',
        marginBotto: '20px',
        transition: 'a.3s all',
        '& img': {
            width: '280px',
            height: '350px'
        },
        '&:hover': {
            boxShadow: '3px 3px 0px 0 rgba(0,0,0,.16)',
        },
        '&:last-child': {
            margin: '0px'
        }
    },
    learnText: {
        position: 'relative',
        marginTop: '-110px',
        marginLeft: '30px',
        '& *': {
            color: 'white',
        },
        '& h3': {
            fontWeight: 'bolder',
            fontSize: 'calc(28px + 1vw)',
            fontFamily: 'Anton, sans-serif',
            margin: '0px',
            letterSpacing: '6.5px'
        },
        '& span': {
            fontFamily: "Nunito Sans, sans-serif",
            textTransform: 'uppercase'
        }
    },
    userListCursole: {
        background: 'linear-gradient(270deg,#ffcc8d 0,#ff6868 98%)',
        padding: '20px 0px',
        width: '100%',
        overflow: 'hidden',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    supportTeam: {
        float: 'left',
        marginRight: '20px',
        padding: '10px',
        boxShadow: '0 2px 13px 0 rgba(0,0,0,.07)',
        background: 'white',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        width: '350px'
    },
    supportDescription: {
        marginLeft: '20px',
        '& p:first-child': {
            fontWeight: 'bolder',
            fontSize: '13px',
            margin: '0px 0px 10px'
        },
        '& span': {
            fontWeight: '0',
            fontSize: '11px',
            color: 'red',
            fontFamily: "Nunito Sans, sans-serif"
        },
        '& p:last-child': {
            fontSize: '12px',
            margin: '0px',
            color: 'grey',
            fontFamily: "Nunito Sans, sans-serif"
        },
    },
    alumniWork: {
        margin: '65px 0px 0px',
        '& h2': {
            textAlign: 'center',
            fontFamily: "Nunito Sans, sans-serif",
            fontWeight: 'bolder'
        }
    },
    serviceImg: {
        width: '100px',
        margin: 'auto'
    },
    courseItems: {
        boxShadow: '12px 12px 14px 0 rgba(0,0,0,.25)',
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        height: '250px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: '.3s all',
        cursor: 'pointer',
        '& p:first-child': {
            margin: '0px',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '20px',
            fontFamily: 'Archivo Black, sans-serif',
            textTransform: 'uppercase',
            '& span': {
                fontWeight: '1!important'
            }
        },
        '& p:last-child': {
            margin: '0px',
            color: 'white',
            fontWeight: '1',
            marginTop: '15px',
            fontFamily: 'Nunito Sans, sans-serif'
        },
        '&:hover': {
            boxShadow: 'none'
        },
        '& img': {
            position: 'relative'
        }
    },
    videoIntro: {
        '& h1': {
            fontFamily: 'Bebas Neue',
            fontSize: '45px',
            letterSpacing: '1px'
        },
        '& p': {
            color: 'grey',
            fontFamily: 'Nunito Sans, sans-serif'
        }
    },
    videoIntro1: {
        '& *': {
            color: 'white'
        },
        '& h1': {
            fontFamily: 'Archivo Black, sans-serif',
        },
        '& p': {
            fontFamily: 'Nunito Sans, sans-serif'
        }
    },
    reviewListItem: {
        padding: '30px',
        boxShadow: '-8px 16px 57px 0 rgba(84,84,84,.16)',
        background: 'white'
    },
    reviewAvatarImg: {
        width: '60px',
        height: '60px'
    },
    userInfo: {
        alignItems: 'center',
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both'
        }
    },
    userName: {
        float: 'left',
        marginTop: '15px',
        width: '70%',
        '& p': {
            fontSize: '20px',
            fontWeight: 'bolder',
            margin: '0px'
        },
        '& span': {
            fontSize: '12px',
            color: '#ef5f7e'
        }
    },
    userImg: {
        float: 'right',
    },
    supportImg: {
        width: '350px',
        margin: 'auto',
        background: 'white',
        boxShadow: '0 7px 10px 0 rgba(0,0,0,.07)'
    },
    userInfoFooter: {
        padding: '15px 20px',
        "& p": {
            fontWeight: 'bolder',
            margin: '0px 0px 5px'
        },
        '& span': {
            color: 'red'
        }
    },
    Exclusive: {
        padding: '0px 20px',
        "& p": {
            fontWeight: 'bolder',
            margin: '0px 0px 20px',
            fontFamily: 'Archivo Black, sans-serif',
        },
        '& span': {
            color: 'grey',
            lineHeight: '25px',
            fontFamily: 'Nunito Sans, sans-serif'
        }
    },
    hoverIntro: {
        position: 'relative',
        width: '290px',
        margin: 'auto',
        marginTop: '-425px',
        height: '364px',
        transition: '1s all'
    }
}

export default homeContent;