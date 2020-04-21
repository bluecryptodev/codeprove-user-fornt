const contentfooter = {
    footer: {
        background: '#2a2747',
        padding: '10px'
    },
    button: {
        padding: '5px 10px',
        trasitionDuration: '.5s',
        color: 'white',
        marginRight: '10px',
        '&:hover': {
            background: 'rgba(255, 255, 255, .2)',
            boxShadow: "0px 0px 5px black"
        },
        '&:hover svg': {
            transform: 'scale(1.1)'
        },
        '& svg': {
            transitionDuration: '1.5s'
        },
        '&:disabled': {
            color: "rgba(255, 255, 255, .2)",
            cursor: 'no-drop'
        }
    },
    submitpart: {
        display: 'inline-block',
        transform: 'translateX(-50%)',
        marginLeft: '40%'
    },
    submitbutton: {
        backgroundImage: 'linear-gradient(-135deg,#f71c7a 0,#faa061 100%)'
    },
    keyboardIconbutton: {
        padding: '5px',
        trasitionDuration: '.5s',
        color: 'white',
        marginRight: '10px',
        float: 'right',
        '&:hover': {
            background: 'rgba(255, 255, 255, .2)',
            boxShadow: "0px 0px 5px black"
        },
        '&:hover svg': {
            transform: 'scale(1.1)'
        },
        '& svg': {
            transitionDuration: '1.5s'
        },
        '&:disabled': {
            color: "rgba(255, 255, 255, .2)",
            cursor: 'no-drop'
        }
    },
    keyboardModalClose: {
        float: 'right',
        color: 'black',
        position: 'absolute',
        margin: '5px',
        top: 0,
        right: 0
    },
    modalTitle: {
        borderBottom: "3px solid black",
        "& p": {
            fontSize: '20px',
            fontWeight: "bolder",
            textAlign: "center",
            fontFamily: 'Roboto,sans-serif',
            color: '#0a1441',
            margin: '0px'
        }
    },
    keyboardList: {
        padding: '0px 60px',
        "& h2": {
            margin: '10px 0px 0px 0px'
        },
        "& hr": {
            margin: '0px 0px 10px 0px'
        },
        "& span:first-child": {
            padding: '3px 8px',
            background: 'linear-gradient(to bottom,#e6f5f8,#b6e3ed)',
            marginRight: "3px",
            fontSize: ".9rem",
            fontWeight: "700",
            borderRadius: "3px",
            color: '#0a1441'
        }
    },
    hrclass: {
        width: '50px',
        height: '2px',
        background: 'rgb(20, 49, 220)'
    }
}

export default contentfooter;