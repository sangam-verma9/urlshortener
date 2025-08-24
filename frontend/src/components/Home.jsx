import React, { useState, useEffect } from 'react'
import { Copy, Link, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { API_ENDPOINTS, apiRequest } from '../config/api'

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

const Home = () => {
    const [longUrl, setLongUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [originalUrl, setOriginalUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const domain = window.location.origin

    const isValidUrl = (string) => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!longUrl.trim()) {
            setError('Please enter a URL')
            return
        }

        if (!isValidUrl(longUrl)) {
            setError('Please enter a valid URL')
            return
        }

        setLoading(true)
        setError('')

        try {
            const data = await apiRequest(API_ENDPOINTS.CREATE_URL, {
                method: 'POST',
                body: JSON.stringify({
                    value: longUrl
                })
            })

            if (data.success) {
                setShortUrl(`${domain}/r/${data.url.key}`)
                setOriginalUrl(data.url.value)
                setLongUrl('')
            } else {
                setError('Failed to shorten URL. Please try again.')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            setError('Failed to copy URL')
        }
    }

    const handleReset = () => {
        setShortUrl('')
        setOriginalUrl('')
        setError('')
        setCopied(false)
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Link className="w-12 h-12 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                        Make Short URL
                    </h1>
                    <p className="text-gray-600 text-lg italic">
                        Transform long URLs into short, shareable links instantly
                    </p>
                </div>

                {/* Ad Position 1: Top Banner - Horizontal Ad */}
                <div className="mb-6">
                    <GoogleAd
                        slot="2719733262"
                        format="auto"
                        style={{ minHeight: '100px' }}
                    />
                </div>

                {/* Main Card */}
                <div className="card">
                    {!shortUrl ? (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center font-serif">
                                Paste the URL to be shortened
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        value={longUrl}
                                        onChange={(e) => setLongUrl(e.target.value)}
                                        placeholder="Enter the link here"
                                        className="input-field text-lg font-thin"
                                        disabled={loading}
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                                        <AlertCircle className="w-5 h-5" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary font-extrabold w-full cursor-pointer text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Shortening...
                                        </span>
                                    ) : (
                                        'Shorten URL'
                                    )}
                                </button>
                            </form>

                            {/* Ad Position 2: Inside form area - Square Ad (Mobile friendly) */}
                            <div className="mt-6 mb-4 block md:hidden">
                                <GoogleAd
                                    slot="6849731724"
                                    format="rectangle"
                                    style={{ minHeight: '250px' }}
                                />
                            </div>

                            <div className="mt-8 text-center text-sm text-gray-500 font-stretch-50%">
                                <p>ShortURL provides a fast way to shorten lengthy URLs, simplifying sharing across platforms.</p>
                                <p>Easily create shareable short links using ShortURL's free link shortening tool.</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                                Your shortened URL
                            </h2>
                            <p className="text-gray-600 text-center mb-6">
                                Copy the short link and share it in messages, texts, posts, websites and other locations.
                            </p>

                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={shortUrl}
                                        readOnly
                                        className="input-field flex-1 bg-gray-50 font-mono text-sm"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className={`btn-primary flex items-center justify-center space-x-2 whitespace-nowrap ${copied ? 'bg-green-600 hover:bg-green-700' : ''
                                            }`}
                                    >
                                        {copied ? (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                <span>Copy URL</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <span className="text-sm text-gray-600">Long URL:</span>
                                        <a
                                            href={originalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm break-all flex items-center gap-1"
                                        >
                                            {originalUrl}
                                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                        </a>
                                    </div>
                                </div>

                                {/* Ad Position 3: In results - Square Ad between URL display and reset button */}
                                <div className="py-4">
                                    <GoogleAd
                                        slot="6849731724"
                                        format="rectangle"
                                        style={{ minHeight: '250px' }}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        onClick={handleReset}
                                        className="btn-primary flex-1"
                                    >
                                        Shorten another URL
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    * Short URLs that do not have at least one click per month are disabled
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Ad Position 4: Bottom Banner - Horizontal Ad */}
                <div className="mt-8">
                    <GoogleAd
                        slot="2719733262"
                        format="auto"
                        style={{ minHeight: '100px' }}
                    />
                </div>

                {/* Ad Position 5: Sidebar Ad for larger screens */}
                <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-64">
                    <GoogleAd
                        slot="6849731724"
                        format="rectangle"
                        responsive={false}
                        style={{ minHeight: '250px', width: '250px' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home