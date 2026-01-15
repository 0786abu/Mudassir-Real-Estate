import { Building2, MailCheck } from "lucide-react";
import { Airplay, BarChart, CreditCard, Grid, Layout, Lock, Mail, MapPin, UserPlus, Users } from "react-feather";

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
                path: "/admin/dashboard/allProperties",
                title: 'All Property',
                type: 'link'
            },
            {
                path: "/admin/dashboard/create-property",
                title: 'Add Property',
                type: 'link'
            },
            {
                path: "/admin/dashboard/myProperties",
                title: 'My Property',
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
        title: 'Users',
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
        title: 'Project',
        icon: <Building2 />,
        type: 'sub',
        children: [
            {
                path: "/admin/dashboard/addProject",
                title: 'Add Project',
                type: 'link'
            },
            {
                path: "/admin/dashboard/allProjects",
                title: 'All Projects',
                type: 'link'
            },
            {
                path: "/admin/dashboard/projectLeads",
                title: 'Project Leads',
                type: 'link'
            }
        ]
    },
    {
        title: 'Payments',
        icon: <CreditCard />,
        type: 'link',
        path: "/admin/dashboard/payments"
    },
    {
        title: 'Contacts',
        icon: <Mail />,
        type: 'link',
        path: "/admin/dashboard/contacts"
    },
    {
        title: 'Emails',
        icon: <MailCheck />,
        type: 'link',
        path: "/admin/dashboard/emails"
    },
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