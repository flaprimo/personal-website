import React from 'react'
import Link from 'gatsby-link'
import ConfMenu from "../../conf/conf-menu";

const listMenu = ConfMenu.map((menuitem, i) =>
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

const Nav = () => (
  <ul>
    {listMenu}
  </ul>
);

export default Nav