
const courseContent = {
    container: {
        '& *': {
            fontFamily: "'Raleway', sans-serif!important"
        }
        
    },
    contentHeader: {
        padding: '40px'
    },
    courseIntro: {
        "& *": {
            color: 'white',
            fontFamily: 'Vidaloka, serif'
        },
        "& img": {
            width: '50px'
        }
    },
    buttonGroup: {
        position: 'relative',
        float: 'right',
        top: '50px',
        '& button': {
            display: 'inline-block'
        }
    },
    enrollButtonHeader: {
        background: 'linear-gradient(245deg,#5377d7,#2b29a1)',
        fontWeight: '600',
        color: 'white',
        marginRight: '20px',
        padding: '10px 40px'
    },
    freeButtonHeader: {
        background: 'linear-gradient(to bottom,#fda547,#fa6c22)',
        fontWeight: '600',
        color: 'white',
        padding: '10px 40px'
    },
    property: {
        "& *": {
            color: 'white',
            fontFamily: 'Vidaloka, serif',
            textAlign: 'center'
        },
        "& h2": {
            margin: '0px'
        }
    },
    scrollList: {
        margin: '30px',
        padding: '0px',
        width: '200px',
        
        "& .Mui-selected": {
            '&  span': {
                fontWeight: 'bolder',
            },
            "& span.MuiListItemText-primary": {
                padding: '5px 0px',
                borderBottom: '2px solid #fa6c22'
            }
        },
        "& .MuiList-padding": {
            padding: 0
        }
    },
    scrollListbutton: {
        "& *": {
            fontFamily: 'Vidaloka, serif'
        }
    },
    enrollButton: {
        background: 'linear-gradient(245deg,#5377d7,#2b29a1)',
        fontWeight: '600',
        color: 'white',
        width: '100%',
        marginTop: 10
    },
    freeButton: {
        background: 'linear-gradient(to bottom,#fda547,#fa6c22)',
        fontWeight: '600',
        color: 'white',
        width: '100%',
        marginTop: 10
    },
    topsupportList: {
        padding: '50px 100px',
        "& *": {
            fontFamily: 'Vidaloka, serif'
        },
        "& h1": {
            textAlign: 'center'
        }
    },
    topBar: {
        border: '2px solid #fa6c22',
        width: '100px',
        margin: 'auto'
    },
    useritemList: {
        display: 'flex',
        alignItems: 'center'
    },
    userAvartar: {
        width: '150px',
        height: '150px',
        borderRadius: '150px',
        overflow: 'hidden',
        margin: '0px 20px'
    },
    Curriculum: {
        padding: '100px 0px 0px',
        '& h1': {
            fontFamily: 'Vidaloka, serif',
            textAlign: 'center'
        }
    },
    curriculumList: {
        padding: '20px'
    },
    tabBar: {
        background: 'linear-gradient(to bottom,#fff,#f5f5f5)',
        display: 'flex',
        borderBottom: '3px solid #5377d7'
    },
    Tab: {
        padding: '10px',
        cursor: 'pointer',
        "& p:first-child": {
            margin: '0px 0px 10px 0px',
            color: '#5d5a5a',
            fontFamily: 'Vidaloka, serif'
        },
        "& p:nth-child(2)": {
            margin: '0px 0px 10px 0px',
            color: '#2a3c4d',
            fontSize: '18px',
            fontFamily: 'Vidaloka, serif'
        },
        "& p:nth-child(3)": {
            margin: '0px 0px 10px 0px',
            color: '#2a3c4d',
            fontSize: '13px',
            fontFamily: 'Roboto'
        }
    },
    TabSelect: {
        background: 'linear-gradient(20deg,#5377d7,#2b29a1)',
        transition: "all 0.3s ease 0s",
        '& *': {
            color: 'white!important'
        }
    },
    tabPanel: {
        boxShadow: '0 2px 16px 0 rgba(43,41,161,.12)',
        marginBottom: '36px',
        padding: '30px'
    },
    tabContent: {
        '& h3': {
            fontFamily: 'Vidaloka, serif',
            fontWeight: 'bolder'
        },
        '& p': {
            fontSize: '14px',
            fontFamily: 'Roboto'
        }
    },
    tagPart: {
        '& p': {
            display: 'inline-block',
            padding: '10px 20px',
            margin: '0px 10px 12px 0px',
            boxShadow: '0 2px 10px 0 rgba(12,16,39,.15)',
            borderRadius: '4px',
            color: '#fa6c22'
        }
    },
    highlight: {
        
    },
    highlightItem: {
        padding: "15px 8px",
        background: '#f5f0ff',
        borderRadius: '4px',
        display: 'inline-block',
        marginRight: '10px',
        width: '150px',
        "& h5": {
            fontSize: '20px',
            color: 'blue',
            margin: '0px',
            textAlign: 'center'
        },
        "& p": {
            color: '#464858',
            fontSize: '14px',
            margin: '10px 0px 0px',
            textAlign: 'center'
        }
    },
    batchItem: {
        background: '#e8e3f3',
        paddingTop: '12px',
        marginBottom: '10px',
        paddingBottom: '12px',
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both'
        },
        '& *': {
            fontFamily: 'Vidaloka, serif!important',
        }
    },
    startDate: {
        borderLeft: '4px solid #2b29a1',
        paddingLeft: '10px',
        "& p": {
            margin: '0px'
        },
        "& p:first-child": {
            fontSize: '12px'
        },
        "& p:last-child": {
            fontWeight: 'bold'
        }
    },
    priceList: {
        border: '12px solid #e8e3f3',
        padding: '10px 0px',
        background: 'white',
        '& p': {
            margin: '0px',
            fontWeight: 'bold',
            textAlign: 'center'
        },
        '& .old-price': {
            color: 'red',
            textDecorationLine: 'line-through'
        },
        '& .cont2': {
            fontSize: '13px',
            fontWeight: 'none',
        },
        '& .cont1': {
            fontSize: '11px',
            fontWeight: 'none',
        }
    },
    RegisterButton: {
        background: 'linear-gradient(to bottom,#fd9424,#e14d00)',
        color: 'white',
        fontFamily: 'Vidaloka, serif',
        fontSize: '12px',
        position: 'relative',
        textTransform: 'none',
        float: 'right',
        right: '12px',
        border: '1px solid #fa6c22',
        '&:hover': {
            background: 'linear-gradient(200deg,#5377d7,#2b29a1)',
            border: '1px solid blue',
        }
    },
    mostOpted: {
        position: 'relative',
        marginTop: "-18px",
        top: "-91px",
        float: "right",
        right: "10px",
        background: "#21ca76",
        padding: "8px 12px",
        fontSize: "10px",
        textTransform: "uppercase",
        borderRadius: "100px",
        fontWeight: 700
    },
    Career: {
        padding: '50px 20px',
        '& h1': {
            fontFamily: 'Vidaloka, serif',
            fontSize: '24px'
        }
    },
    courseLogoImg: {
        float: 'right',
        position: 'relative',

    },
    future: {
        position: 'relative',
        top: '-100px'
    },
    futureItem: {
        padding: '0px 15px',
        borderLeft: '4px solid #f0af38',
        '& h3': {
            fontFamily: 'Vidaloka, serif'
        }
    },
    features: {
        padding: '10px 20px',
        '& h1': {
            fontFamily: 'Vidaloka, serif',
            textAlign: 'center'
        }
    },
    featureItem: {
        cursor: 'pointer',
        padding: '15px 0px',
        borderBottom: '1px solid rgba(193,223,251,.63)',
        '& *': {
            margin: '0px'
        },
        '& h3': {
            borderLeft: '3px solid #fa6c22',
            paddingLeft: '10px',
            fontFamily: 'Vidaloka, serif',
        },
        '& p': {
            paddingLeft: '10px',
            fontSize: '14px'
        }
    },
    featureItemSelect: {
        boxShadow: '0 2px 16px 0 rgba(43,41,161,.14)',
    },
    featureImg: {
        boxShadow: '0 2px 16px 0 rgba(20,49,220,.12)'
    },
    studentReviews: {
        marginTop: '100px',
        '& h1': {
            fontFamily: 'Vidaloka, serif',
            textAlign: 'center'
        },
        '& p': {
            textAlign: 'center'
        }
    },
    reviewVideo_List: {
        padding: '0px 20px',
        position: 'relative',
        top: '-50px'
    },
    studentReviewsContent: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginTop: '100px'
    },
    reviewListHeader: {
        display: 'flex',
        alignItems: 'center',
        
        '& img': {
            width: '50px',
            borderRadius: '50px'
        },
        '& p': {
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: 'Vidaloka, serif'
        }
    },
    reviewList: {
        padding: '40px',
        height: '300px'
    },
    trackIntro: {
        border: '1px solid grey',
        borderRadius: '10px',
        margin: '50px 0px',
        padding: '20px',
        background: '#f9f9fb'
    },
    exploreButton: {
        border: '1px solid #fd9424',
        color: '#fd9424',
        marginTop: '32px'
    },
    askQuestion: {
        padding: '100px 20px',
        '& h2': {
            fontFamily: 'Vidaloka, serif'
        },
        '& .Mui-expanded': {
            background: 'white!important'
        }
    },
    FQAsPanel: {
        margin: '10px 0px',
        background: 'rgb(233, 233, 244)'
    },
    question: {
        fontSize: '18px',
        fontWeight: 'bold'
    },
    CurriculumCheck: {
        display: 'flex',
        alighItems: 'center',
        marginTop: '20px',
        '& h4': {
            margin: '0'
        }
    },
    CurriculumCheckButton: {
        border: '1px solid #fd9424',
        color: '#fd9424',
        marginLeft: '20px'
    },
    lectureModal: {
        padding: '0px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    lectureModalTitle: {
        padding: '10px',
        '& p': {
            margin: '0px',
            fontFamily: 'Vidaloka, serif',
            fontWeight: '100',
            fontSize: '16px'
        }
    },
    bottomBar: {
        borderBottom: '2px solid #fa6c23',
        width: '100px'
    },
    closeButton: {
        float: 'right',
        marginTop: '-27px',
        cursor: 'pointer'
    },
    lectureModalContent: {
        width: '700px',

    },
    lectureDivid: {
        marginBottom: '10px',
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
        }
    },
    lectureIcon: {
        float: 'left',
        background: '#f5f6fa',
        padding: '5px 10px',
        marginRight: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        '& svg': {
            fontSize: '30px',
            color: 'rgba(107, 106, 106, 0.87)',
            transition: "all 0.3s ease 0s",
        }
    },
    lectureContent: {
        float: 'left',
        background: '#f5f6fa',
        width: '85%',
        padding: '13px 10px',
        borderRadius: '4px',
        transition: "all 1s ease 1s",
        '& p.title': {
            margin: '0px',
            color: '#506a84',
            fontWeight: 'bold'
        },
        '& p.description': {
            fontSize: '14px'
        },
        '& li': {
            fontSize: '14px'
        }
    },
    lectureDivideSelect: {
        color: 'blue!important',
        '& svg': {
            transform: 'rotate(-180deg)',
            transition: "all 0.3s ease 0s",
            color: 'blue!important'
        }
    }
}

export default courseContent;