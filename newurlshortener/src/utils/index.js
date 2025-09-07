import xxhash from 'xxhashjs'

// URL validation function
export const isValidUrl = (string) => {
    try {
        new URL(string)
        return true
    } catch (_) {
        return false
    }
}

// Email validation function
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// IMPROVED: xxhash-based key generation (replaces the old hashUrl function)
export const generateHashKey = (url, size = 8, attempt = 0) => {
    try {
        const input = url + (attempt > 0 ? `_${attempt}` : '')
        const seed = 0x12345678
        const hash = xxhash.h64(input, seed)
        const hashHex = hash.toString(16)

        if (hashHex.length < size) {
            const timestamp = Date.now().toString(36)
            return (hashHex + timestamp).slice(0, size)
        }

        return hashHex.slice(0, size)
    } catch (error) {
        console.error('Error generating hash key:', error)
        return generateRandomKey(size) // Fallback to random
    }
}

// Random key generation (keep as fallback)
export const generateRandomKey = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

// REMOVED: The old hashUrl function (replaced by generateHashKey)

// Format date function
export const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown'

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

// Copy to clipboard function
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text)
        return { success: true }
    } catch (err) {
        console.error('Failed to copy to clipboard:', err)

        // Fallback method
        try {
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            return { success: true }
        } catch (fallbackErr) {
            console.error('Fallback copy method failed:', fallbackErr)
            return { success: false, error: 'Failed to copy to clipboard' }
        }
    }
}

