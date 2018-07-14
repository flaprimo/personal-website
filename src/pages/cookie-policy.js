import React, { Component } from 'react'
import Helmet from 'react-helmet'

class CookiePolicyPage extends Component {
    render() {
        const siteTitle = "Cookie Policy";

        return (
            <div>
                <Helmet title={siteTitle} />
                <div>
                    <h1>Cookie Policy</h1>
                    <p>This site uses cookies - small text files that are placed on your machine to help the site provide a better user experience.</p>
                    <p>In general, cookies are used to retain user preferences, store information for things like shopping carts, and provide anonymised tracking data to third party applications like Google Analytics.</p>
                    <p>As a rule, cookies will make your browsing experience better. However, you may prefer to disable cookies on this site and on others. The most effective way to do this is to disable cookies in your browser.</p>
                    <p>We suggest consulting the Help section of your browser or taking a look at <a href='http://www.aboutcookies.org'>the About Cookies website</a> which offers guidance for all modern browsers</p>
                </div>
            </div>
        );
    }
}

export default CookiePolicyPage;