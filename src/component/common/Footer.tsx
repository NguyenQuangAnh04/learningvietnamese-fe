import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faGlobe,
  faHeart,
  faMapMarkerAlt,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a0f1c] via-[#1a1f2e] to-[#0a0f1c] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                🌸 Viet-Japanese Learning
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Master Vietnamese and Japanese languages through interactive lessons, games, and cultural immersion.
                Your journey to fluency starts here!
              </p>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-semibold text-cyan-300">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: faFacebook, color: 'hover:text-blue-500', link: '#' },
                  { icon: faTwitter, color: 'hover:text-sky-400', link: '#' },
                  { icon: faInstagram, color: 'hover:text-pink-500', link: '#' },
                  { icon: faYoutube, color: 'hover:text-red-500', link: '#' },
                  { icon: faLinkedin, color: 'hover:text-blue-600', link: '#' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-125 hover:shadow-lg p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50`}
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-cyan-300 border-b border-cyan-500/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: '🏠 Home', link: '/' },
                { name: '📚 Lessons', link: '/lessons' },
                { name: '🎮 Games', link: '/games' },
                { name: '📊 Progress', link: '/progress' },
                { name: '👥 Community', link: '/community' },
                { name: '🏆 Achievements', link: '/achievements' }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-2 transform inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-cyan-300 border-b border-cyan-500/30 pb-2">
              Learning Resources
            </h4>
            <ul className="space-y-3">
              {[
                { name: '🇻🇳 Vietnamese Basics', link: '/vietnamese' },
                { name: '🇯🇵 Japanese Fundamentals', link: '/japanese' },
                { name: '📖 Grammar Guide', link: '/grammar' },
                { name: '🔤 Vocabulary Builder', link: '/vocabulary' },
                { name: '🎧 Pronunciation Tools', link: '/pronunciation' },
                { name: '📝 Practice Exercises', link: '/exercises' }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-2 transform inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-cyan-300 border-b border-cyan-500/30 pb-2">
              Contact & Support
            </h4>
            <div className="space-y-4">

              {/* Contact Info */}
              <div className="space-y-3">
                {[
                  { icon: faEnvelope, text: 'support@viet-jp-learning.com', link: 'mailto:support@viet-jp-learning.com' },
                  { icon: faPhone, text: '+84 123 456 789', link: 'tel:+84123456789' },
                  { icon: faMapMarkerAlt, text: 'Ho Chi Minh City, Vietnam', link: '#' }
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group"
                  >
                    <FontAwesomeIcon
                      icon={contact.icon}
                      className="text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300"
                    />
                    <span className="text-sm">{contact.text}</span>
                  </a>
                ))}
              </div>

              {/* Support Links */}
              <div className="pt-4 border-t border-gray-700">
                <ul className="space-y-2">
                  {[
                    { name: '❓ Help Center', link: '/help' },
                    { name: '🐛 Report Bug', link: '/report' },
                    { name: '💡 Feature Request', link: '/features' },
                    { name: '📞 Live Chat', link: '/chat' }
                  ].map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.link}
                        className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-cyan-300">📧 Stay Updated!</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Get the latest learning tips, new lessons, and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 Viet-Japanese Learning. Made with</span>
              <FontAwesomeIcon icon={faHeart} className="text-red-500 animate-pulse" />
              <span>in Vietnam</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <FontAwesomeIcon icon={faGlobe} className="text-cyan-500" />
                <span className="text-sm">Language:</span>
              </div>
              <select className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="en">🇺🇸 English</option>
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="ja">🇯🇵 日本語</option>
              </select>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              {[
                { name: 'Privacy Policy', link: '/privacy' },
                { name: 'Terms of Service', link: '/terms' },
                { name: 'Cookies', link: '/cookies' }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
    </footer>
  );
}