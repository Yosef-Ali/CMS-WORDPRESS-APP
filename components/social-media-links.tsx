import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  YouTubeIcon,
} from "./icons";

type ColorProps = { color?: string };

function IconWrapper({ color, link, title, children }) {
  return (
    <li>
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
        className={`transition text-${color} hover:text-${color}/75`}
      >
        <span className="sr-only">{title}</span>
        {children}
      </a>
    </li>
  );
}

export default function SocialMediaLinks({ color = "primary" }: ColorProps) {
  return (
    <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
      <IconWrapper color={color} link={"/"} title="Facebook">
        <FacebookIcon />
      </IconWrapper>
      <IconWrapper color={color} link={"/"} title="Instagram">
        <InstagramIcon />
      </IconWrapper>
      <IconWrapper color={color} link={"/"} title="Twitter">
        <TwitterIcon />
      </IconWrapper>
      <IconWrapper color={color} link={"/"} title="YouTube">
        <YouTubeIcon />
      </IconWrapper>
    </ul>
  );
}
