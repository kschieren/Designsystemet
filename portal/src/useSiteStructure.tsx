import { graphql, useStaticQuery } from "gatsby";

const usePages = () =>
  useStaticQuery(graphql`
    query AllMdx {
      allMdx(sort: { fields: frontmatter___rank }) {
        edges {
          node {
            slug
            frontmatter {
              title
              rank
              ingress
            }
          }
        }
      }
    }
  `).allMdx.edges.map((edge) => ({
    ...edge.node.frontmatter,
    slug: edge.node.slug,
    link: `/${edge.node.slug}`,
  }));

export const useMainMenu = () =>
  usePages().filter(
    ({ rank, slug }) => rank !== null && slug.split("/").length === 1
  );

export const usePageMenu = (location) =>
  usePages().filter(
    ({ slug }) =>
      slug.split("/").length === 2 &&
      slug.split("/")[0] === location.pathname.split("/")[1]
  );

export const useContentPage = (location) => {
  const pages = usePages();

  const page = pages.find(
    ({ slug, link }) =>
      slug.split("/").length === 2 && location.pathname.startsWith(link)
  );

  return page
    ? {
        ...page,
        children: pages.filter(
          ({ slug }) =>
            slug.split("/").length === 3 &&
            slug.startsWith(location.pathname.split("/").slice(1, 3).join("/"))
        ),
      }
    : undefined;
};
