import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class AboutPage extends Component {
    render() {
        const siteTitle = "About";

        return (
            <Layout location={this.props.location}>
                <Helmet title={siteTitle} />
                <div>
                    <h2>About</h2>
                    <p>I am <b>Flavio Primo</b> an Italian web developer with a bachelor's degree in computer science and engineering at <a target="_blank" href="http://www.uniroma3.it/">Università degli Studi Roma Tre</a>.</p>
                    <p>I am currently studying for a master's degree in computer science and engineering at <a target="_blank" href="https://www.polimi.it/">Politecnico di Milano</a>.</p>
                    <p>I enjoy reading news about technology and politics, watching movies and TV series (my favorites are SciFi and thought provoker genres), listening to music (pretty much anything), travelling, running, reading books and having Belgian ales with my friends.</p>
                    <p>I'm a firm supporter of open-source software and technologies.</p>
                </div>
            </Layout>
        );
    }
}

export default AboutPage;