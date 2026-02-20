import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import axios from "axios";
import { incrementEngagement } from "../utils/engagementTracker";

const DemoRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullname: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
  });

  // Pre-fill form with user profile data on component mount
  React.useEffect(() => {
    const fetchUserAndLeadData = async () => {
      const user = localStorage.getItem("user");
      const leadId = localStorage.getItem("leadId");

      let profileData = {
        fullname: "",
        email: "",
        company: "",
        phone: "",
        industry: "",
      };

      // First, get data from logged-in user profile
      if (user) {
        try {
          const userData = JSON.parse(user);
          profileData = {
            fullname: userData.fullName || "",
            email: userData.email || "",
            company: userData.company || "",
            phone: userData.phone || "",
            industry: userData.industry || "",
          };
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      // Then, fetch existing lead data if available (may have more info)
      if (leadId) {
        try {
          const response = await axios.get(`/api/leads/${leadId}`);
          if (response.data?.success) {
            const lead = response.data.data;

            // Merge lead data with user profile, preferring non-empty values
            profileData = {
              fullname: profileData.fullname || lead.name || "",
              email: profileData.email || lead.email || "",
              company: profileData.company || lead.company || "",
              phone: profileData.phone || lead.phone || "",
              industry: profileData.industry || lead.service || "",
            };
          }
        } catch (error) {
          console.error("Error fetching lead data:", error);
        }
      }

      setUserProfile(profileData);
    };

    fetchUserAndLeadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // Check if we already have a leadId for this user
      const existingLeadId = localStorage.getItem("leadId");

      // Send data to backend to create or update the lead
      const response = await axios.post("/api/leads", {
        fullname: data.fullname,
        email: data.email,
        company: data.company,
        phone: data.phone || "",
        industry: data.industry,
        message: data.message,
        source: "Demo Request",
        sessionId: sessionStorage.getItem("sessionId"),
      });

      // Store/update leadId for future tracking across sessions
      if (response.data?.data?._id) {
        localStorage.setItem("leadId", response.data.data._id);

        // Log if this is a returning user with multiple form submissions
        if (existingLeadId && existingLeadId === response.data.data._id) {
          console.log("Demo request submitted by returning lead");
        } else if (response.data.message?.includes("updated")) {
          console.log("Lead record merged - same email, different session");
        }
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting demo request:", error);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <section
          className="section"
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div className="container">
            <div
              className="glass-card"
              style={{
                maxWidth: "400px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
              <h2
                style={{
                  fontSize: "1.75rem",
                  marginBottom: "1rem",
                  color: "#fff",
                }}
              >
                Request Sent
              </h2>
              <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
                Thank you for your interest. We'll be in touch.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="btn btn-primary"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section
        className="section"
        style={{
          paddingTop: "8rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <div
            className="glass-card"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "2rem" }}>Request a Demo</h2>
              <p>See the platform in action.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                label="Check this box if you are human"
                type="text"
                name="name"
                style={{ display: "none" }}
              />

              <Input
                label="Full Name"
                type="text"
                name="fullname"
                required
                defaultValue={userProfile.fullname}
              />
              <Input
                label="Business Email"
                type="email"
                name="email"
                required
                defaultValue={userProfile.email}
              />
              <Input
                label="Company Name"
                type="text"
                name="company"
                required
                defaultValue={userProfile.company}
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                defaultValue={userProfile.phone}
              />

              <div className="input-group">
                <label
                  className="input-label"
                  htmlFor="industry"
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Industry
                </label>
                <select
                  className="input-field"
                  name="industry"
                  id="industry"
                  required
                  defaultValue={userProfile.industry}
                >
                  <option value="" style={{ color: "black" }}>
                    Select Industry...
                  </option>
                  <option value="SaaS" style={{ color: "black" }}>
                    SaaS / Technology
                  </option>
                  <option value="Finance" style={{ color: "black" }}>
                    Finance
                  </option>
                  <option value="Healthcare" style={{ color: "black" }}>
                    Healthcare
                  </option>
                  <option value="E-commerce" style={{ color: "black" }}>
                    E-commerce
                  </option>
                  <option value="Other" style={{ color: "black" }}>
                    Other
                  </option>
                </select>
              </div>

              <div className="input-group">
                <label
                  className="input-label"
                  htmlFor="message"
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="input-field"
                  rows="3"
                ></textarea>
              </div>

              <Button type="submit" loading={loading} disabled={loading}>
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DemoRequest;
