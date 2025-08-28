import React from 'react'
import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

const Privacy = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Shield className="w-12 h-12 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600">
                        Last updated: {currentDate}
                    </p>
                </div>

                {/* Content */}
                <div className="card prose prose-lg max-w-none">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                When you use Tsnap, we may collect the following information:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>URLs that you submit for shortening</li>
                                <li>IP address and browser information</li>
                                <li>Usage statistics and analytics data</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">We use collected information to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Provide and improve our URL shortening service</li>
                                <li>Generate analytics and usage statistics</li>
                                <li>Prevent abuse and maintain service security</li>
                                <li>Display relevant advertisements</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Cookies and Tracking</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and serve advertisements. You can control cookie settings through your browser preferences, though some features may not work properly if cookies are disabled.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Third-Party Services</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our website uses third-party services that may collect information:
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Google AdSense</h3>
                                <p className="text-gray-600 text-sm">
                                    We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Ad Settings</a>.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">Analytics</h3>
                                <p className="text-gray-600 text-sm">
                                    We may use analytics services to understand how our service is used and to improve user experience.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Sharing</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share aggregated, non-personally identifiable information for business purposes. We may disclose information if required by law or to protect our rights and safety.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Rights</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Access and review your personal information</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt out of certain data collection practices</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to Privacy Policy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of the service after changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have questions about this Privacy Policy or your personal information, please contact us through our <Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact page</Link>.
                            </p>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Privacy