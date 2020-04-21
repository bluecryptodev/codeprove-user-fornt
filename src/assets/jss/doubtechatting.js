
const chatBox = {
    content: {
        width: '330px',
        boxShadow: '0 4px 14px 0 rgba(62,62,62,.3)',
        background: 'white',
        display: 'inline-block',
        marginLeft: '10px',
        borderRadius: '5px 5px 0px 0px',
    },
    Header: {
        background: 'linear-gradient(to right,#f19939,#f9c96b)',
        borderRadius: '5px 5px 0px 0px',
        width: '330px',
        '& .header-title': {
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '15px',
            margin: '0px',
            cursor: 'pointer',

        },
        '& .icon-list': {
            float: 'right',
            marginTop: '-35px',
            '& svg': {
                color: 'white',
                fontSize: '17px',
                marginRight: '10px',
                cursor: 'pointer'
            }
        },
        '& .other-status': {
            display: 'flex',
            alignItems: 'center',
            '& p': {
                margin: 0,
                width: '60%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            }
        },
        '& .online-status': {
            width: '10px',
            height: '10px',
            borderRadius: '10px',
            marginRight: '10px',
            '&.online': {
                background: '#5dc26a'
            },
            '&.offline': {
                background: '#bec0c2'
            }
        },
        '& .loading-text': {
            padding: '15px',
            margin: 0
        },
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    messageContent: {
        height: '310px',
        width: '100%',
        overflow: 'overlay',
        '& .doubte-content': {
            background: '#efeffe',
            padding: '25px 15px',
            textAlign: 'center',
            marginBottom: '10px',
            '& p': {
                margin: 0,
                fontSize: '13px',
            },
            '& .title': {
                fontWeight: '600'
            },
            '& .description': {
                marginTop: '5px'
            }
        },
        '& .msg-description': {
            background: '#fff5c4',
            width: '60%',
            padding: '8px 5px',
            borderRadius: '5px',
            margin: 'auto',
            fontSize: '11px',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,.09)',
            marginBottom: '15px'
        },
        '& .message-list': {
            padding: '10px',
            '& .message-item': {
                '&:after': {
                    content: '""',
                    display: 'block',
                    clear: 'both'
                }
            },
            '& .message': {
                marginBottom: '10px',
            },
            '& .my-message': {
                '&:after': {
                    content: '""',
                    display: 'block',
                    clear: 'both'
                },
                '& .message-text': {
                    maxWidth: '60%',
                    float: 'right',
                    padding: '8px 12px',
                    borderRadius: '10px 10px 0px 10px',
                    background: 'linear-gradient(62deg,#fbab7e 0,#f7ce68 100%)',
                    margin: '0px 5px',
                    color: 'white',
                    fontSize: '13px'
                },
                '& .avatar': {
                    float: 'right'
                }
            },
            '& .other-message': {
                display: 'flex',
                '& .message-text': {
                    maxWidth: '60%',
                    padding: '8px 12px',
                    borderRadius: '10px 10px 10px 0px',
                    background: '#efefef',
                    margin: '0px 5px',
                    color: 'black',
                    fontSize: '13px'
                }
            }
        }
    },
    Footer: {
        borderTop: '1px solid grey',
        '& .sovle-part': {
            '& p': {
                color: '#ff8e8e',
                fontSize: '13px',
                textAlign: 'center'
            },
            '& .buttons-part': {
                textAlign: 'center',
                '& button': {
                    marginBottom: 10
                },
                '& button:last-child': {
                    marginLeft: 20
                }
            }
        },
        '& .solve-text': {
            background: '#2b364a',
            color: 'white',
            textAlign: 'center',
            padding: '15px'
        }
    },
    messageInput: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: "10px",
        flex: 1,
        fontSize: '12px'
    },
    iconButton: {
        padding: 10,
        cursor: 'pointer'
    },
    divider: {
        height: 28,
        margin: 4,
    },
}

export default chatBox;