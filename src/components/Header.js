import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, subtitle }) => (
  <header className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
      </div>
    </div>
  </header>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};


// import React from "react";
// import { StaticQuery, graphql, Link } from "gatsby";
// import PropTypes from "prop-types";

// const Header = ({ data }) => (
//   <header className="hero is-dark">
//     <div className="hero-body">
//       <div className="container">
//         <Link
//           style={{
//             boxShadow: "none",
//             textDecoration: "none",
//             color: "inherit"
//           }}
//           to={"/"}
//         >
//           <h1 className="title">{data.site.siteMetadata.title}</h1>
//         </Link>
//
//         <h2 className="subtitle">{data.site.siteMetadata.description}</h2>
//       </div>
//     </div>
//   </header>
// );
//
// /* Query */
// export default props => (
//   <StaticQuery
//     query={graphql`
//       query HeaderQuery {
//         site {
//           siteMetadata {
//             title
//             description
//           }
//         }
//       }
//     `}
//     render={data => <Header data={data} {...props} />}
//   />
// )
//
// Header.propTypes = {
//   data: PropTypes.shape({
//     site: PropTypes.shape({
//       siteMetadata: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired
//       }).isRequired
//     }).isRequired
//   }).isRequired
// };
