import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import NextPrevElements from "../components/NextPrevElements";
import Tags from "../components/Tags";
import Gallery from "react-photo-gallery";
import Lightbox from "react-images";
// import Jimp from "calipers-jpeg";
import "flexbin/flexbin.css";
import Img from "gatsby-image";
import Header from "../components/Header";

class GalleryElementTemplate extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    const galleryElement = this.props.data.markdownRemark;
    const title = galleryElement.frontmatter.title;
    const category = galleryElement.frontmatter.category;
    const tags = galleryElement.frontmatter.tags;
    const date = galleryElement.frontmatter.date;
    const html = galleryElement.html;

    let galleryJson = [];
    this.props.data.allFile.edges.forEach((element, index) => {
      const image = element.node.childImageSharp.sizes;
      // Jimp.read(image.src, (err, lenna) => {
      //   if (err) throw err;
      //   lenna
      //     .resize(256, 256) // resize
      //     .quality(60) // set JPEG quality
      //     .greyscale() // set greyscale
      //     .write('lena-small-bw.jpg'); // save
      // });

      galleryJson.push({
        src: image.src,
        srcSet: image.srcSet.split(",\n"),
        alt: "image " + index,
        width: 4,
        height: 3
      });
    });

    // console.log(galleryJson);


    return (
      <Layout contentTitle={title} siteTitle={siteTitle}>
        <Header title={title} subtitle={date + " - " + category}/>

        <div className="container">

          <div className="content" dangerouslySetInnerHTML={{ __html: html }}/>

          <div style={{}}>
            {this.props.data.allFile.edges.map((image, i) => (
              <Img key={i} fluid={image.node.childImageSharp.sizes}
                   style={{
                     marginRight: "20px",
                     border: "1px solid hsla(0,0%,0%,0.2)",
                     padding: "2px"
                   }}/>
            ))}
          </div>

          {/*<Gallery photos={galleryJson} onClick={this.openLightbox}/>*/}
          <Lightbox images={galleryJson}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
          />

          <Tags tags={tags}/>

          <NextPrevElements type={"/gallery"} previous={previous} next={next}/>
        </div>
      </Layout>
    );
  }
}

export default GalleryElementTemplate;

export const pageQuery = graphql`
  query galleryElementQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
      }
    }
    allFile(filter: {
      sourceInstanceName: {eq: "gallery"},
      internal: {mediaType: {eq: "image/jpeg"}},
      absolutePath: {regex: $slug}
    }) {
      totalCount
      edges {
        node {
          childImageSharp {
            sizes(maxWidth: 400) {
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;

GalleryElementTemplate.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    markdownRemark: PropTypes.object.isRequired,
    allFile: PropTypes.object.isRequired
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    previous: PropTypes.object
  }).isRequired
};