import axios from "axios";

/**
 * Generate or retrieve a unique session ID for this browsing session
 * Uses sessionStorage to persist across page navigations in the same tab
 */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("sessionId", sessionId);
    sessionStorage.setItem("sessionStartTime", Date.now().toString());
  }
  return sessionId;
};

/**
 * Helper function to safely trace behavioral engagement for a lead.
 * Does not block the main thread and handles errors silently.
 *
 * @param {string} fieldName - The engagement metric to increment (e.g., 'website_visits')
 * @param {string} [leadId] - Optional lead ID. If not provided, it tries to fetch 'leadId' or 'user._id' from localStorage.
 * @param {object} [metadata] - Additional metadata like page name, duration, etc.
 */
export const incrementEngagement = async (
  fieldName,
  leadId = null,
  metadata = {},
) => {
  try {
    // Find a valid lead ID to track against
    let idToTrack = leadId;

    if (!idToTrack) {
      idToTrack = localStorage.getItem("leadId");
    }

    // If still no ID but there's a logged-in user, use mapped leadId fallback
    if (!idToTrack) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        idToTrack = user.leadId;
      }
    }

    // If we still don't have an ID, we can't track it yet (anonymous visitor)
    if (!idToTrack) {
      return;
    }

    // Get session ID
    const sessionId = getSessionId();

    // Add current page to metadata if not provided
    if (!metadata.page) {
      metadata.page = window.location.pathname;
    }

    // Add timestamp
    metadata.timestamp = new Date().toISOString();

    // Non-blocking fire-and-forget payload
    axios
      .patch(`/api/leads/${idToTrack}/engagement`, {
        field: fieldName,
        sessionId,
        metadata,
      })
      .catch(() => {
        // Handled silently to not interrupt UX
      });
  } catch (error) {
    // Completely silent fallback
  }
};

/**
 * Track page visit with duration (call when user is about to leave)
 * @param {number} duration - Time spent on page in seconds
 */
export const trackPageDuration = (duration) => {
  const leadId = localStorage.getItem("leadId");
  if (!leadId) return;

  const sessionId = getSessionId();

  axios
    .patch(`/api/leads/${leadId}/engagement`, {
      field: "website_visits",
      sessionId,
      metadata: {
        page: window.location.pathname,
        duration,
        type: "page_duration",
      },
    })
    .catch(() => {});
};

/**
 * Initialize page visit tracking with duration measurement
 * Call this in useEffect of each page component
 */
export const initPageTracking = (pageName) => {
  const startTime = Date.now();

  // Track initial visit
  incrementEngagement("website_visits", null, {
    page: pageName || window.location.pathname,
  });

  // Track duration on page unload
  const handleUnload = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    if (duration > 2) {
      // Only track if stayed more than 2 seconds
      trackPageDuration(duration);
    }
  };

  window.addEventListener("beforeunload", handleUnload);

  // Return cleanup function
  return () => {
    window.removeEventListener("beforeunload", handleUnload);
    const duration = Math.floor((Date.now() - startTime) / 1000);
    if (duration > 2) {
      trackPageDuration(duration);
    }
  };
};
