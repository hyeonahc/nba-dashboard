import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react"

const Footer = () => {
  const sitemapLinks = [
    { name: "Dashboard", href: "#dashboard" },
    { name: "Games", href: "#games" },
    { name: "Teams", href: "#teams" },
    { name: "Players", href: "#players" },
    { name: "Statistics", href: "#stats" },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/nba/",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/NBA",
      icon: Twitter,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/nba",
      icon: Facebook,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/nba",
      icon: Youtube,
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">🏀</span>
              </div>
              <h3 className="text-xl font-bold">NBA Dashboard</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for NBA statistics, scores, and team
              information.
            </p>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Sitemap</h4>
            <ul className="space-y-2">
              {sitemapLinks.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official NBA Socials */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold mb-4">Official NBA</h4>
            <div className="space-y-3">
              <div className="flex space-x-4 mb-3">
                {socialLinks.map(social => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                      title={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
              <a
                href="https://www.nba.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm mb-3"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                NBA.com
              </a>
            </div>
          </div>

          {/* GitHub and Made By */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold mb-4">Development</h4>
            <div className="space-y-3">
              <a
                href="https://github.com/hyeonahc/nba-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub Repository
              </a>
              <div className="text-gray-400 text-sm">
                <p>
                  Made with ❤️ by{" "}
                  <a
                    href="https://github.com/hyeonahc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400"
                  >
                    hyeonahc
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        {/* <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Data provided by NBA API
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer
