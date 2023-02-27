import React from "react";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon,
  TelegramIcon,
} from "../misc/Icons";

function SocialMediaIcons() {
  return (
    <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
      <li>
        <a
          href="/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-secondary transition hover:text-secondary/75"
        >
          <span className="sr-only">Facebook</span>
          <FacebookIcon />
        </a>
      </li>

      <li>
        <a
          href="/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-secondary transition hover:text-secondary/75"
        >
          <span className="sr-only">Instagram</span>
          <InstagramIcon />
        </a>
      </li>

      <li>
        <a
          href="/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-secondary transition hover:text-secondary/75"
        >
          <span className="sr-only">Twitter</span>
          <TwitterIcon />
        </a>
      </li>

      <li>
        <a
          href="/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-secondary transition hover:text-secondary/75"
        >
          <span className="sr-only">YouTube</span>
          <YouTubeIcon />
        </a>
      </li>
      <li>
        <a
          href="/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-secondary transition hover:text-secondary/75"
        >
          <span className="sr-only">Telegram</span>
          <TelegramIcon />
        </a>
      </li>
    </ul>
  );
}

export default SocialMediaIcons;
