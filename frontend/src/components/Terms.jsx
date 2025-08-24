import React from 'react'
import { Link } from 'react-router-dom'
import {  FileText } from 'lucide-react'

const Terms = () => {

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
                </div>

                {/* Content */}
                <div className="card prose prose-lg max-w-none">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing and using Short URL ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Short URL provides a free URL shortening service that allows users to create shortened links from long URLs. The service is provided "as is" and we reserve the right to modify or discontinue the service at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Acceptable Use</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">You agree not to use the service to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Shorten URLs that lead to illegal, harmful, or malicious content</li>
                                <li>Distribute spam, malware, or viruses</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe upon intellectual property rights</li>
                                <li>Engage in any activity that could harm our service or users</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Content and Conduct</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to remove any shortened URLs that violate these terms or are reported as inappropriate. We may suspend or terminate accounts that repeatedly violate our terms of service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Privacy and Data</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Your privacy is important to us. Please review our Privacy Policy, which governs how we collect, use, and protect your information when you use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Short URL shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
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