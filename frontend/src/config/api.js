const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// API endpoints
export const API_ENDPOINTS = {
    CREATE_URL: `${API_BASE_URL}/create`,
    FIND_URL: (key) => `${API_BASE_URL}/find/${key}`,
}

// API utility functions
export const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}

export default API_BASE_URL