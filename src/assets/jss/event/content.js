
const eventContent = {
    headerPart: {
        height: '100px',
        backgroundSize: '100%',
        margin: 'auto',
        padding: '50px',
        '& h1': {
            fontSize: '60px',
            fontWeight: 'bolder',
            margin: '0px',
            color: 'white'
        },
        '& p': {
            fontWeight: 'bolder',
            margin: '0px',
            color: 'white'
        }
    },
    eventLevel: {

    },
    Content: {
        padding: '70px',
        background: 'white',
        '& .event-grid': {
            padding: '10px'
        }
    },
    eventListItem: {
        '& .header': {
            backgroundSize: '100% 160px',
            height: '160px',
            '& .cover-color': {
                background: 'linear-gradient(-180deg,rgba(3,3,3,0) 0,#010101 100%)',
                height: '160px',
                width: '100%',
                position: 'relative',
                zIndex: '1',
                opacity: '.2'
            },
            '& img': {
                width: '100%',
                height: '160px',
                position: 'relative',
                marginTop: '-160px',
                top: '-14px'
            },
            '& .noti-message': {
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                background: 'white',
                width: '265px',
                boxShadow: '0 1px 11px 0 rgba(0,0,0,.11)',
                position: 'relative',
                zIndex: '3',
                margin: '-55px 20px 0 0',
                float: 'right',
                borderRadius: '2px',
                '& p': {
                    margin: '0px',
                    display: 'inline-block',
                    fontSize: '12px',
                    marginLeft: '20px'
                }
            }
        },
        '& .content': {
            padding: '20px',
            background: 'white',
            '& .title': {
                fontWeight: 'bolder',
                margin: '0px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            '& .event-info': {
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px',
                '& p': {
                    margin: '0px',
                    fontSize: '13px',
                    color: 'rgba(28,28,28,.6)',
                    '& strong': {
                        color: 'black!important'
                    }
                }
            },
            '& .vertical-line': {
                borderTop: '1px solid #efe8e8',
                width: '100%',
                marginTop: '20px'
            },
            '& .description-text': {
                height: '60px',
                marginTop: '10px',
                '& p': {
                    margin: 0,
                    fontSize: '14px',
                    color: '#9f9f9f'
                }
            }
        },
        '& .footer': {
            padding: '10px 0px',
            borderTop: '1px solid #efe8e8',
            '&:after': {
                content: '""',
                clear: 'both',
                display: 'block'
            },
            '& .user-list': {
                display: 'flex',
                alignItems: 'center',
                '& p': {
                    margin: '0px',
                    fontSize: '12px',
                    color: 'rgba(28,28,28,.6)',
                    '& strong': {
                        color: 'black!important'
                    }
                }
            },
            '& img': {
                float: 'right',
                width: '150px',
                position: 'relative',
                cursor: 'pointer'
            },
            '& .register-button': {
                float: 'right',
                width: '150px',
                position: 'relative',
                background: 'linear-gradient(#6de7b4,#3bc97d)',
                fontSize: '12px',
                color: 'white',
                padding: '6px 14px',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
            }
        }
    }
}

export default eventContent;