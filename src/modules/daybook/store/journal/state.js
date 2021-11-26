

export default () => ({
    isLoading: true,
    entries:[
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Ut veniam consectetur minim consectetur dolor consectetur aliqua aute.',
            picture: null,
        },
        {
            id: new Date().getTime()+1500,
            date: new Date().toDateString(),
            text: 'Do exercitation consequat ut reprehenderit.',
            picture: null,
        },
        {
            id: new Date().getTime()+2000,
            date: new Date().toDateString(),
            text: 'Cillum officia in id id enim nisi eu irure pariatur consectetur consequat aute laboris nostrud.s',
            picture: null,
        }
    ]
})