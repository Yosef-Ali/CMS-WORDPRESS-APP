// Dynamic routing in Next.js
// :
// Dynamic routing in Next.js allows you to define page routes as a function of the incoming URL. This makes it possible to have pages with dynamic paths and also to map different paths to the same page. For example, a URL like /products/t-shirts/red could be mapped to the same page as /products/shirts/blue.
// For example, the following route will match any URL starting with /products/:
// pages/products.js
export default function Products({ query }) {
  return <p>You are viewing {query.category} products</p>;
}

export const getStaticPaths = async () => {
  const paths = ["/products/t-shirts", "/products/shirts", "/products/pants"];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      query: params,
    },
  };
};
// Dynamic routing in WordPress:
// Dynamic routing in WordPress allows you to define custom URL routes and map them to specific pages or templates. This allows you to customize the URLs of your pages to improve SEO, user experience, and make them more memorable. For example, you can map /blog/my-cool-post to a single post template.
// The following example shows a simple example of setting up a custom route in WordPress:
// functions.php
add_action("init", "add_custom_rewrite_rule");

function add_custom_rewrite_rule() {
  add_rewrite_rule(
    "blog/([^/]*)/?$",
    "index.php?pagename=blog&post_name=$matches[1]",
    "top"
  );
}
// Dynamic routing in GraphQL:
// Dynamic routing in GraphQL is a way to specify parameters in GraphQL queries that can be used to filter the results from a GraphQL endpoint. This allows users to specify what data they need in a single query and get only the data that is relevant. For example, a query for a list of products can be filtered by category, type, or price range.
// The following example shows a GraphQL query with dynamic parameters:
`
query Products($category: String, $type: String, $priceRange: Float) {
  products(category: $category, type: $type, priceRange: $priceRange) {
    id
    name
    price
    category
    type
  }
}
`;


var os = "";
		if (navigator.appVersion.indexOf("Win")!=-1) os="Windows";
		else if (navigator.appVersion.indexOf("Mac")!=-1) os="MacOSX";
		else if (navigator.userAgent.indexOf("Linux")!=-1) os="Linux";

    var browser = {};
    browser['IE'] = false; // default value, assume not IE until we detect it as such below
    browser['IE_version'] = 0;

    var ua=window.navigator.userAgent;

    if(ua){ // make sure there is a user agent string to parse... else return the default values above

      var msie=ua.indexOf('MSIE ');  // check for IE 10 or older versions of IE using trident engine in compatibility mode and newer versions of IE using Trident engine in standards mode: http://stackoverflow.com/questions/12358344/how-to-detect-ie11#answer-12358763

      if(msie > 0 || !!navigator.userAgent && navigator.userAgent !== '' && /Trident.*rv[ :]*11\./.test(navigator.userAgent)){ // this is an internet explorer that uses either the trident engine or ie10+ standards mode, so use the most modern version available to get the best results possible from this script: https://developerblogs.microsoftteamblog.com/2017/01/18/introducing-internet-explorers-edge/#comment-3317491514--Microsoft%20Dev%20Blog%3A%20Introducing%20Internet%20Explorers%27s%20Edge
        browser['IE'] = true;  // set flag indicating this is an internet explorer that uses either the trident engine or ie10+ standards mode, so use the most modern version available to get the best results possible from this script: https://developerblogs.microsoftteamblog.com/2017/01/18/introducing-internet-explorers-edge/#comment-3317491514--Microsoft%20Dev%20Blog%3A%20Introducing%20Internet\’s\ Edge
        var rvStart=ua[msie+5];