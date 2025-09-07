import React from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

const Terms = () => {
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
                        <FileText className="w-12 h-12 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-600">
                        Last updated: {currentDate}
                    </p>
                </div>

                {/* Content */}
                <div className="card prose prose-lg max-w-none">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing and using Tsnap's URL shortening service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Description</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Tsnap provides a URL shortening service that allows users to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Create shortened versions of long URLs</li>
                                <li>Share these shortened URLs across various platforms</li>
                                <li>Access basic analytics and click tracking (when available)</li>
                                <li>Use the service for personal, educational, and commercial purposes</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Acceptable Use Policy</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">You agree not to use our service to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Share malicious, illegal, or harmful content</li>
                                <li>Engage in spam, phishing, or fraudulent activities</li>
                                <li>Violate intellectual property rights</li>
                                <li>Distribute viruses, malware, or other harmful code</li>
                                <li>Harass, threaten, or abuse other users</li>
                                <li>Circumvent our security measures or terms</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Link Expiration and Availability</h2>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <p className="text-gray-700 font-medium">Important Notice:</p>
                                <p className="text-gray-600 text-sm mt-1">
                                    Short URLs that do not receive at least one click per month may be disabled or removed to maintain service efficiency.
                                </p>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                While we strive to maintain all shortened URLs indefinitely, we reserve the right to disable or remove URLs that violate our terms, appear to be inactive, or pose security risks to our users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Privacy and Data Collection</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We collect and use information as described in our <Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>. By using our service, you consent to such collection and use of information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Service Availability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We strive to maintain high availability but do not guarantee uninterrupted service. We may temporarily suspend the service for maintenance, updates, or due to circumstances beyond our control.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Tsnap is provided "as is" without any warranties. We are not liable for any damages arising from the use or inability to use our service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Tsnap service, including its design, features, and functionality, is owned by us and protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our service without permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Advertising and Third-Party Content</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our service may display advertisements and third-party content. We are not responsible for the content or availability of such third-party services and do not endorse any products or services advertised.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Modifications to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the service after such changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Termination</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
                            <p className="text-gray-600 leading-relaxed">
                                These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have any questions about these Terms of Service, please contact us through our <Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact page</Link>.
                            </p>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Terms