import { fetchAPI } from "./fetcher";

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}
export async function getAllParishesWithSlug() {
  const data = await fetchAPI(`
    {
      parishes(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.parishes;
}

export async function getAllPostsForArchbishops(preview) {
  const data = await fetchAPI(
    `query  {
        pages(where: {title: "Archbishop"}) {
          edges {
            node {
              title
              content
              featuredImage {
                node {
                  sourceUrl
                }
              }
              archbishop {
                birthDate
                birthPlace
                consecratedBishop
                elevatedToTheCollegeOfCardinals
                ordainedPriest
                promotedArchbishop
              }
            }
          }
        }

      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }

    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}

export async function getAllPostsForArchdiocese(preview) {
  const data = await fetchAPI(
    `query  {
      pages(where: {title: "Archdiocese"}) {
        edges {
          node {
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      featuredStories(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
          }
        }
      }
      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }

    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}

export async function getAllPostsForCuria(preview) {
  const data = await fetchAPI(
    `
    query {
      theCuriaOfficials {
        edges {
          node {
            name
            description
            theCurias {
              edges {
                node {
                  title
                  profile {
                    email
                    occupation
                    order
                    phone
                  }
                }
              }
            }
          }
        }
      }
      collegeOfConsultatories {
        edges {
          node {
            name
            description
            databaseId
            theCurias {
              edges {
                node {
                  title
                  profile {
                    email
                    occupation
                    order
                    phone
                  }
                }
              }
            }
          }
        }
      }
      presbyterianCouncils {
        edges {
          node {
            name
            description
            databaseId
            theCurias {
              edges {
                node {
                  title
                  profile {
                    email
                    occupation
                    order
                    phone
                  }
                }
              }
            }
          }
        }
      }
      pastoralCouncils {
        edges {
          node {
            name
            description
            databaseId
            theCurias {
              edges {
                node {
                  title
                  profile {
                    email
                    occupation
                    order
                    phone
                  }
                }
              }
            }
          }
        }
      }
      ecclesiasticalTribunals {
        edges {
          node {
            name
            description
            databaseId
            theCurias {
              edges {
                node {
                  title
                  profile {
                    email
                    occupation
                    order
                    phone
                  }
                }
              }
            }
          }
        }
      }
      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}

`fragment CuriaFragment on TheCuria {
  title
  profile {
    email
    occupation
    order
    phone
  }
  }

  fragment CollegeFragment on CollegeOfConsultatories {
    name
    databaseId
    thecurias {
      edges {
        node {
        ...CuriaFragment
        }
      }
    }
  }

  query NewQuery {
  thecuriaofficials {
    edges {
      node {
        name
        description
        thecurias {
          edges {
            node {
            ...CuriaFragment
            }
          }
        }
      }
    }
  }
  collegeofconsultatories {
    edges {
      node {
      ...CollegeFragment
      }
    }
  }
  }`;

export async function getAllPostsForInstitutions(preview) {
  const data = await fetchAPI(
    `query  {
      pages(where: {name: "Institutions"}) {
        edges {
          node {
            title
            content
          }
        }
      }
      institutions {
        edges {
          node {
              title
            Institutions {
              email
              phone
              representedBy
            }
          }
        }
      }
      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}

export async function getAllPostsForCongregations(preview) {
  const data = await fetchAPI(
    `query  {
      allCongregations(first: 2000) {
        edges {
          node {
            title
            congregations {
              email
              phone
              representedBy
            }
          }
        }
      }
      pages(where: {name: "Congregations"}) {
        edges {
          node {
            title
            content
          }
        }
      }
      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}
export async function getAllPostsForParishes(preview) {
  const data = await fetchAPI(
    `query  {
        parishes(first: 20) {
          edges {
            node {
              title
              slug
              featuredImage {
                node {
                  sourceUrl
                }
              }
              parishs {
                order
                priestName
                priestPhone
                priestImage {
                  sourceUrl
                }
                socialMediaLink {
                  facebook
                  fieldGroupName
                  otherSocialMediaLink
                  telegram
                }
              }
            }
          }
        }
      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            databaseId
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
      featuredStories(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
          }
        }
      }
      allWhoWeAre(first: 4, where: {orderby: {field: DATE, order: ASC}}) {
        edges {
          node {
            title
            databaseId
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
          }
        }
      }
      podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Podcast"},) {
        edges {
          node {
            databaseId
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            audioUrl {
              audiourl {
                mediaItemUrl
              }
            }
          }
        }
      }
      daleyReading: posts(
        where: {categoryName: "Daley Reading", orderby: {field: DATE, order: DESC}, onlySticky: true}
          first: 1
        ) {
          edges {
            node {
              databaseId
              title
            }
          }
      }
      catholicTVs(
          where: {categoryName: "Catholic Tv News", orderby: {field: DATE, order: DESC},}
          first: 100
        ) {
          edges {
            node {
              databaseId
              title
              content
              date
              catholictvnews {
                youtubLink
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
      }
      ourSpotlight:posts(where: {onlySticky: true, orderby: {field: DATE, order: DESC}, categoryName: "ourSpotlight"}) {
        edges {
          node {
            title
            databaseId
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      blurbPosts:posts(
        where: {onlySticky: true, orderby: {field: DATE, order: DESC}, categoryName: "blurb"}
        first: 3
      ) {
        edges {
          node {
            title
            content
            databaseId
          }
        }
      }
      popeMessage(first: 1, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            popeMessages {
              link
            }
          }
        }
      }

    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}
export async function getSingleParishPost(slug) {
  const data = await fetchAPI(
    `
    query getParishPostBysulgCopy($id: ID!, $idType: ParishIdType = URI) {
      parish(id: $id, idType: $idType) {
        slug
        title
        uri
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        parishs {
          mass
          parishAddress
          parishEmail
          parishImage {
            sourceUrl
          }
          parishPhone
          parishPobox
          priestEmail
          priestImage {
            sourceUrl
          }
          sunDay
          weekDays
        }
      }
      events(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: "URI",
      },
    }
  );

  return data;
}

export async function getAllEventCalendars(preview) {
  const data = await fetchAPI(
    `query  {
      events(first: 30, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            databaseId
            title
            content
            events {
                startingDate
                endingDate
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data.events;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}
