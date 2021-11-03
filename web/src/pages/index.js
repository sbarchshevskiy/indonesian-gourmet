import React from "react";
import { graphql } from "gatsby";


import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;


  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

 

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (

    
    <Layout>

      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {projectNodes && (
          <ProjectPreviewGrid
            title="Latest projects"
            nodes={projectNodes}
            browseMoreHref="/archive/"
          />
        )}     
      </Container>
      <div style={{
        display: "flex", 
        justifyContent:"center",
        }}>
        <form
          style={{display: "flex",flexDirection:"column", marginBottom:"35px", minWidth:"305px"}}
          name="contact" 
          method="post" 
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          >
          <input
          style={{padding:"5px", margin:"5px", boxShadow:"0 0 7px 4px rgba(0,0,0,0.06)", border:"0", borderRadius:"10px"}} 
          name="name" 
          placeholder="name"
          type="text"
          />
          <input 
          style={{padding:"5px", margin:"5px", border:"0", boxShadow:"0 0 7px 4px rgba(0,0,0,0.06)", borderRadius:"10px"}} 
          name="email" 
          placeholder="email" 
          type="text"
          />
          <input
          style={{padding:"5px", margin:"5px", height:"40px", border:"0", boxShadow:"0 0 7px 4px rgba(0,0,0,0.06)", borderRadius:"10px"}} 
          name="message" 
          placeholder="message"
          type="text"
          />
          <button type="submit" style={{marginTop: "10px",border:"none", borderRadius:"10px", backgroundColor:"#3F51B5", color:"#fff"}}>Send</button>
        </form>
      </div>
    </Layout>   
  );
};

export default IndexPage;
