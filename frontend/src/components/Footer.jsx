import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        { name: 'ShortURL', href: '/' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Contact', href: '/contact' }
    ]

    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">
                {/* Copyright and Powered by */}
                <div className="text-center mb-4">
                    <p className="text-sm text-gray-300">
                        © {currentYear} websitename.at - Generate compact links from lengthy URLs
                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
                    {footerLinks.map((link, index) => (
                        <React.Fragment key={link.name}>
                            {link.href === '/' ? (
                                <Link
                                    to={link.href}
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    href={link.href}
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    {link.name}
                                </a>
                            )}
                            {index < footerLinks.length - 1 && (
                                <span className="text-gray-500">|</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Mobile responsive separator */}
                <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-400">
                        Fast, reliable, and secure URL shortening service
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer