import UAParser from "ua-parser-js";

export const getUserAgent = (req) => {
  console.log("req", req);
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  return parser.getResult();
};
