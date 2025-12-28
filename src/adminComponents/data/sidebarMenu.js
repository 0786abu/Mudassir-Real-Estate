import { Airplay, BarChart, CreditCard, Grid, Layout, Lock, MapPin, UserPlus, Users } from "react-feather";

export const SidebarMenuItem = [
    {
        title: 'Dashboard',
        icon: <Airplay />,
        type: 'link',
        path: "/admin/dashboard"
    },
    {
        title: 'Properties',
        icon: <Grid />,
        type: 'sub',
        children: [
            {
                path: "/admin/dashboard/create-property",
                title: 'Add Propery',
                type: 'link'
            },
            {
                path: "/myproperties/edit-property",
                title: 'Edit Propery',
                type: 'link'
            },
            {
                path: "/admin/dashboard/myProperties",
                title: 'My Property',
                type: 'link'
            },
            {
                path: "/admin/dashboard/allProperties",
                title: 'All Property',
                type: 'link'
            },
            {
                path: "/admin/dashboard/favouriteProperties",
                title: 'Favourites',
                type: 'link'
            }
        ]
    },
    {
        title: 'Manage users',
        icon: <Users />,
        type: 'sub',
        children: [
            {
                path: "/admin/dashboard/allUsers",
                title: 'All Users',
                type: 'link'
            },
            {
                path: "/admin/dashboard/add-user",
                title: 'Add User',
                type: 'link'
            }
        ]
    },
    {
        title: 'Agents',
        icon: <UserPlus />,
        type: 'sub',
        children: [
            {
                path: "/admin/dashboard/allAgents",
                title: 'All Agents',
                type: 'link'
            },
            {
                path: "/admin/dashboard/add-agent",
                title: 'Add Agent',
                type: 'link'
            }
        ]
    },
    // {
    //     title: 'Map',
    //     icon: <MapPin />,
    //     type: 'link',
    //     path: "/map"
    // },
    // {
    //     title: 'Types',
    //     icon: <Layout />,
    //     type: 'sub',
    //     children: [
    //         {
    //             path: "/types/family-house",
    //             title: 'Family House',
    //             type: 'link'
    //         },
    //         {
    //             path: "/types/cottage",
    //             title: 'Cottage',
    //             type: 'link'
    //         },
    //         {
    //             path: "/types/appartment",
    //             title: 'Appartment',
    //             type: 'link'
    //         },
    //         {
    //             path: "/types/condominium",
    //             title: 'Condominium',
    //             type: 'link'
    //         }
    //     ]
    // },
    {
        title: 'Admins',
        icon: <Lock />,
        type: 'sub',
        children: [
            {
                path: "/admin/dashboard/allAdmins",
                title: 'All Admins',
                type: 'link'
            },
            {
                path: "/admin/dashboard/add-admin",
                title: 'Add Admin',
                type: 'link'
            }
        ]
    },
    {
        title: 'Payments',
        icon: <CreditCard />,
        type: 'link',
        path: "/admin/dashboard/payments"
    }
    // {
    //     title: 'Authentication',
    //     icon: <Lock />,
    //     type: 'sub',
    //     children: [
    //         {
    //             path: "/authentication/login",
    //             title: 'LogIn',
    //             type: 'link'
    //         },
    //         {
    //             path: "/authentication/signup",
    //             title: 'Sign Up',
    //             type: 'link'
    //         },
    //         {
    //             path: "/authentication/404",
    //             title: '404',
    //             type: 'link'
    //         }
    //     ]
    // }
]