// Debounce function for performance optimization
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Throttle function for performance optimization
export const throttle = (func, limit) => {
    let inThrottle
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// Enhanced error handling utility
export const handleApiError = (error) => {
    console.error('API Error:', error)

    // Firebase specific error handling
    if (error.code) {
        switch (error.code) {
            case 'permission-denied':
                return 'You do not have permission to perform this action'
            case 'not-found':
                return 'The requested resource was not found'
            case 'already-exists':
                return 'This resource already exists'
            case 'invalid-argument':
                return 'Invalid data provided'
            case 'unavailable':
                return 'Service is temporarily unavailable. Please try again later'
            case 'unauthenticated':
                return 'Please sign in to continue'
            case 'deadline-exceeded':
                return 'Request timed out. Please try again'
            default:
                return error.message || 'An unexpected error occurred'
        }
    }

    return error.message || 'An unexpected error occurred'
}

// Form validation utilities
export const validateContactForm = (formData) => {
    const errors = {}

    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long'
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address'
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

// ENHANCED: URL validation with comprehensive checks
export const validateUrl = (url) => {
    if (!url || url.trim().length === 0) {
        return { isValid: false, error: 'URL is required' }
    }

    const trimmedUrl = url.trim()

    // Check length limits
    if (trimmedUrl.length > CONSTANTS.MAX_URL_LENGTH) {
        return { isValid: false, error: CONSTANTS.ERRORS.URL_TOO_LONG }
    }

    if (trimmedUrl.length < CONSTANTS.MIN_URL_LENGTH) {
        return { isValid: false, error: CONSTANTS.ERRORS.URL_TOO_SHORT }
    }

    // Add protocol if missing
    let processedUrl = trimmedUrl
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        processedUrl = 'https://' + trimmedUrl
    }

    if (!isValidUrl(processedUrl)) {
        return { isValid: false, error: 'Please enter a valid URL' }
    }

    // Check for potentially harmful patterns
    const suspiciousPatterns = [
        /javascript:/i,
        /data:/i,
        /vbscript:/i,
        /file:/i,
        /ftp:/i
    ]

    if (suspiciousPatterns.some(pattern => pattern.test(processedUrl))) {
        return { isValid: false, error: 'URL appears to be potentially harmful' }
    }

    // Check for localhost in production
    if (CONSTANTS.IS_PRODUCTION && /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(processedUrl)) {
        return { isValid: false, error: 'Localhost URLs are not allowed' }
    }

    return { isValid: true, url: processedUrl }
}

// ENHANCED: Constants with environment detection
export const CONSTANTS = {
    MAX_URL_LENGTH: 2048,
    MIN_URL_LENGTH: 10,
    DEFAULT_KEY_LENGTH: 8,
    MAX_KEY_LENGTH: 16,
    MIN_KEY_LENGTH: 4,
    DOMAIN: import.meta.env.VITE_DOMAIN || window.location.origin,
    AD_CLIENT: import.meta.env.VITE_GOOGLE_AD_CLIENT,
    IS_PRODUCTION: import.meta.env.PROD,
    IS_DEVELOPMENT: import.meta.env.DEV,

    // Hash configuration
    HASH: {
        DEFAULT_SIZE: 8,
        MAX_RETRIES: 5,
        SEED: 0x12345678
    },

    // Error messages
    ERRORS: {
        INVALID_URL: 'Please enter a valid URL',
        URL_TOO_LONG: `URL is too long (maximum ${2048} characters)`,
        URL_TOO_SHORT: 'URL is too short (minimum 10 characters)',
        NETWORK_ERROR: 'Network error. Please check your connection and try again',
        UNKNOWN_ERROR: 'An unexpected error occurred. Please try again',
        FORM_VALIDATION: 'Please fill in all required fields correctly',
        RATE_LIMIT: 'Too many requests. Please wait a moment and try again',
        UNSAFE_URL: 'This URL appears to be potentially harmful'
    },

    // Success messages
    SUCCESS: {
        URL_CREATED: 'Short URL created successfully',
        URL_UPDATED: 'URL updated successfully',
        FORM_SUBMITTED: 'Form submitted successfully',
        COPIED: 'Copied to clipboard',
        DELETED: 'URL deleted successfully'
    }
}

// Local storage utilities (for client-side caching)
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
            return true
        } catch (error) {
            console.error('Error saving to localStorage:', error)
            return false
        }
    },

    get: (key) => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return null
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key)
            return true
        } catch (error) {
            console.error('Error removing from localStorage:', error)
            return false
        }
    },

    clear: () => {
        try {
            localStorage.clear()
            return true
        } catch (error) {
            console.error('Error clearing localStorage:', error)
            return false
        }
    },

    // ADDED: Cache with expiration
    setWithExpiry: (key, value, ttl = 3600000) => { // 1 hour default
        try {
            const now = new Date()
            const item = {
                value: value,
                expiry: now.getTime() + ttl,
            }
            localStorage.setItem(key, JSON.stringify(item))
            return true
        } catch (error) {
            console.error('Error saving to localStorage with expiry:', error)
            return false
        }
    },

    getWithExpiry: (key) => {
        try {
            const itemStr = localStorage.getItem(key)
            if (!itemStr) return null

            const item = JSON.parse(itemStr)
            const now = new Date()

            if (now.getTime() > item.expiry) {
                localStorage.removeItem(key)
                return null
            }

            return item.value
        } catch (error) {
            console.error('Error reading from localStorage with expiry:', error)
            return null
        }
    }
}

// ADDED: Analytics utilities
export const analytics = {
    track: (event, data = {}) => {
        if (CONSTANTS.IS_PRODUCTION && window.gtag) {
            window.gtag('event', event, data)
        } else if (CONSTANTS.IS_DEVELOPMENT) {
            console.log('Analytics Event:', event, data)
        }
    },

    trackUrlCreation: (shortKey, originalUrl) => {
        analytics.track('url_created', {
            short_key: shortKey,
            original_domain: new URL(originalUrl).hostname
        })
    },

    trackUrlClick: (shortKey) => {
        analytics.track('url_clicked', {
            short_key: shortKey
        })
    }
}

// ADDED: Rate limiting utilities
export const rateLimiter = {
    canMakeRequest: (key, maxRequests = 10, windowMs = 60000) => {
        const now = Date.now()
        const windowKey = `rate_limit_${key}`

        const requests = storage.getWithExpiry(windowKey) || []
        const validRequests = requests.filter(time => now - time < windowMs)

        if (validRequests.length >= maxRequests) {
            return false
        }

        validRequests.push(now)
        storage.setWithExpiry(windowKey, validRequests, windowMs)

        return true
    }
}