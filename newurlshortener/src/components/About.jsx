import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Link as LinkIcon, Zap, Shield, BarChart3, Globe, Users, Clock } from 'lucide-react'

const About = () => {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Lightning Fast",
            description: "Generate short URLs instantly with our optimized backend infrastructure."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure & Reliable",
            description: "Your links are safe with us. We use industry-standard security practices."
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Click Analytics*",
            description: "Track and monitor your short URL performance with detailed statistics. *(Will be added in future)"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Global Access",
            description: "Access your shortened URLs from anywhere in the world, anytime."
        }
    ]

    const stats = [
        { number: "1M+", label: "URLs Shortened" },
        { number: "5K+", label: "Active Users" },
        { number: "99.9%", label: "Uptime" },
        { number: "24/7", label: "Support" }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <LinkIcon className="w-12 h-12 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                        About Tsnap
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        The most trusted URL shortening service that transforms your long links into short, manageable, and trackable URLs.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="card mb-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
                            We believe that sharing links should be simple, fast, and reliable. Our mission is to provide the best URL shortening service that helps individuals, businesses, and organizations share content more effectively while maintaining complete control over their links.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="card text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8 font-serif">
                        Why Choose Tsnap?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="card">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="card mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8 font-serif">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Paste Your URL</h3>
                            <p className="text-gray-600">
                                Simply paste your long URL into our shortener tool.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Short Link</h3>
                            <p className="text-gray-600">
                                Instantly receive a shortened, easy-to-share URL.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Share & Track*</h3>
                            <p className="text-gray-600">
                                Share your link and monitor its performance with our analytics.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="card mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8 font-serif">
                        Perfect For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">Social Media</h3>
                            <p className="text-gray-600 text-sm">
                                Share links on Twitter, Instagram, Facebook, and other platforms without character limits.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">Marketing Campaigns</h3>
                            <p className="text-gray-600 text-sm">
                                Track click-through rates and measure the success of your marketing efforts.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <Clock className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">Email Marketing</h3>
                            <p className="text-gray-600 text-sm">
                                Make your emails cleaner and more professional with shortened links.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <Globe className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">QR Codes</h3>
                            <p className="text-gray-600 text-sm">
                                Generate QR codes from short URLs for print materials and offline marketing.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <Shield className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">Business</h3>
                            <p className="text-gray-600 text-sm">
                                Professional link management for corporate communications and documentation.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <Zap className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">Personal Use</h3>
                            <p className="text-gray-600 text-sm">
                                Share personal content, portfolios, and important links with friends and family.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Privacy & Security */}
                <div className="card mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 font-serif">
                        Privacy & Security
                    </h2>
                    <div className="text-center max-w-4xl mx-auto">
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We take your privacy seriously. We don't sell your data, and we implement industry-standard security measures to protect your information. All shortened URLs are regularly monitored for malicious content to ensure a safe browsing experience for everyone.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                                Read our Privacy Policy
                            </Link>
                            <span className="text-gray-400">•</span>
                            <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                                View Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="card text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-serif">
                    <h2 className="text-3xl font-semibold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-blue-100 mb-6 text-lg">
                        Join thousands of users who trust Tsnap for their link management needs.
                    </p>
                    <Link
                        to="/"
                        className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
                    >
                        <LinkIcon className="w-4 h-4" />
                        <span>Start Shortening URLs</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default About