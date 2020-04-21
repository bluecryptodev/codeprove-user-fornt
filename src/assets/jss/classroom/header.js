
const courseContent = {
    container: {
        '& *': {
            fontFamily: "Roboto,sans-serif"
        },
        padding: '50px 100px',
    },
    cardLecture: {
        padding: '10px',
        width: '290px',
        background: 'linear-gradient(to bottom,#3476f9,#3050b1)',
        borderRadius: '5px',
        boxShadow: '4px 6px 12px grey',
        display: 'inline-block',
        position: 'relative',
        transition: "all .3s ease 0s",
        '&:hover': {
            transform: 'scale(1)',
            zIndex: '10'
        }
    },
    cardLectureActive: {
        position: 'absolute',
        marginLeft: '-155px!important',
        zIndex: '2'
    },
    cardLectureActive1: {
        zIndex: '2'
    },
    cardLectureNonActive: {
        transform: 'scale(.8)'
    },
    cardLectureNonActive1: {
        transform: 'scale(.8)',
        marginLeft: '-155px!important'
    },
    cardLectureHover: {
        transform: 'scale(.8)'
    },
    coursePayStatus: {
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        '& .text': {
            float: 'left',
            '& h3': {
                margin: '50px 0px 0px'
            },
            '& p': {
                fontSize: '12px',
                margin: 0,
                fontWeight: '600'
            },
            '& p:last-child': {
                marginTop: '20px',
                color: 'green'
            }
        },
        '& .enroll-button': {
            float: 'right',
            marginTop: '70px',
            background: '#ef7917',
            color: 'white'
        }
    },
    processBarPart: {
        padding: '15px',
        borderRadius: '5px',
        background: '#fafafa',
        boxShadow: '8px 8px 8px #d3d3d3',
        position: 'relative',
        zIndex: '100'
    },
    processBar: {
        '& .mark-vertical': {
            height: '20px',
            borderRight: '2px solid red',
            width: '0px',
            marginTop: '-15px'
        },
        '& .process-text': {
            display: 'inline-block',
            padding: 5,
            borderRadius: '5px',
            background: 'black',
            fontSize: '12px',
            color: 'white',
            transform: 'translateX(-50%)'
        },
        '& .mark-trangle': {
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '10px solid black',
            width: '0px',
            transform: 'translateX(-50%)'
        }
    },
    pointAnimation: {
        width: '12px',
        height: '12px',
        borderRadius: '12px',
        border: '1px solid #f9336b',
        marginRight: '10px'
    },
    shareLink: {
        '& p': {
            margin: '1px'
        },
        '& .share-link-icon': {
            marginLeft: '20px'
        },
        '& svg': {
            fontSize: '50px'
        }
    },
    titlContent: {
        display: 'flex',
        alignItems: 'center',
        '& h4': {
            color: 'white',
            fontWeight: 'bolder',
            margin: '0px 0px 0px 15px',
            width: '70%'
        }
    },
    logoImg: {
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(359deg, rgb(134, 120, 255), rgb(77, 56, 255))',
        borderRadius: '60px',
        '& img': {
            width: '20px',
            height: '20px'
        }
    },
    lectureProps: {
        display: 'flex',
        marginTop: '15px'
    },
    prosPart: {
        width: '30%',
        '& p': {
            color: 'white',
            fontSize: '12px',
            fontFamily: 'Roboto,sans-serif!important',
            margin: '0px'
        },
        '& p:last-child': {
            fontWeight: 'bolder'
        }
    },
    classStatus: {
        marginTop: '10px',
        background: 'white',
        padding: '5px',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: '40px',
            height: '40px',
            marginRight: '10px'
        },
        '& p': {
            margin: 0,
            fontFamily: 'Roboto,sans-serif!important',
            fontSize: '12px'
        },
        '& p:first-child': {
            fontWeight: 'bolder',
            color: 'rgb(16, 42, 67)'
        }
    },
    courseTab: {
        background: '#efefef',
        "& span": {
            color: '#0233cb',
            fontSize: '18px',
            fontWeight: 'bolder'
        },
        "& .Mui-selected": {
            background: '#0233cb',
            "& span": {
                color: 'white'
            }
            
        }
    },
    tabPanel: {
        minHeight: '80vh',
        backgroundRepeat: 'none',
        backgroundSize: '100%'
    },
    certDownload: {
        marginTop: '-53px',
        position: 'relative',
        zIndex: '100',
        "& .download-part": {
            position: 'relative',
            display: 'inline-block',
            transform: 'translate(-50%, -50%)',
            '& p': {
                color: '#ff6c5c',
                fontSize: '11px',
                margin: '1px 0px'
            }
        },
        '& .download-button': {
            width: '25px',
            height: '25px',
            minHeight: '0px',
            background: '#ff6c5c',
            cursor: 'pointer',
            transition: 'all .3s ease 0s',
            '&:hover': {
                transform: 'scale(1.1)'
            }
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

export default courseContent;