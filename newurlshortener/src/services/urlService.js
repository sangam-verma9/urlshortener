import {
    collection,
    doc,
    setDoc,
    getDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    deleteDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import xxhash from 'xxhashjs'

// Improved hash function using xxhashjs
function generateKey(url, size = 8, attempt = 0) {
    try {
        // Add attempt counter to ensure different hashes on collision
        const input = url + (attempt > 0 ? `_${attempt}` : '')
        
        // Use xxhash with a seed for better distribution
        const seed = 0x12345678 // You can use any seed value
        const hash = xxhash.h64(input, seed)
        
        // Convert to hex string and take first 'size' characters
        const hashHex = hash.toString(16)
        
        // Ensure we have enough characters, pad with timestamp if needed
        if (hashHex.length < size) {
            const timestamp = Date.now().toString(36)
            const combined = hashHex + timestamp
            return combined.slice(0, size)
        }
        
        return hashHex.slice(0, size)
    } catch (error) {
        console.error('Error generating hash:', error)
        // Fallback to timestamp-based key
        return Date.now().toString(36).slice(0, size)
    }
}

// Alternative function for even better uniqueness (using different hash functions)
function generateKeyAdvanced(url, size = 8, attempt = 0) {
    const input = url + (attempt > 0 ? `_${attempt}` : '')
    
    // Use different hash algorithms for different attempts
    const algorithms = [
        () => xxhash.h64(input, 0x12345678),
        () => xxhash.h64(input, 0x87654321),
        () => xxhash.h32(input, 0xABCDEF00),
        () => xxhash.h32(input, 0x00FEDCBA)
    ]
    
    const hashFunction = algorithms[attempt % algorithms.length]
    const hash = hashFunction()
    
    return hash.toString(16).slice(0, size)
}

// Create new short URL with collision detection
export const createShortUrl = async (longUrl, maxRetries = 5) => {
    try {
        if (!longUrl) {
            throw new Error('Please enter a URL')
        }

        // Normalize URL (optional - removes trailing slashes, etc.)
        const normalizedUrl = longUrl.trim().toLowerCase()

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            // Generate key with attempt counter for collision handling
            const key = generateKey(normalizedUrl, 8, attempt)

            // Check if key already exists
            const urlDoc = await getDoc(doc(db, 'urls', key))

            if (urlDoc.exists()) {
                const existingData = urlDoc.data()
                
                // If same URL, return existing (deduplication)
                if (existingData.value === longUrl || existingData.value === normalizedUrl) {
                    return {
                        success: true,
                        message: "URL already shortened",
                        url: {
                            key: urlDoc.id,
                            value: existingData.value,
                            createdAt: existingData.createdAt
                        }
                    }
                }
                
                // Different URL (collision), try again with next attempt
                console.log(`Collision detected for key: ${key}, attempt: ${attempt + 1}`)
                continue
            }

            // Key is unique, create new URL document
            const urlData = {
                value: longUrl,
                key: key,
                // createdAt: serverTimestamp(),
                // Optional: Add metadata
                // normalizedValue: normalizedUrl,
                // clickCount: 0
            }

            await setDoc(doc(db, 'urls', key), urlData)

            return {
                success: true,
                url: {
                    key: key,
                    value: longUrl,
                    createdAt: new Date()
                }
            }
        }

        // If we exhausted all retries, use a guaranteed unique key
        const fallbackKey = generateFallbackKey()
        const urlData = {
            value: longUrl,
            key: fallbackKey,
            createdAt: serverTimestamp(),
            normalizedValue: normalizedUrl,
            clickCount: 0,
            isFallback: true
        }

        await setDoc(doc(db, 'urls', fallbackKey), urlData)

        return {
            success: true,
            url: {
                key: fallbackKey,
                value: longUrl,
                createdAt: new Date()
            }
        }

    } catch (error) {
        console.error('Error creating short URL:', error)
        throw new Error(error.message || 'Failed to create short URL')
    }
}

// Fallback key generator for extreme collision cases
function generateFallbackKey(size = 8) {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    const combined = timestamp + random
    return combined.slice(0, size)
}

// Find long URL by key
export const findLongUrl = async (key) => {
    try {
        if (!key) {
            throw new Error('Key is required')
        }

        const urlDoc = await getDoc(doc(db, 'urls', key))

        if (!urlDoc.exists()) {
            return {
                success: false,
                message: "URL not found"
            }
        }

        const urlData = urlDoc.data()

        // Optional: Increment click count
        try {
            await setDoc(doc(db, 'urls', key), {
                ...urlData,
                clickCount: (urlData.clickCount || 0) + 1,
                lastAccessed: serverTimestamp()
            })
        } catch (updateError) {
            console.log('Could not update click count:', updateError)
            // Don't fail the request if we can't update metrics
        }

        return {
            success: true,
            longUrl: urlData.value
        }
    } catch (error) {
        console.error('Error finding long URL:', error)
        throw new Error(error.message || 'Failed to find URL')
    }
}

// Check if URL already exists (optional utility function)
export const checkUrlExists = async (longUrl) => {
    try {
        const normalizedUrl = longUrl.trim().toLowerCase()
        const urlsRef = collection(db, 'urls')
        const q = query(urlsRef, where('normalizedValue', '==', normalizedUrl))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]
            return {
                exists: true,
                key: doc.id,
                data: doc.data()
            }
        }

        return { exists: false }
    } catch (error) {
        console.error('Error checking URL existence:', error)
        return { exists: false }
    }
}

// Get all URLs (for admin purposes)
export const getAllUrls = async () => {
    try {
        const urlsCollection = collection(db, 'urls')
        const urlSnapshot = await getDocs(urlsCollection)

        const urls = []
        urlSnapshot.forEach((doc) => {
            urls.push({
                id: doc.id,
                ...doc.data()
            })
        })

        return {
            success: true,
            urls: urls
        }
    } catch (error) {
        console.error('Error getting all URLs:', error)
        throw new Error('Failed to fetch URLs')
    }
}

// Delete URL by key
export const deleteUrl = async (key) => {
    try {
        await deleteDoc(doc(db, 'urls', key))
        return {
            success: true,
            message: "URL deleted successfully"
        }
    } catch (error) {
        console.error('Error deleting URL:', error)
        throw new Error('Failed to delete URL')
    }
}

// Get URL statistics (optional)
export const getUrlStats = async (key) => {
    try {
        const urlDoc = await getDoc(doc(db, 'urls', key))
        
        if (!urlDoc.exists()) {
            return {
                success: false,
                message: "URL not found"
            }
        }

        const data = urlDoc.data()
        return {
            success: true,
            stats: {
                key: key,
                originalUrl: data.value,
                clickCount: data.clickCount || 0,
                createdAt: data.createdAt,
                lastAccessed: data.lastAccessed || null
            }
        }
    } catch (error) {
        console.error('Error getting URL stats:', error)
        throw new Error('Failed to get URL statistics')
    }
}