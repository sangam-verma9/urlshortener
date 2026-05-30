import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Clock, AlertCircle, ArrowDown, Home } from 'lucide-react'
import { findUrl } from '../config/api'

const Redirect = () => {
    const { key } = useParams()
    const [countdown, setCountdown] = useState(3)
    const [longUrl, setLongUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [timerComplete, setTimerComplete] = useState(false)

    useEffect(() => {
        const fetchLongUrl = async () => {
            try {
                if (!key) {
                    setError('Invalid URL key')
                    setLoading(false)
                    return
                }

                // Using Firebase service instead of API call
                const result = await findUrl(key)

                if (result.success) {
                    setLongUrl(result.longUrl)
                } else {
                    setError(result.message || 'Short URL not found or has expired')
                }
            } catch (err) {
                console.error('Error fetching long URL:', err)
                setError(err.message || 'Failed to fetch URL. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchLongUrl()
    }, [key])

    useEffect(() => {
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
            window.open(longUrl, '_blank', 'noopener,noreferrer')
        }
    }

    // const handleScrollDown = () => {
    //     const element = document.getElementById('url-section')
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' })
    //     }
    // }

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
        <div className="min-h-screen ">
            {/* Timer Section */}
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md ">
                    <div className="card text-center rounded-3xl">
                        {
                            !timerComplete && (
                                <>
                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Clock className="w-10 h-10 text-blue-600" />
                                    </div>

                                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                        Get Ready!
                                    </h1>
                                </>
                            )
                        }

                        {!timerComplete ? (
                            <>
                                <p className="text-gray-600 mb-8">
                                    You will be redirected in
                                </p>

                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-600  flex items-center justify-center mx-auto mb-8 shadow-lg">
                                    <span className="text-3xl font-bold text-white">
                                        {countdown}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 mb-6">
                                    Please wait while we prepare your destination...
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="w-full max-w-2xl">
                                    <div >
                                        <div className="text-center mb-8">
                                            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <ExternalLink className="w-5 h-5 text-green-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
                                                Click Below Link
                                            </h2>
                                            <p className="text-gray-600 italic">
                                                Click the button <b>2</b> time to watch your destination
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                                                <button
                                                    onClick={handleRedirect}
                                                    className="btn-primary w-full flex items-center justify-center space-x-2 text-lg"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                    <span className="font-bold font-sans">Watch Now</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* URL Section - Shown after timer completes */}
            {/*
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
            */}
        </div>
    )
}

export default Redirect