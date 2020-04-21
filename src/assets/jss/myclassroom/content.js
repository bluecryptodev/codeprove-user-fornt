
const classRoomContent = {
    Content1: {
        marginTop: '50px'
    },
    classRoomList: {
        '& .enrollment-menu-text': {
            fontWeight: 'bolder',
            color: '#ff8f8e',
            fontSize: '13px',
            margin: '0px',
            padding: '15px',
        },
        '& .enrollment-menu-list': {
            padding: '15px',
            fontWeight: 'bolder',
            fontSize: '13px',
            cursor: 'pointer',
            color: '#888'
        },
        '& .active': {
            borderLeft: '5px solid #ea7120',
            marginLeft: '-5px',
            color: 'black'
        }
    },
    enrollmentContentList: {
        padding: '10px',
        '& h3': {
            margin: '0px',
            color: '#4a4a4a',
            fontSize: '16px'
        },
        '& .non-text': {
            fontSize: '20px',
            paddingBottom: '30px',
            borderBottom: '1px dotted black',
            color: 'rgba(0,0,0,.8)',
            textAlign: 'center'
        }
    },
    itemList: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '50px',
        '& .item-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: "40%",
            minHeight: '285px',
            background: 'linear-gradient(-133deg, rgb(33, 212, 253) 0%, rgb(97, 93, 255) 100%)',
            '& *': {
                fontFamily: 'Roboto,sans-serif',
                margin: '0px'
            },
            '& .course-name-text': {
                textAlign: 'center',
                fontSize: '45px',
                color: 'white',
                fontWeight: '100'
            },
            '& .course-batch-text': {
                textAlign: 'center',
                fontSize: '13px',
                color: 'white'
            },
            '& .course-pay-text': {
                textAlign: 'center',
                fontSize: '13px',
                color: 'rgba(255, 255, 225, .7)'
            }
        },
        '& .course-info': {
            width: '59%',
            padding: '15px',
            '& .course-name-text': {
                color: '#4a4a4a',
                fontSize: '18px'
            },
            '& .course-des-text': {
                color: '#4a4a4a',
                fontSize: '12px',
                lineHeight: '22px'
            },
            '& .course-batch-text': {
                fontSize: '12px'
            },
            '& .button-part': {
                marginTop: '55px',
                '&:after': {
                    content: '""',
                    clear: 'both',
                    display: 'block'
                },
                '& .classroom-enter-button': {
                    float: 'right',
                    border: '1px solid #fa7328',
                    color: '#fa7328'
                },
                '& .enroll-now-button': {
                    float: 'left',
                    background: '#fa7328',
                    color: 'white'
                }
            },
            
        }
    },
    priceList: {
        padding: '5px',
        border: '1px solid #bdbdbd',
        borderRadius: '10px'
    },
    modalTitle: {
        padding: '0px',
        backgroundSize: '100%',
        '& h2': {
            color: 'white',
            padding: 15,
            textAlign: 'center'
        }
    },
    batchItem: {
        background: '#e8e3f3',
        border: '1px solid #d0d0d0',
        borderRadius: '5px',
        marginTop: '10px',
        width: '500px',
        '& .item-content': {
            padding: '15px 10px 10px',
            '& p': {
                margin: '0px'
            },
            '&:after': {
                content: '""',
                clear: 'both',
                display: 'block'
            },
            '& .start-date': {
                float: 'left'
            },
            '& .price-list': {
                float: 'right',
                '& .new-price': {
                    fontSize: '18px',
                    fontWeight: 'bolder'
                },
                '& .old-price': {
                    fontSize: '16px',
                    color: 'red'
                }
            },
            '& .from-start': {
                textTransform: 'uppercase',
                fontSize: '12px'
            },
            '& .date-text': {
                fontSize: '18px',
                fontWeight: 'bolder'
            }     
        },
        '& .register-button': {
            background: '#ef7917',
            '& span': {
                color: 'white',
                fontWeight: 'bolder'
            }
        }
    }
}

export default classRoomContent;