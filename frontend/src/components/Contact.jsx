import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required fields')
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address')
            return
        }

        // Simulate form submission
        setError('')
        setSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-8">
                <div className="container mx-auto px-4 max-w-md">
                    <div className="card text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Message Sent!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for contacting us. We'll get back to you as soon as possible.
                        </p>
                        <Link
                            to="/"
                            className="btn-primary inline-flex items-center space-x-2"
                        >
                            <Home className="w-4 h-4" />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Mail className="w-12 h-12 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="What is this about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="input-field resize-vertical"
                                placeholder="Tell us more details..."
                                required
                            ></textarea>
                        </div>

                        {error && (
                            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary w-full flex items-center justify-center space-x-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>

                {/* Alternative Contact Info */}
                <div className="mt-8">
                    <div className="card">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Other Ways to Reach Us
                        </h3>
                        <div className="space-y-4 text-center">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">General Inquiries</h4>
                                <p className="text-gray-600 text-sm">
                                    For general questions about our service or feature requests.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Technical Support</h4>
                                <p className="text-gray-600 text-sm">
                                    Having trouble with our URL shortener? Let us know!
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Business Partnerships</h4>
                                <p className="text-gray-600 text-sm">
                                    Interested in partnering with us? We'd love to discuss opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact