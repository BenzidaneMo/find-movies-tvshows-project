import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex justify-center mb-4">
        <a href="https://www.facebook.com" className="text-xl text-gray-500 hover:text-purple-800 mx-2">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.twitter.com" className="text-xl text-gray-500 hover:text-purple-800 mx-2">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a href="https://www.instagram.com" className="text-xl text-gray-500 hover:text-purple-800 mx-2">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.github.com" className="text-xl text-gray-500 hover:text-purple-800 mx-2">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <p className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} Find Movies. All rights reserved.
      </p>
    </footer>
  )
}