import React from "react"

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon,
  TelegramIcon,
} from "../misc/Icons"

function SocialMediaIcons() {
  return (
    <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
      <li>
        <a
          href="/"
          rel="noopener noreferrer"
          target="_blank"
          className="transition text-secondary hover:text-secondary/75"
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
          className="transition text-secondary hover:text-secondary/75"
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
          className="transition text-secondary hover:text-secondary/75"
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
          className="transition text-secondary hover:text-secondary/75"
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
          className="transition text-secondary hover:text-secondary/75"
        >
          <span className="sr-only">Telegram</span>
          <TelegramIcon />
        </a>
      </li>
    </ul>
  )
}

export default SocialMediaIcons
