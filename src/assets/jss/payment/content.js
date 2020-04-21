
const classRoomContent = {
    Content1: {
        marginTop: '20px'
    },
    personalDetails: {
        padding: '20px',
        '& .title-text': {
            fontWeight: 'bolder'
        }
    },
    orderDetails: {
        marginTop: '10px',
        padding: '20px',
        '& .title-text': {
            fontWeight: 'bolder'
        },
        '& .details-content': {
            '& p': {
                margin: 0
            },
            '& p:first-child': {
                fontSize: '12px',
                color: 'grey'
            },
            '& p:last-child': {
                color: 'black'
            }
        }
    },
    paymentPart: {
        padding: '20px',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        '& .title-text': {
            fontWeight: 'bolder'
        },
        '& .content-row': {
            marginTop: '20px',
            '& *': {
                margin: 0
            },
            '&:after': {
                content: '""',
                clear: 'both',
                display: 'block'
            },
            '& .left': {
                float: 'left'
            },
            '& .right': {
                float: 'right',
                textAlign: 'center'
            },
            '& .add-payment': {
                color: 'rgba(0,0,0,.5)',
                fontSize: '14px',
                '& img': {
                    width: '20px',
                    position: 'relative',
                    top: '6px'
                }
            }
            
        },
        '& .color-red': {
            color: '#ff7d9d',
            float: 'right',
            textAlign: 'center',
            margin: 0
        },
        '& .pay-button': {
            background: 'linear-gradient(-152deg,#facd67 0,#ffa261 100%)',
            borderRadius: '100px',
            color: 'white',
            textTransform: 'none',
            marginTop: '45px'
        }
    }
}

export default classRoomContent;