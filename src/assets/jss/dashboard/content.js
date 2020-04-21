
const dashboardContent = {
    Content1: {
        marginTop: '20px'
    },
    classRoomList: {
        '& .header': {
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #ededed',
            padding: '10px',
            '& img': {
                width: '70px',
                marginRight: '20px'
            },
            '& .panel-type-title': {
                fontSize: '20px',
                fontWeight: 'bolder',
                margin: '0px 0px 15px'
            },
            '& .panel-type-des': {
                fontSize: '12px',
                color: '#777',
                margin: '0px'
            },
            '& .view-all-link': {
                fontSize: '12px',
                color: '#ff8e8e',
                marginTop: '10px'
            }
        },
        '& .content': {
            '& .content-list-item': {
                marginBottom: '10px',
                padding: '10px',
                display: 'flex',
                cursor: 'pointer'
            },
            '& img': {
                width: '50px',
                borderRadius: '50px',
                marginRight: '20px'
            },
            '& .name': {
                color: '#4a4a4a',
                fontSize: '13px',
                fontWeight: 'bold',
                margin: '0px',
            },
            '& .user-name': {
                fontSize: '11px',
                margin: '0px',
                color: '#8e8e8e'
            },
            '& .small-name': {
                fontSize: '11px',
                color: '#8e8e8e'
            },
            '& .course-img': {
                borderRadius: 3,
                background: '#797777'
            }
        }
    }
}

export default dashboardContent;