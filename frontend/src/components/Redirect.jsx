import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Clock, AlertCircle, ArrowDown, Home } from 'lucide-react'

const Redirect = () => {
    const { key } = useParams()
    const [countdown, setCountdown] = useState(5)
    const [longUrl, setLongUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [timerComplete, setTimerComplete] = useState(false)

    useEffect(() => {
        // Fetch the long URL from backend
        const fetchLongUrl = async () => {
            try {
                const response = await fetch(`https://urlshortener-tnlf.onrender.com/api/v1/find/${key}`)
                const data = await response.json()

                if (data.success) {
                    setLongUrl(data.longUrl)
                } else {
                    setError('Short URL not found or has expired')
                }
            } catch (err) {
                setError('Failed to fetch URL. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchLongUrl()
    }, [key])

    useEffect(() => {
        // Start countdown timer
        if (!loading && !error && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000)

            return () => clearTimeout(timer)
        } else if (countdown === 0) {
            setTimerComplete(true)
        }
    }, [countdown, loading, error])

    const handleRedirect = () => {
        if (longUrl) {
            window.location.href = longUrl
        }
    }

    const handleScrollDown = () => {
        const element = document.getElementById('url-section')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="card text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
                    <p className="text-gray-600">Preparing your redirect</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="card text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link to="/" className="btn-primary inline-flex items-center space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Go Back Home</span>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {/* Timer Section */}
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="card text-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="w-10 h-10 text-blue-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Get Ready!
                        </h1>

                        {!timerComplete ? (
                            <>
                                <p className="text-gray-600 mb-8">
                                    You will be redirected in
                                </p>

                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                                    <span className="text-3xl font-bold text-white">
                                        {countdown}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500">
                                    Please wait while we prepare your destination...
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600 mb-8">
                                    Ready to continue to your destination?
                                </p>

                                <div className="space-y-4">
                                    <button
                                        onClick={handleScrollDown}
                                        className="btn-secondary w-full flex items-center justify-center space-x-2"
                                    >
                                        <ArrowDown className="w-4 h-4" />
                                        <span>Scroll Down to Get Link</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="text-center mt-6">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center space-x-1"
                        >
                            <Home className="w-4 h-4" />
                            <span>Return to Homepage</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* URL Section - Shown after timer completes */}
            {timerComplete && (
                <div id="url-section" className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
                    <div className="w-full max-w-2xl">
                        <div className="card">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ExternalLink className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Your Destination
                                </h2>
                                <p className="text-gray-600">
                                    Click the button below to visit your destination
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">

                                    <button
                                        onClick={handleRedirect}
                                        className="btn-primary w-full flex items-center justify-center space-x-2 text-lg"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        <span>Visit Website</span>
                                    </button>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-4">
                                        Want to create your own short URLs?
                                    </p>
                                    <Link
                                        to="/"
                                        className="btn-secondary inline-flex items-center space-x-2"
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Try Our URL Shortener</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Redirect