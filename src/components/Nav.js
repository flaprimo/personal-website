import React from "react";
import Link from "gatsby-link";
import ConfMenu from "../../conf/conf-nav";
import { withPrefix } from "gatsby-link";

class Nav extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
  }

  render() {
    const logo = withPrefix("/logo.svg");
    const listMenu = ConfMenu.map((menuitem, i) =>
      <Link key={i} className="navbar-item" to={menuitem.url}>
        {menuitem.title}
      </Link>
    );

    return (
      <nav className="navbar is-primary is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to={"/"}>
              <img style={{ "height": "28px" }} src={logo}/>
              &emsp;
              <b>Flavio Primo</b>
            </Link>
            <span className={"navbar-burger burger" + (this.state.visible ? " is-active" : "")}
                  onClick={this.toggleBurgerOnClick}>
            <span/>
            <span/>
            <span/>
          </span>
          </div>
          <div className={"navbar-menu" + (this.state.visible ? " is-active" : "")}>
            <div className="navbar-end">
              {listMenu}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.toggleBurgerOnResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.toggleBurgerOnResize);
  }

  toggleBurgerOnClick = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  toggleBurgerOnResize = () => {
    if (window.innerWidth > 1021) {
      this.setState({
        visible: false
      });
    }
  };
}

export default Nav;