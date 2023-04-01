import { useEffect, useState } from "react";

const GET_POSTS = `
  query GET_POSTS($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          databaseId
          title
          content
        }
      }
    }
  }
`;

function Blog() {
  // Initialize state variables for loading, error, data, and cursor
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [cursor, setCursor] = useState(null);

  // Define a function to fetch posts using fetch API
  const fetchPosts = async (first = 5, after = null) => {
    // Set loading state to true
    setLoading(true);

    try {
      // Make a POST request with JSON body containing query and variables
      const response = await fetch("http://acswpnext.local/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_POSTS,
          variables: { first, after },
        }),
      });

      // Parse response as JSON
      const json = await response.json();
      console.log("json", json);
      // Check if response has errors
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      // Update data state with fetched posts
      setData((prevData) =>
        prevData
          ? [...prevData, ...json.data.posts.edges]
          : json.data.posts.edges
      );
      console.log("data", data);
      // Update cursor state with endCursor of fetched posts
      setCursor(json.data.posts.pageInfo.endCursor);

      // Set loading state to false
      setLoading(false);
    } catch (err) {
      // Set error state with error message
      setError(err.message);

      // Set loading state to false
      setLoading(false);
    }
  };

  // Fetch initial posts on component mount using useEffect hook
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className=" mx-auto max-w-md ">Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("data", data);

  return (
    <div className=" mx-auto max-w-md ">
      <ul>
        {data?.map(({ node }) => (
          <li key={node.databaseId} className="m-4  border p-4">
            <h3>{node.title}</h3>
            <p>{node.databaseId}</p>
          </li>
        ))}
      </ul>
      {cursor && (
        <button
          onClick={() => fetchPosts(5, cursor)}
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default Blog;
