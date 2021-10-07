import React from 'react';
import { Route } from 'react-router';
import { Blogs, Home, PostBlogs } from '../pages';


const ROUTES=[{
    path:'/',
    component:Home
},
{
    path:'/blogs',
    component:Blogs
},
{
    path:'/post-blogs',
    component:PostBlogs
}
]

const Routes = () => {
    return (
        <>
           {ROUTES.map((route,index) => {
               <Route
               key={index}
               exact
               path={route.path}
               component={route.component}
               />
           })} 
        </>
    );
};

export default Routes;