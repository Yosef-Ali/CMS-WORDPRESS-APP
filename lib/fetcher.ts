//const API_URL = process.env.WORDPRESS_API_URL;
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig.API_KEY;
//const API_URL = "http://acswpnext.local/graphql";

export async function fetchAPI(
  query = "",
  { variables }: Record<string, any> = {}
) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }
  //console.log("queryfetch:", query);
  //console.log("variablesfetch", variables);

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  //console.log("json", json);
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}
