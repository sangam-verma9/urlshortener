// config/api.js
import { createShortUrl, findLongUrl } from '../services/urlService'
import { submitContactForm } from '../services/formService'

// Firebase doesn't need base URL since we're using local services
export const API_BASE_URL = '' // Not needed for Firebase

// API endpoint functions (replacing REST endpoints with Firebase service calls)
export const API_ENDPOINTS = {
    // URL endpoints
    CREATE_URL: async (data) => {
        try {
            return await createShortUrl(data.value)
        } catch (error) {
            throw new Error(error.message || 'Failed to create short URL')
        }
    },

    FIND_URL: async (key) => {
        try {
            return await findLongUrl(key)
        } catch (error) {
            throw new Error(error.message || 'Failed to find URL')
        }
    },

    // Contact form endpoint
    SUBMIT_CONTACT: async (data) => {
        try {
            return await submitContactForm(data)
        } catch (error) {
            throw new Error(error.message || 'Failed to submit contact form')
        }
    }
}

// Updated API utility function for Firebase
export const apiRequest = async (endpointFunction, data = null) => {
    try {
        // For Firebase, we call the function directly instead of making HTTP requests
        if (typeof endpointFunction === 'function') {
            return await endpointFunction(data)
        }

        // Legacy support for string endpoints (will throw error to catch incorrect usage)
        throw new Error('Invalid endpoint. Please use Firebase service functions.')

    } catch (error) {
        console.error('API request failed:', error)

        // Return a consistent error structure
        return {
            success: false,
            message: error.message || 'An unexpected error occurred',
            error: error
        }
    }
}

// Helper functions for backward compatibility with your existing components
export const createUrl = async (longUrl) => {
    return await apiRequest(API_ENDPOINTS.CREATE_URL, { value: longUrl })
}

export const findUrl = async (key) => {
    return await apiRequest(API_ENDPOINTS.FIND_URL, key)
}

export const submitContact = async (formData) => {
    return await apiRequest(API_ENDPOINTS.SUBMIT_CONTACT, formData)
}

// Environment configuration
export const CONFIG = {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    firebase: {
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        useEmulator: import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true'
    }
}

export default {
    API_ENDPOINTS,
    apiRequest,
    createUrl,
    findUrl,
    submitContact,
    CONFIG
}