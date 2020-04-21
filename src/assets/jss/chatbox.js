
const chatBox = {
    container: {
        position: 'fixed',
        bottom: '0px',
        right: '20px',
        boxShadow: '0 20px 40px 8px rgba(0,0,0,.25)',
        borderRadius: '5px 30px 0px 0px',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        // minHeight: '400px',
        background: 'white',
    },
    chatBoxHeader: {
        padding: '20px',
        borderRadius: '5px 30px 0px 0px',
        cursor: 'move',
        background: 'rgba(0, 0, 0, 0) linear-gradient(95deg, rgb(255, 94, 98) 20%, rgb(255, 153, 102) 80%) repeat scroll 0% 0%',
        '& p': {
            margin: '0px',
            color: 'white',
            fontWeight: 'bolder'
        }
    },
    chatBoxContent: {
        flex: '1 1 0',
        height: '250px',
        overflow: 'auto',
        '& p': {
            color: 'white',
            margin: '0px'
        },
        '& .field-input': {
            boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,.1)',
            borderRadius: '4px',
            border: '1px solid #ccc!important',
            height: '40px',
            width: '100%',
            padding: '0px 11px',
            marginBottom: 15
        },
        '& .field-input-msg': {
            boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,.1)',
            borderRadius: '4px',
            border: '1px solid #ccc!important',
            height: '100%',
            width: '100%',
            padding: '0px 11px',
            marginBottom: 15
        }
    },
    otherMsg: {
        background: '#dadada',
        float: 'left',
        padding: '10px',
        color: 'black!important',
        borderRadius: '5px'
    },
    meMsg: {
        background: '#445669',
        float: 'right',
        padding: '10px',
        borderRadius: '5px'
    },
    messageItem: {
        padding: '5px 15px',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    chatBoxFooter: {
        borderTop: '1px solid #d8dee3'
    },
    messageInput: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: "10px",
        flex: 1,
    },
    iconButton: {
        padding: 10,
        cursor: 'pointer'
    },
    divider: {
        height: 28,
        margin: 4,
    },
    fileIcon: {
        padding: '0px 10px'
    },
    iconGroup: {
        padding: '10px',
        boxShadow: '0 7px 14px 0 rgba(0,0,0,.12)',
        border: '1px solid #e0e4ed',
        position: 'relative',
        marginTop: '-208px',
        top: '-45px',
        background: 'white',
        float: 'right'
    },
    iconItem: {
        transition: "all 0.3s ease 0s",
        cursor: 'pointer',
        '&:hover': {
            background: '#e8e8e8'
        },
        '& span': {
            fontSize: '30px',
            textAlign: 'center'
        }
    },
    iconAllow: {
        border: '6px solid #fff',
        transform: 'rotate(-45deg)',
        width: '0px',
        height: '0px',
        position: 'relative',
        marginTop: '-12px',
        top: '16px',
        left: '49px'
    },
    chatCloseButton: {
        position: 'relative',
        marginTop: '-24px',
        top: '-27px',
        left: '-29px',
        cursor: 'pointer'
    },
    fileErrorMsg: {
        padding: '10px',
        boxShadow: '0 7px 14px 0 rgba(0,0,0,.12)',
        border: '1px solid #e0e4ed',
        position: 'relative',
    }
}

export default chatBox;