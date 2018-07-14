import React from 'react'
import Link from 'gatsby-link'

const menu = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'About',
        url: '/about'
    },
    {
        title: 'Contact',
        url: '/contact'
    }
];

const listMenu = menu.map((menuitem, i) =>
    <li key={i} style={{display: 'inline-block', marginRight: '10px'}}>
        <Link
            style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
            }}
            to={menuitem.url}
        >
            {menuitem.title}
        </Link>
    </li>
);

const Nav = ({ nav }) => (
    <ul>
        {listMenu}
    </ul>
);

export default Nav