
const testlist = {
    container: {
        height: '100vh',
        boxShadow: "0px 5px 5px black",
        display: "flex",
        flexDirection: 'column'
    },
    header: {
        padding: '10px 20px 150px',
        "&::after": {
            content: '""',
            clear: 'both',
            display: "block"
        },

    },
    topicButton: {
        float: "left",

    },
    avatarImage: {
        float: "right",
        color: "white"
    },
    list: {
        background: 'white',
        marginTop: '-141px', 
        flex: '1'
    },
    titleContent: {
        padding: '10px 20px 10px 20px',
        borderBottom: '1px solid #ddd6d6',
        display: 'flex',
        alignItems: 'center',
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both'
        },
        '&:hover .box-shadow': {
            opacity: 0
        },
        '& .box-shadow': {
            width: '60px',
            height: '60px',
            position: 'absolute',
            filter: 'blur(18px)',
            marginTop: '20px',
            marginLeft: '25px',
            transition: '.6s',
            opacity: 1
        }
    },
    titleIcon: {
        backgroundImage: 'linear-gradient(-225deg, rgb(158, 251, 211) 0%, rgb(87, 233, 242) 48%, rgb(69, 212, 251) 100%)',
        width: '100px',
        height: '100px',
        boxShadow: '9px 8px 37px 0 rgba(0,0,0,.11)',
        borderRadius: '50%',
        float: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        positon: 'relative',
        zIndex: '1',
        '& img': {
            width: '35px',
            height: '35px'
        }
    },
    titletext: {
        width: '70%',
        float: "left",
        margin: '0px 0px 0px 10px',
        '& p': {
            margin: '0px'
        },
        '& span': {
            fontSize: '12px',
            color: '#ff517d'
        },
        '& p:first-child': {
            fontWeight: 'bolder',
            marginBottom: '10px',
        },
        '& p:last-child': {
            color: '#b4b4b4'
        }

    },
    listLecture: {
        fontSize: '20px',
        fontWeight: 'bolder',
        margin: '0px'
    },
    completPercent: {
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        margin: '0px 0px 0px 10px'
    },
    listContent: {
        padding: '0px',
        
        "&:after" : {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        "&:hover img": {
            transform: 'scale(1.2)',
        },
        "&:hover": {
            cursor: "pointer"
        }
    },
    submitMarkTrue: {
        width: '10px',
        height: "10px",
        borderRadius: "10px",
        background: '#0ae60a',
        filter: 'blur(1px)',
        float: 'left',
        margin: '10px 0px 0px 10px'
    },
    submitMarkFalse: {
        width: '10px',
        height: "10px",
        borderRadius: "10px",
        background: '#ff0225',
        float: 'left',
        margin: '10px 0px 0px 10px',
        filter: 'blur(1px)'
    },
    vertical: {
        borderLeft: "1px dashed grey",
        height: '30px',
        marginLeft: '18px',
        marginTop: '-5px'
    },
    listIcon: {
        width: '40px',
        height: '40px',
        float: 'left',
        "& img": {
            transitionDuration: '0.3s'
        }
    },
    listTitle: {
        float: 'left',
        marginLeft: "20px",
        '& p' : {
            fontSize: "12px",
            margin: '10px 0px 0px 0px'
        }
    },
    listCors: {
        float: 'right',
        '& p' : {
            fontSize: "12px",
            margin: '10px 0px 0px 0px',
            color: 'grey'
        }
    },
    listActive: {
        fontWeight: 'bolder',
        color: '#f71c7a'
    }
}

export default testlist;