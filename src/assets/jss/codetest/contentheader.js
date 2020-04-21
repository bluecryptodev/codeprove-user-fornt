

const contentheader = {
    navbar: {
        background: '#2a2747',
    },
    navbarcode: {
        background: '#2b364a',
        position: 'fixed',
        padding: '16px 30px',
        right: '0px',
        borderLeft: '1px solid rgba(255,255,255,.08)',
        
    },
    title: {
        flexGrow: 1,
    },
    button: {
        padding: '5px 10px',
        trasitionDuration: '.5s',
        fontSize: '13px',
        color: 'white',
        '&:hover': {
            background: 'rgba(255, 255, 255, .2)',
            boxShadow: "0px 0px 5px black"
        },
        '&:hover svg': {
            transform: 'scale(1.1)'
        },
        '& svg': {
            transitionDuration: '1.5s'
        }
    },
    iconButton: {
        marginRight: '30px',
        borderRight: '1px solid rgba(255,255,255,.08)'
    },
    formGroup: {
        display: 'inline-block'
    },
    formControl: {
        minWidth: 120,
        color: 'white'
    },
    select: {
        color: "white",
        background: '#20233a',
        padding: '0px 5px',
        marginRight: '20px',
        
    },
    messagePartButton: {
        marginRight: '10px'
    },
    messagePartButtonActive: {
        backgroundImage: 'linear-gradient(-135deg,#faa061 0,#f71c7a 100%)',
        color: 'white',
    },
    askModalheader: {
        padding: '0px!important'
    },
    askModalTab: {
        color: 'white',
        fontWeight: 'bolder',
        opacity: 0.5,
        '&.selected': {
            opacity: 1,
            color: 'white',
            borderBottom: '2px solid white'
        },
        '&:focus': {
            opacity: 1,
            color: 'white',
            borderBottom: '2px solid white'
        }
    },
    modalTitle: {
        backgroundImage: 'linear-gradient(0deg,#faa061 0,#faa081 100%)',
        color: 'white'
    },
    themesButton: {
        padding: '6px 10px',
        trasitionDuration: '.5s',
        color: 'white',
        marginRight: '10px',
        marginTop: '5px',
        '&:hover': {
            background: 'rgba(255, 255, 255, .2)',
            boxShadow: "0px 0px 5px black",
            cursor: 'pointer'
        }
    },
    doubteActive: {
        '& .active-first': {
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '1px 2px 8px 0 rgba(0,0,0,.12)',
            borderRadius: '2px',
            borderBottom: '1px solid grey',
            '& svg': {
                color: '#e95959',
                marginRight: '20px'
            },
            '& p': {
                fontSize: '14px',
                margin: '0px'
            }
        },
        '& .active-second': {
            padding: '20px',
            boxShadow: '1px 2px 8px 0 rgba(0,0,0,.12)',
            borderRadius: '2px',
            position: 'relative',
            zIndex: '100',
            '& .doubte-data': {
                '& p': {
                    fontSize: '14px',
                    margin: '0px'
                },
                '& p:first-child': {
                    float: 'left'
                },
                '& p:last-child': {
                    float: 'right'
                },
                '&:after': {
                    content: '""',
                    clear: 'both',
                    display: 'block'
                }
            },
            '& .chat-open-button': {
                color: '#e95959',
                float: 'right',
                fontSize: '30px',
                marginTop: '-55px',
                cursor: 'pointer'
            }
        }
    }
}

export default contentheader;