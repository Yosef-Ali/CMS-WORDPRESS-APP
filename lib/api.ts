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

export async function getAllPostsForArchbishops() {
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

    `
  );
  return data;
}

export async function getAllPostsForArchdiocese() {
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

    `
  );
  return data;
}

export async function getAllPostsForCuria() {
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
    `
  );
  return data;
}

export async function getAllPostsForInstitutions() {
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
    `
  );
  return data;
}

export async function getAllPostsForCongregations() {
  const data = await fetchAPI(
    `query  {
      congregations(first: 2000) {
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
      pages(where: {name: "congregations"}) {
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
    `
  );
  return data;
}
export async function getAllPostsForParishes() {
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
    `
  );
  return data;
}

export async function getAllPostsCatholicTV() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(
        where: {categoryName: "Catholic Tv News", orderby: {field: DATE, order: DESC}, hasVideoSource: true}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      newsArticles: posts(
        where: {categoryName: "Catholic Tv News", orderby: {field: AUTHOR, order: ASC}, hasVideoSource: false, hasNoVideoSourceAndFeaturedImage: true}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      catholicTeachingsVideo:posts(
        where: {categoryName: "Catholic Teachings", orderby: {field: DATE, order: DESC}, hasVideoSource: true}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      catholicTeachingsArticles: posts(
        where: {categoryName: "Catholic Teachings", orderby: {field: AUTHOR, order: ASC}, hasVideoSource: false, hasNoVideoSourceAndFeaturedImage: true}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      itIsTheLORD:posts(
        where: {categoryName: "It is the LORD", orderby: {field: DATE, order: DESC}}
      ) {
        edges {
          node {
            databaseId
            date
            title
            content
            featuredImage {
              node {
                sourceUrl(size: MEDIUM)
              }
            }
            videoSource {
              acfvideosource
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
    }
  `
  );
  return data;
}
export async function getAllPostsForHome() {
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
      dailyReadings: posts(
        where: {categoryName: "Daily Readings", orderby: {field: DATE, order: DESC}, onlySticky: true}
          first: 1
        ) {
          edges {
            node {
              databaseId
              title
            }
          }
      }
      news:posts(
          where: {categoryName: "Catholic Tv News", orderby: {field: DATE, order: DESC},}
          first: 100
        ) {
          edges {
            node {
              databaseId
              title
              content
              date
              videoSource{
                acfvideosource
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
      }
      ourSpotlightVideo:posts(where: {onlySticky: true, orderby: {field: DATE, order: DESC}, categoryName: "Catholic Tv News", hasVideoSource: true}) {
        edges {
          node {
            title
            databaseId
            content
            videoSource{
              acfvideosource
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
  `
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

export async function getAllEventCalendars({ after = null }) {
  const data = await fetchAPI(
    `query getEvents($first: Int!, $after: String)  {
      events(first: $first, after: $after, where: {orderby: {field: DATE, order: DESC}}) {
    pageInfo {
        hasNextPage
        endCursor
      }
    edges {
          node {
            databaseId
            title
            content
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      posts(
        where: {categoryName: "Catholic Tv News", orderby: {field: DATE, order: DESC},}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
    }
    podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    featuredStories(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
      edges {
        node {
          databaseId
          title
          content
        }
      }
    }
}`,

    { variables: { first: 3, after } }
  );

  return data; // Added return statement.
}

export async function getAllDailyReadings({ after = null }) {
  const data = await fetchAPI(
    `query getDailyReadings($first: Int!, $after: String)  {
      posts(first: $first, after: $after, where: {categoryName: "Daily Readings", orderby: {field: DATE, order: DESC}}) {
    pageInfo {
        hasNextPage
        endCursor
      }
    edges {
          node {
            databaseId
            title
            content
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
     news:posts(
        where: {categoryName: "Catholic Tv News", orderby: {field: DATE, order: DESC},}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
    }
    podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    featuredStories(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
      edges {
        node {
          databaseId
          title
          content
        }
      }
    }
}`,

    { variables: { first: 3, after } }
  );

  return data; // Added return statement.
}

export async function getAllFeaturedStories({ after = null }) {
  const data = await fetchAPI(
    `query getFeaturedStories($first: Int!, $after: String)  {
      featuredStories(first: $first, after: $after, where: {orderby: {field: DATE, order: DESC}}) {
    pageInfo {
        hasNextPage
        endCursor
      }
    edges {
          node {
            databaseId
            title
            content
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      posts(
        where: {categoryName: "Catholic Tv News", orderby: {field: DATE, order: DESC},}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
    }
    podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
}`,

    { variables: { first: 3, after } }
  );

  return data; // Added return statement.
}

export async function getSingleEventPost(id) {
  const data = await fetchAPI(
    `
    query getEventPostById($id: ID!, $idType: EventIdType = DATABASE_ID) {
      event(id: $id, idType: $idType) {
        databaseId
        title
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      featuredStories(first: 30, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            title
            content
            databaseId
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        id: id,
        idType: "DATABASE_ID",
      },
    }
  );
  return data;
}

export async function getAllTeachings({ after = null }) {
  const data = await fetchAPI(
    `query getTeachings($first: Int!, $after: String) {
      posts(
        first: $first, after: $after,
        where: {categoryName: "Catholic Teachings", orderby: {field: DATE, order: DESC}}
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage{
              node{
                sourceUrl
              }
            }
          }
        }
      }
      itIsTheLORD:posts(
        where: {categoryName: "It is the LORD", orderby: {field: DATE, order: DESC}}
      ) {
        edges {
          node {
            databaseId
            date
            title
            content
            featuredImage {
              node {
                sourceUrl(size: MEDIUM)
              }
            }
            videoSource {
              acfvideosource
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
      podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    }
`,

    { variables: { first: 6, after } }
  );

  return data; // Added return statement.
}

export async function getAllNews({ after = null }) {
  const data = await fetchAPI(
    `query getNews($first: Int!, $after: String) {
      posts(
        first: $first, after: $after,
        where: {categoryName: "Catholic Tv News", orderby: {field: DATE, order: DESC}}
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      featuredStories(first: 30, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            title
            content
            databaseId
            date
            featuredImage {
              node {
                sourceUrl
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
      podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    }
`,

    { variables: { first: 6, after } }
  );

  return data; // Added return statement.
}

export async function getAllVideoTeachings({ after = null }) {
  const data = await fetchAPI(
    `query getVideoTeachings($first: Int!, $after: String) {
      posts(
        first: $first, after: $after,
        where: {categoryName: "Catholic Teachings", orderby: {field: DATE, order: DESC},hasVideoSource: true}
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
          }
        }
      }
      itIsTheLORD:posts(
        where: {categoryName: "It is the LORD", orderby: {field: DATE, order: DESC}}
      ) {
        edges {
          node {
            databaseId
            date
            title
            content
            featuredImage {
              node {
                sourceUrl(size: MEDIUM)
              }
            }
            videoSource {
              acfvideosource
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
      podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    }
`,

    { variables: { first: 6, after } }
  );

  return data; // Added return statement.
}

export async function getAllItIsTheLORD({ after = null }) {
  const data = await fetchAPI(
    `query getItIsTheLORD($first: Int!, $after: String) {
      posts(
        first: $first, after: $after,
        where: {categoryName: "It is the LORD", orderby: {field: DATE, order: DESC}}
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node{
                sourceUrl
              }
            }
          }
        }
      }
      catholicTeachings:posts(
        first: 4
        where: {categoryName: "Catholic Teachings", orderby: {field: DATE, order: DESC}}
      ) {
        edges {
          node {
            databaseId
            date
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            videoSource{
              acfvideosource
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
      podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    }
`,

    { variables: { first: 6, after } }
  );

  return data; // Added return statement.
}

export async function getAllEventWithIds() {
  const data = await fetchAPI(
    `
    query getAllEventIds {
      events(first: 10000) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  `
  );
  return data?.events;
}

export async function getSinglePost(id) {
  const data = await fetchAPI(
    `
    query getNewsPostById($id: ID!, $idType: PostIdType = DATABASE_ID) {
      post(id: $id, idType: $idType) {
        databaseId
        title
        date
        content
        videoSource {
          acfvideosource
          }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      featuredStories(first: 30, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            title
            content
            databaseId
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        id: id,
        idType: "DATABASE_ID",
      },
    }
  );
  return data;
}

export async function getAllPostsWithIds() {
  const data = await fetchAPI(
    ` query getAllNewsIds {
      posts(first: 10000, where: {categoryName: "Catholic Tv News"}) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  `
  );
  return data?.posts;
}

export async function getSingleOurSpotlightPost(id) {
  const data = await fetchAPI(
    `
    query getOurSpotlightPostById($id: ID!, $idType: PostIdType = DATABASE_ID) {
      post(id: $id, idType: $idType) {
        databaseId
        title
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      featuredStories(first: 30, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            title
            content
            databaseId
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      ourSpotlight: posts(first: 30,
        where: {categoryName: "ourSpotlight", orderby: {field: DATE, order: DESC}}
        ) {
          edges {
            node {
              title
              content
              databaseId
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
    }
  `,
    {
      variables: {
        id: id,
        idType: "DATABASE_ID",
      },
    }
  );
  return data;
}

export async function getAllOurSpotlightWithIds() {
  const data = await fetchAPI(
    ` query getAllOurSpotlightIds {
      posts(first: 10000, where: {categoryName: "ourSpotlight"}) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  `
  );
  return data?.posts;
}

export async function getSingleDailyReadingPost(id) {
  const data = await fetchAPI(
    `
    query getDailyReadingsPostById($id: ID!, $idType: PostIdType = DATABASE_ID) {
      post(id: $id, idType: $idType) {
        databaseId
        title
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      featuredStories(first: 30, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            title
            content
            databaseId
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      dailyReadings: posts(first: 30,
        where: {categoryName: "Daily Readings", orderby: {field: DATE, order: DESC}}
        ) {
          edges {
            node {
              title
              content
              databaseId
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    }
  `,
    {
      variables: {
        id: id,
        idType: "DATABASE_ID",
      },
    }
  );
  return data;
}

export async function getAllDailyReadingsWithIds() {
  const data = await fetchAPI(
    `query getAllDailyReadingsIds {
      posts(
        where: {categoryName: "Daily Readings", orderby: {field: DATE, order: DESC}}first: 1000) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  `
  );
  return data?.posts;
}
export async function getAllCatholicTeachingsWithIds() {
  const data = await fetchAPI(
    `query getAllCatholicTeachingsIds {
      posts(
        where: {categoryName: "Catholic Teachings", orderby: {field: DATE, order: DESC}}first: 1000) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  `
  );
  return data?.posts;
}
export async function getSingleCatholicTeachingsPost(id) {
  const data = await fetchAPI(
    ` query getPostById($id: ID!, $idType: PostIdType = DATABASE_ID) {
      post(id: $id, idType: $idType) {
        databaseId
        title
        date
        content
        videoSource {
          acfvideosource
          }
        featuredImage {
          node {
            sourceUrl
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
    }
  `,
    {
      variables: {
        id: id,
        idType: "DATABASE_ID",
      },
    }
  );
  return data;
}
export async function getSingleFeaturedStory(id) {
  const data = await fetchAPI(
    `
    query getFeaturedStoryById($id: ID!, $idType:  FeaturedStoryIdType = DATABASE_ID) {
      featuredStory(id: $id, idType: $idType) {
        databaseId
        title
        date
        content
        featuredImage {
          node {
            sourceUrl
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
        id: id,
        idType: "DATABASE_ID",
      },
    }
  );
  return data;
}

export async function getAllFeaturedStoriesWithIds() {
  const data = await fetchAPI(
    `
    query getAllFeaturedStoriesIds {
      featuredStories(first: 10000) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
  `
  );
  return data?.featuredStories;
}

export async function getAllPodcasts({ after = null }) {
  const data = await fetchAPI(
    `query getPodcasts($first: Int!, $after: String)  {
      podcasts(first: $first, after: $after, where: {categoryName: "Podcast", orderby: {field: DATE, order: DESC},}) {
        pageInfo {
            hasNextPage
            endCursor
          }
        edges {
              node {
                databaseId
                title
                content
                date
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
      posts(
        where: {categoryName: "Catholic Teachings", orderby: {field: DATE, order: DESC},}
        first: 100
      ) {
        edges {
          node {
            databaseId
            title
            content
            date
            videoSource {
              acfvideosource
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
    }
    audios: podcasts( where: {orderby: {field: DATE, order: DESC}, categoryName: "Music"},) {
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
    featuredStories(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
      edges {
        node {
          databaseId
          title
          content
        }
      }
    }
}`,

    { variables: { first: 3, after } }
  );

  return data; // Added return statement.
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
