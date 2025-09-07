import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Clock, AlertCircle, ArrowDown, Home } from 'lucide-react'
import { findUrl } from '../config/api'

// Ad Component for reusability
const GoogleAd = ({ slot, format = "auto", responsive = true, style = {} }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <div className="ad-container" style={{ textAlign: 'center', margin: '20px 0', ...style }}>
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    ...(responsive && { width: '100%' }),
                }}
                data-ad-client="ca-pub-8639067847402396"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

const Redirect = () => {
    const { key } = useParams()
    const [countdown, setCountdown] = useState(5)
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

                    {/* Ad Position 1: Loading State Ad */}
                    <div className="mt-6">
                        <GoogleAd
                            slot="6849731724"
                            format="rectangle"
                            style={{ minHeight: '200px' }}
                        />
                    </div>
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

                    {/* Ad Position 2: Error State Ad */}
                    <div className="mb-6">
                        <GoogleAd
                            slot="6849731724"
                            format="rectangle"
                            style={{ minHeight: '200px' }}
                        />
                    </div>

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

                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-600  flex items-center justify-center mx-auto mb-8 shadow-lg">
                                    <span className="text-3xl font-bold text-white">
                                        {countdown}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 mb-6">
                                    Please wait while we prepare your destination...
                                </p>

                                {/* Ad Position 3: During Countdown - Perfect for user engagement */}
                                <div className="mt-6">
                                    <GoogleAd
                                        slot="6849731724"
                                        format="rectangle"
                                        style={{ minHeight: '250px' }}
                                    />
                                </div>
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

                                {/* Ad Position 4: Timer Complete - Horizontal Ad */}
                                <div className="mt-6">
                                    <GoogleAd
                                        slot="2719733262"
                                        format="auto"
                                        style={{ minHeight: '100px' }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* URL Section - Shown after timer completes */}
            {timerComplete && (
                <div id="url-section" className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
                    <div className="w-full max-w-2xl">
                        {/* Ad Position 5: Top of URL Section */}
                        <div className="mb-6">
                            <GoogleAd
                                slot="2719733262"
                                format="auto"
                                style={{ minHeight: '100px' }}
                            />
                        </div>

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

                            {/* Ad Position 6: Before the redirect button */}
                            <div className="mb-6">
                                <GoogleAd
                                    slot="6849731724"
                                    format="rectangle"
                                    style={{ minHeight: '250px' }}
                                />
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

                            {/* Ad Position 7: After the redirect button */}
                            <div className="mt-6">
                                <GoogleAd
                                    slot="2719733262"
                                    format="auto"
                                    style={{ minHeight: '100px' }}
                                />
                            </div>
                        </div>

                        {/* Ad Position 8: Bottom of URL Section */}
                        <div className="mt-6">
                            <GoogleAd
                                slot="6849731724"
                                format="rectangle"
                                style={{ minHeight: '200px' }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Ad Position 9: Fixed Sidebar for Desktop */}
            <div className="hidden xl:block fixed left-4 top-1/2 transform -translate-y-1/2 w-64">
                <GoogleAd
                    slot="6849731724"
                    format="rectangle"
                    responsive={false}
                    style={{ minHeight: '250px', width: '250px' }}
                />
            </div>

            {/* Ad Position 10: Fixed Bottom Banner for Mobile */}
            <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
                <GoogleAd
                    slot="2719733262"
                    format="auto"
                    style={{ minHeight: '50px', margin: '10px' }}
                />
            </div>
        </div>
    )
}

export default Redirect