import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    limit
} from 'firebase/firestore'
import { db } from '../firebase'

// Submit contact form
export const submitContactForm = async (formData) => {
    try {
        const { name, email, subject, message } = formData

        // Validation
        if (!name || !email || !message) {
            throw new Error('Please fill all required fields')
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address')
        }

        // Create form submission document
        const formSubmission = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject?.trim() || 'Contact Form Submission',
            message: message.trim(),
            createdAt: serverTimestamp(),
            status: 'unread' // For admin purposes
        }

        // Add to Firestore
        const docRef = await addDoc(collection(db, 'forms'), formSubmission)

        return {
            success: true,
            message: 'Form submitted successfully',
            form: {
                id: docRef.id,
                ...formSubmission,
                createdAt: new Date() // For immediate response
            }
        }
    } catch (error) {
        console.error('Error submitting form:', error)

        // Return specific error messages
        if (error.message.includes('required fields') ||
            error.message.includes('valid email')) {
            throw new Error(error.message)
        }

        throw new Error('Failed to submit form. Please try again.')
    }
}

// Get all form submissions (for admin use)
export const getAllFormSubmissions = async (limitCount = 50) => {
    try {
        const formsCollection = collection(db, 'forms')
        const q = query(
            formsCollection,
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        )

        const formSnapshot = await getDocs(q)

        const forms = []
        formSnapshot.forEach((doc) => {
            forms.push({
                id: doc.id,
                ...doc.data()
            })
        })

        return {
            success: true,
            forms: forms,
            count: forms.length
        }
    } catch (error) {
        console.error('Error getting form submissions:', error)
        throw new Error('Failed to fetch form submissions')
    }
}

// Get unread form submissions count (for admin notifications)
export const getUnreadFormsCount = async () => {
    try {
        const formsCollection = collection(db, 'forms')
        const q = query(
            formsCollection,
            where('status', '==', 'unread')
        )

        const formSnapshot = await getDocs(q)

        return {
            success: true,
            count: formSnapshot.size
        }
    } catch (error) {
        console.error('Error getting unread forms count:', error)
        throw new Error('Failed to get unread forms count')
    }
}

// Mark form as read (for admin use)
export const markFormAsRead = async (formId) => {
    try {
        await updateDoc(doc(db, 'forms', formId), {
            status: 'read',
            readAt: serverTimestamp()
        })

        return {
            success: true,
            message: 'Form marked as read'
        }
    } catch (error) {
        console.error('Error marking form as read:', error)
        throw new Error('Failed to update form status')
    }
}

// Delete form submission (for admin use)
export const deleteFormSubmission = async (formId) => {
    try {
        await deleteDoc(doc(db, 'forms', formId))

        return {
            success: true,
            message: 'Form submission deleted successfully'
        }
    } catch (error) {
        console.error('Error deleting form:', error)
        throw new Error('Failed to delete form submission')
    }
}