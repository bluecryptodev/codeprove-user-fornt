
const courseContent = {
    container: {
        '& *': {
            fontFamily: "Roboto,sans-serif"
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
        minHeight: '60vh',
        backgroundRepeat: 'none',
        backgroundSize: '100%',
        backgroundColor: '#e1e7ee',
        padding: '50px'
    },
    doubtTab: {
        width: '50%'
    },
/************************************************                  Comment                  **************************************************/ 
    CloseButton: {
        float: 'right',
        marginTop: '-85px',
        marginRight: '-25px'
    },
    courseOverFlowContent: {
        padding: '0px 100px'
    },
    courseCommentLock: {
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& svg': {
            fontSize: '200px',
            color: 'rgba(0,0,0,0.1)'
        },
        '& h1': {
            color: 'rgba(0,0,0,0.1)'
        }
    },
    lockscreen: {
        background: 'white',
        boxShadow: '0 0 20px 0 rgba(0,0,0,.06)',
        width: '310px',
        minHeight: '350px',
        padding: '16px',
        '& h3': {
            color: '#565656'
        },
        '& p': {
            margin: '0px',
            fontWegith: '500',
            fontSize: '12px',
            textAlign: 'center'
        }
    },
    commentList: {
        padding: '0px'
    },
    LikeButton: {
        transition: 'width .35s ease-in-out',
        cursor: 'pointer',
        color: '#ed4a64',
        marginRight: '20px',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    LikeListButton: {
        color: '#ed4a64',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    commentHeader: {
        padding: '30px 30px 0px',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    userInfoPart: {
        display: 'flex',
        alignItems: 'center',
        float: 'left',
        "& img": {
            width: '50px'
        }
    },
    postTitlePart: {
        display: 'flex',
        '& .title-button': {
            padding: '10px',
            background: '#d6d6d6',
            fontSize: '12px'
        },
        '& .title-input': {
            padding: '0px 10px',
            background: '#f2f2f2',
            fontSize: '12px',
            width: '90%'
        }
    },
    postContent: {
        '& p': {
            color: '#a0a0a0',
            fontWeigth: 'bold'
        },
        '& .title-input': {
            padding: '10px 10px',
            background: '#f2f2f2',
            fontSize: '12px',
            width: '100%'
        }
    },
    commentButton: {
        float: 'right'
    },
    commentContent: {
        padding: '0px 30px',
        '& p': {
            margin: '0px'
        },
        '& .comment-title': {
            fontSize: '14px',
            fontWeight: 'bolder'
        },
        '& .comment-content': {
            color: 'grey',
            fontSize: '12px'
        }
    },
    addComment: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 30px',
        background: '#fafafa',
        '& img': {
            width: '50px',
        },
        '& form': {
            width: '100%'
        },
        '& .input': {
            padding: '5px',
            background: '#f2f2f2',
            width: '90%',
            borderRadius: '50px'
        }
    },
    topBachMembers: {
        display: 'flex',
        '& .order-number': {
            fontSize: '60px',
            color: '#a8bdd1',
            position: 'absolute',
            fontWeight: 'bolder',
            marginTop: '-38px',
            marginLeft: '-5px'
        },
        "& .top-rank-tab": {
            textAlign: 'center'
        },
        '& .first-place': {
            padding: '20px 20px',
            background: 'linear-gradient(to bottom,#fff,#f6f6f4)'
        },
        '& .first-avatar-img': {
            width: '90px',
            height: '90px'
        },
        '& .avatar-img': {
            position: 'relative'
        }
    },
    rankingList: {
        '& .avatar-img': {
            marginRight: '10px'
        }
    },
/************************************************                  LectureList                  **************************************************/ 
    courseTab1: {
        width: '80%',
        margin: 'auto',
        background: '#4cb1f7',
        "& span": {
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold'
        },
        "& .Mui-selected": {
            background: '#0233cb',
            "& span": {
                color: 'white'
            }
            
        }
    },
    courseContent1: {
        background: 'white',
        boxShadow: '0 4px 18px 0 rgba(0,0,0,.08)',
        borderRadius: '5px',
        width: "370px",
        cursor: 'pointer'
    },
    courseContent: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
    },
    courseProps: {
        width: '75%',
        '& .lecture-name': {
            margin: '0px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    },
    PropsList: {
        display: 'flex',
        '& p': {
            margin: '0px',
            fontSize: '12px'
        }
    },
    lectureImg: {
        width: '70px',
        height: '70px',
        background: 'linear-gradient(-143deg,#a759ff 0,#37a5ff 100%)',
        borderRadius: '70px',
        '& img': {
            position: 'absolute',
            marginTop: '25px',
            marginLeft: '23px',
            width: '22px',
            height: '22px'
        },
        '& .current-tag': {
            position: 'absolute',
            marginTop: '-35px',
            marginLeft: '-4px'
        },
        '& .current-tag-trangle': {
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '10px solid black',
            width: '0px',
            marginLeft: '50%',
            transform: 'translateX(-50%)'
        },
        '& .current-tag-text': {
            background: 'black',
            fontSize: '12px',
            padding: '5px',
            color: 'white',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,.18)'
        }
    },
    lectureImgShadow: {
        position:'absolute',
        width: '40px',
        height: '40px',
        filter: 'blur(9px)',
        marginTop: '38px',
        marginLeft: '11px'
    },
    lectureStatus: {
        width: '24px',
        height: '24px',
        borderRadius:'24px',
        background: '#7ae10a',
        position: 'absolute',
        marginLeft: '50px',
        textAlign: 'center',
        "& svg": {
            color: 'white',
            fontSize: '14px'
        }
    },
    lectureStatusLock: {
        width: '24px',
        height: '24px',
        borderRadius:'24px',
        background: '#f5a623',
        position: 'absolute',
        marginLeft: '50px',
        textAlign: 'center',
        "& svg": {
            color: 'white',
            fontSize: '14px'
        }
    },
    lockIcon: {
        position: 'absolute',
        width: '70px',
        height: '70px',
        background: 'white',
        borderRadius: '70px',
        boxShadow: '4px 6px 12px grey',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '18px',
        marginLeft: '272px',
        zIndex: '2',
        '& svg': {
            fontSize: '50px'
        }
    },

    lectureListSkeleton: {
        display: 'flex',
        alignItems: 'center',
        width: '390px',
        background: 'white',
        padding: '10px',
        borderRadius: '5px'
    },
    addedCommentPard: {
        borderTop: '2px solid #f8f8f8',
        padding: '10px 30px',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        },
        '& .comment-content': {
            display: 'flex',
            float: 'left',
            '& p': {
                margin: 0
            },
            '& .name': {
                fontSize: '13px'
            },
            '& .content': {
                fontSize: '13px',
                color: '#9e9e9e'
            }
        },
        '& .post-date': {
            float: 'right',
            color: '#9e9e9e',
            fontSize: '13px'
        }
        
    },
    meOrder: {
        outlineStyle: "solid",
        outlineColor: "#f9336b",
        outlineWidth: "thin",
        borderLeft: "10px solid #f9336b",
        borderRight: "2px solid #f9336b",
    },
    bookmarkPart: {
        padding: '15px',
        borderRadius: '5px',
        border: '1px solid #cecece',
        background: 'white',
        cursor: 'pointer'
    },
    lectureInfo: {
        display: 'flex',
        alignItems: 'center',
        '& .icon-part': {
            width: 40, 
            height: 40,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '30px',
            marginRight: '10px'
        },
        '& p': {
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            width: '200px'
        }
    },
    lectureItemInfo: {
        marginTop: '4px',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: 40, 
            height: 40, 
            marginRight: '10px'
        },
        '& p': {
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            width: '200px',
            color: '#102a43'

        }
    },
    saveDate: {
        padding: '5px 10px',
        borderTop: '2px solid #ececec',
        '& p': {
            color: '#102a43',
            margin: '0px',
            fontWeight: 'bold'
        },
        '& strong': {
            color: 'black'
        }
    },
    bookMarkIcon: {
        float: 'right',
        position: 'relative',
        top: '-47px',
        color: '#f9336b',
        padding: '5px',
        background: '#ececec',
        borderRadius: '8px'
    },
    FQAPart: {
        padding: '12px 20px 10px',

    },
    FQAsPanel: {
        margin: '10px 0px',
        background: 'white',
        '&.Mui-expanded': {
            background: 'rgb(245, 245, 245)',
            border: 'none',
            boxShadow: 'none',
            '& .MuiExpansionPanelSummary-content p': {
                color: 'red'
            }
        }
    },
    contactPart: {
        padding: '12px 20px 10px',
        "& *": {
            margin: '0px'
        },
        "& p": {
            fontSize: '12px'
        },
        '& label': {
            lineHeight: '35px'
        },
        '& .subject-input': {
            width: '100%',
            padding: '5px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            color: '#f9336b'
        }
    },
    sendButton: {
        marginTop: '20px',
        background: 'linear-gradient(to bottom,#0554f2,#37648f)'
    },


    doubtContent: {
        
    },
    noDoubts: {
        padding: '50px',
        width: '100%',
        '& *': {
            textAlign: 'center'
        }
    },
    memberPart: {
        width: '210px',
        height: '214px',
        postion: '0 0 20px 0 rgba(0,0,0,.06)',
        background: 'white',
        cursor: 'pointer',
        '& .usr-avartar-img': {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            top: '-63px',
            '& .avartar-img': {
                margin: 'auto',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,.26)'
            },
            '& p': {
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: 'bold'
            }
        },
        '& .header': {
            width: '100%',
            height: '45%',
            overflow: 'hidden'
        }
    },
    backAvartar: {
        width: '100%!important',
        transform: 'scale(1.4)',
        filter: 'blur(3px)'
    },


    pauseButton: {
        background: '#ef7917',
        marginTop: '35px',
        fontSize: '20px',
        textTransform: 'none',
        padding: '16px 60px',
        color: 'white',
        borderRadius: '100px'
    },
    importantPart: {

    },
    modalTitle: {
        textAlign: 'center',
        borderBottom: '1px solid grey',
        '& h3': {
            margin: '0px'
        },

    },
    modalContent: {
        '& li': {
            marginBottom: '10px'
        },
        '& strong': {
            color: 'green'
        }
    },
    courseHistory: {
        '& .dot': {
            width: '10px',
            height: '10px',
            background: 'grey',
            borderRadius: '10px',
            marginRight: '15px',
            marginLeft: '-4px'
        },
        '& .history-list': {
            display: 'flex',
            height: '75px',
        },
        '& .history-date': {
            width: '93%',
            '& p': {
                margin: '0px',
                fontSize: '13px'
            },
            '& p:first-child': {
                color: 'grey',
                fontWeight: 'bolder'
            }
        },
        '& .dot-line': {
            height: '65px',
            borderLeft: '2px solid grey',
            float: 'left',
            marginTop: '-65px'
        },
        '& .dot-line-pause': {
            height: '65px',
            borderLeft: '2px dashed green',
            float: 'left',
            marginTop: '-65px'
        }
    },
    DoubteList: {
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.12), 0 7px 5px rgba(0,0,0,.14)',
        borderRadius: '10px',
        '& .doubt_header': {
            padding: '15px',
            '&:after': {
                content: '""',
                clear: 'both',
                display: 'block'
            },
            '& h4': {
                margin: '0px',
            },
            '& p': {
                margin: '0px',
                fontSize: '11px',
                color: '#424242'
            }
        },
        '& .doubt_content': {
            padding: '0px 15px 15px',
            '& p': {
                margin: '0px'
            },
            '& .description': {
                color: '#757575',
                fontSize: '13px'
            },
            '& .lecture-type': {
                marginTop: '10px',
                color: '#757575',
                textTransform: 'uppercase'
            },
            '& .item-name': {

            }
        },
        '& .footer': {
            textAlign: 'center',
            padding: '15px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#757575'
        }
    }
}

export default courseContent;