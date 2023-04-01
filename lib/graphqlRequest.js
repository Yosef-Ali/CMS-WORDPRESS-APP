const API_URL = process.env.WORDPRESS_API_URL;
export default async function graphqlRequest(query) {
  //const url = "https://wp.abhinavr.com/graphql";
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify(query),
  });

  const resJson = await res.json();
  return resJson;
}
