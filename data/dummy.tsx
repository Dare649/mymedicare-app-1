import { LuLayoutDashboard, LuUserRound } from "react-icons/lu";
import { MdOutlineCalendarMonth, MdOutlineFindInPage } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { CiWallet, CiSettings } from "react-icons/ci";
import { PiProjectorScreenChartThin, PiCoinsLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoCreditCard } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";




export const nav = [
    {
        title: "home",
        path: '#'
    },
    {
        title: "about",
        path: '#about'
    },
    {
        title: "contact",
        path: '#contact'
    },
    
];



export const patientNav = [
    {
        title: 'dashboard',
        icon: <LuLayoutDashboard size={25}/>,
        path: "/patient/dashboard",
        gap: false
    },

    {
        title: "schedules",
        icon: <MdOutlineCalendarMonth size={25}/>,
        path: "/patient/schedules",
        gap: false
    },
    {
        title: "records",
        icon: <PiProjectorScreenChartThin size={25}/>,
        path: "/patient/records",
        gap: false
    },
    {
        title: "medications",
        icon: <GiMedicines size={25}/>,
        path: "/patient/medications",
        gap: false
    },
    {
        title: "transactions",
        icon: <CiWallet size={25}/>,
        path: "/patient/transactions",
        gap: false
    },
    {
        title: "settings",
        icon: <CiSettings size={25}/>,
        path: "/patient/settings",
        gap: true
    },
]



export const professionalNav = [
    {
        title: "dashboard",
        icon: <LuLayoutDashboard size={25}/>,
        path: "/professional/dashboard",
        gap: false
    },
    {
        title: "schedule",
        icon: <MdOutlineCalendarMonth size={25}/>,
        path: "/professional/schedule",
        gap: false
    },
    {
        title: "people",
        icon: <CgProfile size={25}/>,
        path: "/professional/people",
        gap: false
    },
    {
        title: "chat",
        icon: <IoChatbubbleEllipsesOutline size={25}/>,
        path: "/professional/chat",
        gap: false
    },
]


export const partnerNav = [
    {
        title: "dashboard",
        icon: <LuLayoutDashboard size={25}/>,
        path: "/partner/dashboard",
        gap: false
    },
    {
        title: "patients",
        icon: <CgProfile size={25}/>,
        path: "/partner/patients",
        gap: false
    },
    {
        title: "branches",
        icon: <CgProfile size={25}/>,
        path: "/partner/branches",
        gap: false
    },
    // {
    //     title: "remote monitoring",
    //     icon: <MdOutlineCalendarMonth size={25}/>,
    //     path: "/partner/remote-monitoring",
    //     gap: false
    // },
    // {
    //     title: "billing",
    //     icon: <IoChatbubbleEllipsesOutline size={25}/>,
    //     path: "/partner/billing",
    //     gap: false
    // },
    {
        title: "settings",
        icon: <CiSettings size={25}/>,
        path: "/partner/settings",
        gap: true
    },
    
]

export const bracnchPartnerNav = [
    {
        title: "dashboard",
        icon: <LuLayoutDashboard size={25}/>,
        path: "/branch/dashboard",
        gap: false
    },
    {
        title: "patients",
        icon: <CgProfile size={25}/>,
        path: "/branch/patients",
        gap: false
    },
    // {
    //     title: "remote monitoring",
    //     icon: <MdOutlineCalendarMonth size={25}/>,
    //     path: "/branch/remote-monitoring",
    //     gap: false
    // },
    // {
    //     title: "billing",
    //     icon: <IoChatbubbleEllipsesOutline size={25}/>,
    //     path: "/branch/billing",
    //     gap: false
    // },
    {
        title: "settings",
        icon: <CiSettings size={25}/>,
        path: "/branch/settings",
        gap: true
    },
    
]


export const adminNav = [
    {
        title: "dashboard",
        icon: <LuLayoutDashboard size={25}/>,
        path: "/admin/dashboard",
        gap: false
    },
    // {
    //     title: "consultations",
    //     icon: <MdOutlineCalendarMonth size={25}/>,
    //     path: "/admin/consultations",
    //     gap: false
    // },
    // {
    //     title: "prescriptions",
    //     icon: <CgProfile size={25}/>,
    //     path: "/admin/prescriptions",
    //     gap: false
    // },
    // {
    //     title: "investigations",
    //     icon: <IoChatbubbleEllipsesOutline size={25}/>,
    //     path: "/admin/investigations",
    //     gap: false
    // },
    // {
    //     title: "users",
    //     icon: <IoChatbubbleEllipsesOutline size={25}/>,
    //     path: "/admin/users",
    //     gap: false
    // },
    {
        title: "users",
        icon: <IoChatbubbleEllipsesOutline size={25}/>,
        path: "/admin/users",
        gap: false
    },
    {
        title: "partners",
        icon: <IoChatbubbleEllipsesOutline size={25}/>,
        path: "/admin/partners",
        gap: false
    },
    // {
    //     title: "subscriptions",
    //     icon: <IoChatbubbleEllipsesOutline size={25}/>,
    //     path: "/admin/subscriptions",
    //     gap: false
    // },
]




