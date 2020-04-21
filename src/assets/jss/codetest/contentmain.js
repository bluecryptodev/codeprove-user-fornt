
const contentmain = {
    content: {
        borderRight: '1px solid grey'
    },
    problemHeader: {
        padding: '10px'
    },
    buttonGroup: {
        borderRadius: '50px',
        boxShadow: '0px 0px 10px grey',
        display: 'inline-block',
        marginTop: '5px'
    },
    button: {
        borderRadius: '50px',
        padding: '10px 15px',
        
        display: 'inline-block',
        width: '50px',
        textAlign: 'center',
        color: 'grey',
        fontSize: '12px',
        fontWeight: 'bolder',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    buttonSelect: {
        backgroundImage: 'linear-gradient(-57deg,#ff7eb6 0,#fad952 100%)',
        color: 'white'
    },
    bootmarkbutton: {
        float: 'right'
    },
    problemContent: {
        padding: '10px',
        '& h3': {
            margin: '0px',

        },
        "& .send_feedback": {
            fontSize: '12px',
            color: '#ff8e8e',
            fontWeight: '500',
            paddingTop: '5px',
            cursor: 'pointer'
        }
    },
    tabPanel: {
        overflowY: 'visible!important',
        // overflowX: 'visible!important'
    },
    testResultSuccess: {
        borderLeft: '3px solid green'
    },
    problemText: {
        fontSize: '14px',
        color: '#626262',
        fontWeight: '400',
        lineHeight: '20px'
    },
    problemCode: {
        fontSize: '12px',
        color: '#626262',
        fontWeight: '400',
        lineHeight: '20px'
    },
    playButton: {
        width: '80px',
        height: '80px',
        float: 'right',
        marginTop: '-100px',
        marginRight: '20px',
        position: 'relative',
        zIndex: '100',
        borderRadius: '100%',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    puzzleContent: {
        padding: '20px'
    },
    puzzleHeader: {
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    puzzleTitle: {
        float: 'left',
        '& h3': {
            margin: 0,
            fontWeight: 'bolder'
        },
        '& span': {
            color: '#ff8e8e',
            marginTop: 5,
            fontSize: 12,
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    puzzleBookmarkButton: {
        float:'right',
        '& span': {
            color: '#ff8e8e'
        }
        
    },
    group: {
        marginTop: '40px',
        '& p': {
            fontWeight: 'bolder',
            margin: '0px'
        }
    },
    codepart: {
        borderRadius: '5px',
        background: '#f1f1f1',
        padding: '10px',
        marginTop: '5px'
    },
    sampleTest: {
        padding: '10px',
        background: '#f9f7f7',
        marginTop: '10px',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    sampleTestheader: {
        '& p': {
            fontWeight: 'bolder',
            float: 'left'
        },
        '& span': {
            fontSize: '13px',
            float: 'right',
            marginTop: '15px',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        '& *:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    footerButton: {
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    excuteButton: {
        float: 'right',
        borderRadius: '0px',
        background: '#38345f',
        border: '2px solid #d8d5d5'
    },
    resultPart: {
        padding: '5px',
        background: 'white',
        boxShadow: '1px 1px 3px grey',
        borderRadius: '3px',
        '& .textpart': {
            float: 'left'
        },
        '&:after': {
            content:'""',
            clear: 'both',
            display: 'block'
        }
    },
    testResult: {
        padding: '10px',
        background: '#f9f7f7',
        marginTop: '10px',
        transitionDuration: '1s',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    testResultheader: {
        
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    customresultPart: {
        '& p': {
            margin: '5px 0px'
        }
    },
    headerScore: {
        float: 'left',
        '& span': {
            color: 'grey',
            fontSize: '12px',
            margin: '0px'
        },
        '& p': {
            fontWeight: 'bolder',
            fontSize: '20px',
            margin: '0px',
            lineHeight: '15px'
        }
    },
    codeViewerbutton: {
        float: 'right',
        '& svg': {
            color: 'linear-gradient(-135deg,#f71c7a 0,#faa061 100%)'
        }
    },
    content1: {
        padding: '20px 0px 25px',
        borderBottom: '1px solid #dad6d6'
    },
    codeTag: {
        background: '#e8e8e8',
        borderRadius: '50px',
        display: 'inline-block',
        marginTop: '20px',
        '& p': {
            margin:'6px 15px',
            float: 'right'
        },
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both'
        }
    },
    codeTagIcon: {
        padding: '0px 6px',
        backgroundImage: 'linear-gradient(-143deg,#ff59a8 0,#b037ff 100%)',
        borderRadius: '50px',
        float: 'left',
        boxShadow: '3px 2px 6px 0 rgba(0,0,0,.15)',
        '& svg': {
            marginTop: '6px',
            color: 'white'
        }
    },
    timeTag: {
        background: '#e8e8e8',
        borderRadius: '50px',
        display: 'inline-block',
        marginTop: '20px',
        '& p': {
            margin:'6px 15px',
            float: 'right'
        },
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both'
        },
        marginRight: '10px'
    },
    timeIcon: {
        padding: '0px 6px',
        backgroundImage: 'linear-gradient(-143deg,#a759ff 0,#6486ff 60%,#37a5ff 100%)',
        borderRadius: '50px',
        float: 'left',
        boxShadow: '3px 2px 6px 0 rgba(0,0,0,.15)',
        '& svg': {
            marginTop: '6px',
            color: 'white'
        }
    },
    askModalheader: {
        padding: '0px!important'
    },
    codeViewer: {
        margin: '0px!important',
        height: '400px'
    },
    modalTitle: {
        background: '#3a3a3a',
        "& p": {
            padding: '5px',
            color: 'white'
        }
    },
    feedbackModalContent: {
        width: '500px'
    },
    sbmissionTab: {
        "& span": {
            color: '#d7d7d7',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            marginRight: '20px'
        }
    },
    sbmissionTabActive: {
        color: '#ff8e8e!important'
    }
}

export default contentmain;