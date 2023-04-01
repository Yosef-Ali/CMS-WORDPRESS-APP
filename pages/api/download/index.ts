import stream from "stream";
import { promisify } from "util";
import fetch from "node-fetch";

const pipeline = promisify(stream.pipeline);

const handler = async (req, res) => {
  // Get the parameters from the URL
  const { audioSrc } = req.query;
  const URL = encodeURI(audioSrc);

  // Fetch the audio file from the WordPress database URL
  const response = await fetch(URL);
  const fileName = URL.split("/").pop();

  // Check if the response is ok
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  // Set the response headers for downloading the file
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  // Stream the response body to res
  await pipeline(response.body, res);
};

export default handler;