export const heroText = [
    'quick access', 'healthcare', 'monitoring', 'personalized', 'technology'
];


export const skipText = [
    'quick access', 'virtual consultations', 'no queues', 'time saving', 'home care'
]


export const price1 = [
    'record your vitals', 'track your response to treatment', 'professional remote monitoring', 'monthly repoort'
]

export const price2 = [
    'virtual consultation', 'request lab tests', 'request prescription'
]


export const faq = [
    {
        qst: 'How do I sign up',
        ans: 'Download the app from the Play Store or App Store, create an account, and enter your referral code (if you have one).'
    },
    {
        qst: 'What can I do with this app?',
        ans: 'You can log blood pressure and blood sugar readings, get insights and reminders, and share progress with your doctor.'
    },
    {
        qst: 'How does this app help my doctor?',
        ans: ' It allows your doctor to view your readings remotely and make informed decisions between visits.'
    },
    {
        qst: 'Can I use the app without a doctor?',
        ans: 'Yes, you can use it for personal tracking. Having a doctor linked just enhances the support you receive.'
    },
    {
        qst: 'Who can see my health information?',
        ans: 'Only you and the health professional you choose to share it with. We never sell or share your data with third parties.'
    },
]



export const footerNav = [
    {
        title: 'home',
        path: '#'
    },
    {
        title: 'about',
        path: '#about'
    },
    {
        title: 'privacy policy',
        path: ''
    },
    {
        title: 'plans',
        path: ''
    },
    {
        title: 'contact us',
        path: '#contact'
    },
    {
        title: 'terms of service',
        path: ''
    },
  
]


export const adminDashboardAnalytics = [
    {
        title: 'missed appointments',
        icon: <MdOutlineCalendarMonth size={23.33}/>,
        figure: '20 appointments',
        rate: '+80%'
    },
    {
        title: 'user approval',
        icon: <LuUserRound size={23.33}/>,
        figure: '20 accounts',
        rate: '+80%'
    },
    {
        title: 'pending payments',
        icon: <GoCreditCard size={23.33}/>,
        figure: '20 payments',
        rate: '+150%'
    },
    {
        title: 'unfulfiled deliveries',
        icon: <TbTruckDelivery size={23.33}/>,
        figure: '20 orders',
        rate: '+20%'
    },
]

export const partnerDashboardAnalytics = [
    {
        title: 'total patients',
        icon: <img src="/userfour.png" alt="mymedicare" />,
        figure: '1240 patients',
        rate: '+80%'
    },
    {
        title: 'user approval',
        icon: <LuUserRound size={23.33}/>,
        figure: '20 accounts',
        rate: '+80%'
    },
    {
        title: 'pending payments',
        icon: <GoCreditCard size={23.33}/>,
        figure: '20 payments',
        rate: '+150%'
    },
    // {
    //     title: 'unfulfiled deliveries',
    //     icon: <TbTruckDelivery size={23.33}/>,
    //     figure: '20 orders',
    //     rate: '+20%'
    // },
]


export const adminDashboardSummary = [
    {
        title: 'total consultations',
        icon: <img src="/consultations.png" alt="mymedicare" />,
        figure: 39001,
        rate: '+80%'
    },
    {
        title: 'total prescription',
        icon: <img src="/Outline.png" alt="mymedicare" />,
        figure: 45,
        rate: '+80%'
    },
    {
        title: 'active subscriptions',
        icon: <img src="/subscription.png" alt="mymedicare" />,
        figure: 392,
        rate: '+150%'
    },
    {
        title: 'total clients',
        icon: <img src="/userfour.png" alt="mymedicare" />,
        figure: 4000,
        rate: '+20%'
    },
    {
        title: 'investigations',
        icon: <img src="/cross.png" alt="mymedicare" />,
        figure: 20,
        rate: '+20%'
    },
]


export const riskyPatients = [
    {
        name: 'aminat danjuma',
        tracking: [
           {track: "blood sugar"},
            {track: "blood pressure"},
            {track: "food"},
           {track: "weight"}
        ],
        img: <img src="/r1.png" alt="" />
    },
    {
        name: 'chisom okonkwo',
        tracking: [
           {track: "blood sugar"},
            {track: "blood pressure"},
            {track: "food"},
        ],
        img: <img src="/r2.png" alt="" />
    },
    {
        name: 'uchechi amm',
        tracking: [
           {track: "blood sugar"},
            {track: "blood pressure"},
        ],
        img: <img src="/r3.png" alt="" />
    },
    {
        name: 'praise oluomachi',
        tracking: [
           {track: "blood sugar"},
            {track: "blood pressure"},
            {track: "food"},
           {track: "weight"}
        ],
        img: <img src="/r1.png" alt="" />
    },
    {
        name: 'praise isibo',
        tracking: [
           {track: "blood sugar"},
            {track: "food"},
           {track: "weight"}
        ],
        img: <img src="/r2.png" alt="" />
    },
]


