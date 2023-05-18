import UAParser from "ua-parser-js";

export const getUserAgent = (req) => {
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
