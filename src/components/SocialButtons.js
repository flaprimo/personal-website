import React from "react";
import { SocialIcon } from "react-social-icons";
import ConfSocial from "../../conf/conf-social";

// http://jaketrent.github.io/react-social-icons/
// https://reactjs.org/docs/lists-and-keys.html

const socialStyle = {
  listStyleType: "none",
  margin: "0",
  padding: "0"
};

const listSocial = ConfSocial.map((social, i) =>
  <li key={i} style={{ display: "inline-block", marginRight: "10px" }}>
    <SocialIcon url={social.baseurl + social.user}
                color="#ff5a01"
                style={{ height: 40, width: 40 }}/>
  </li>
);

const SocialButtons = () => (
  <div>
    <ul style={socialStyle}>
      {listSocial}
    </ul>
  </div>
);

export default SocialButtons;