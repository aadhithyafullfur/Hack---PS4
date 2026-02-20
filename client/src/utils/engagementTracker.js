import axios from 'axios';

/**
 * Helper function to safely trace behavioral engagement for a lead.
 * Does not block the main thread and handles errors silently.
 *
 * @param {string} fieldName - The engagement metric to increment (e.g., 'website_visits')
 * @param {string} [leadId] - Optional lead ID. If not provided, it tries to fetch 'leadId' or 'user._id' from localStorage.
 */
export const incrementEngagement = async (fieldName, leadId = null) => {
    try {
        // Find a valid lead ID to track against
        let idToTrack = leadId;

        if (!idToTrack) {
            idToTrack = localStorage.getItem('leadId');
        }

        // If still no ID but there's a logged-in user, use mapped leadId fallback
        if (!idToTrack) {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                idToTrack = user.leadId;
            }
        }

        // If we still don't have an ID, we can't track it yet (anonymous visitor)
        if (!idToTrack) {
            return;
        }

        // Non-blocking fire-and-forget payload
        axios.patch(`/api/leads/${idToTrack}/engagement`, {
            field: fieldName
        }).catch(() => {
            // Handled silently to not interrupt UX
        });

    } catch (error) {
        // Completely silent fallback
    }
};
