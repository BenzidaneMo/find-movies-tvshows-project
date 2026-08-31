import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedinIn, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const socialLinks = [
  {
    name: "GitHub",
    Icon: faGithub,
    url: "https://github.com/BenzidaneMo",
  },
  {
    name: "LinkedIn",
    Icon: faLinkedinIn,
    url: "https://www.linkedin.com/in/mohamed-benzidane-42b958210",
  },
  {
    name: "X",
    Icon: faXTwitter,
    url: "https://x.com/Miracleinvoker_",
  },
  {
    name: "Facebook",
    Icon: faFacebook,
    url: "https://www.facebook.com/paragonS0",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex justify-center mb-4">
        {socialLinks.map(({ Icon, name, url }) => (
            <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-xl text-gray-500 hover:text-purple-800 mx-2"
          >
            <FontAwesomeIcon icon={Icon} />
          </a>
        ))}
      </div>
      <p className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} Find Movies. All rights reserved.
      </p>
    </footer>
  )
}