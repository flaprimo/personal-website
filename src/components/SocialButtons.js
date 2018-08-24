import React from "react";
import { SocialIcon } from "react-social-icons";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

// http://jaketrent.github.io/react-social-icons/

const SocialButtons = ({ data }) => (
  <div>
    <ul style={{
      "listStyleType": "none",
      "margin": 0,
      "padding": 0
    }}>
      {data.site.siteMetadata.social.map((social, i) => (
        <li key={i} style={{ display: "inline-block", marginRight: "10px" }}>
          <SocialIcon url={social.baseurl + social.user}
                      color="#ff5a01"
                      style={{ height: 40, width: 40 }}/>
        </li>
      ))}
    </ul>
  </div>
);

/* Query */
export default props => (
  <StaticQuery
    query={graphql`
      query SocialButtonsQuery {
        site {
          siteMetadata {
            social {
              title,
              user,
              baseurl
            }
          }
        }
      }
    `}
    render={data => <SocialButtons data={data} {...props} />}
  />
)

SocialButtons.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        social: PropTypes.array.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};