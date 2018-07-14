import React from 'react'

import Header from '../components/header'
import Nav from '../components/nav'
import Footer from '../components/footer'

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
    render() {
        const { location, children } = this.props
        const rootPath = `${__PATH_PREFIX__}/`

        return (
            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: rhythm(24),
                    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                }}
            >
                <Header />
                <Nav />

                {children}

                <Footer />
            </div>
        )
    }
}

export default Template
