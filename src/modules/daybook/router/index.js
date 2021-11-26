

export default {
    name: 'daybook',
    component: () => import(/* webpackChunkName: "DayBookLayout" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path:'',
            name:'no-entry',
            component: () => import(/* webpackChunkName: "daybook-NoEntrySelected" */ '@/modules/daybook/views/NoEntrySelected.vue'),
        },
        {
            path:':id',
            name:'entry',
            component: () => import(/* webpackChunkName: "daybook-entry" */ '@/modules/daybook/views/EntryView.vue'),
        }
    ]
}