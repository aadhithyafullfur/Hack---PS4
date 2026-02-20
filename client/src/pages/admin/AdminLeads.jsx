import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  X,
  Check,
  Activity,
  MousePointer,
  Mail,
  Hand,
  Clock,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react";
import axios from "axios";

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data } = await axios.get("/api/leads");
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Status mapping to colors
  const statusColors = {
    New: {
      bg: "rgba(96, 165, 250, 0.15)",
      text: "#60a5fa",
      border: "rgba(96, 165, 250, 0.3)",
    },
    Contacted: {
      bg: "rgba(245, 158, 11, 0.15)",
      text: "#fbbf24",
      border: "rgba(245, 158, 11, 0.3)",
    },
    Qualified: {
      bg: "rgba(168, 85, 247, 0.15)",
      text: "#c084fc",
      border: "rgba(168, 85, 247, 0.3)",
    },
    Converted: {
      bg: "rgba(16, 185, 129, 0.15)",
      text: "#34d399",
      border: "rgba(16, 185, 129, 0.3)",
    },
    Lost: {
      bg: "rgba(239, 68, 68, 0.15)",
      text: "#f87171",
      border: "rgba(239, 68, 68, 0.3)",
    },
  };

  const openViewModal = (lead) => {
    setSelectedLead({ ...lead });
    setIsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedLead(null);
    setLeadToDelete(null);
  };

  const handleSaveLead = () => {
    setLeads(leads.map((l) => (l._id === selectedLead._id ? selectedLead : l)));
    closeModals();
  };

  const confirmDelete = (lead) => {
    setLeadToDelete(lead);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // Implement real delete later if needed
    setLeads(leads.filter((l) => l._id !== leadToDelete._id));
    closeModals();
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads(
      leads.map((l) => (l._id === id ? { ...l, status: newStatus } : l)),
    );
  };

  if (loading) {
    return (
      <div style={{ color: "#fff", padding: "2rem" }}>Loading leads...</div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        height: "100%",
        paddingBottom: "2rem",
      }}
    >
      {/* Header section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Lead Management
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.9rem",
              margin: "0.25rem 0 0 0",
            }}
          >
            Track and manage your incoming prospects
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <span
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              fontSize: "0.85rem",
              color: "#e2e8f0",
              fontWeight: "600",
            }}
          >
            Total: {leads.length} leads
          </span>
        </div>
      </div>

      {/* Glass Table Layout */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "0.85rem",
            }}
          >
            <thead
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                  }}
                >
                  Name & Email
                </th>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                  }}
                >
                  Company
                </th>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                  }}
                >
                  Service
                </th>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                  }}
                >
                  Conv. Prob.
                </th>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                  }}
                >
                  Source
                </th>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                    width: "90px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "1.2rem 1.5rem",
                    color: "#9ca3af",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontSize: "0.75rem",
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, idx) => (
                <tr
                  key={lead._id || idx}
                  style={{
                    borderBottom:
                      idx !== leads.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    transition: "background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#fff",
                        fontSize: "0.9rem",
                        marginBottom: "2px",
                      }}
                    >
                      {lead.name}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                      {lead.email}
                    </div>
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem", color: "#e2e8f0" }}>
                    {lead.company || "-"}
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem", color: "#e2e8f0" }}>
                    {lead.service || "-"}
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem", color: "#e2e8f0" }}>
                    {(lead.mlPrediction?.conversionProbability * 100).toFixed(1)}%
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem", color: "#9ca3af" }}>
                    {lead.source}
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem" }}>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead._id, e.target.value)
                      }
                      style={{
                        appearance: "none",
                        background: statusColors[lead.status]?.bg || "#000",
                        color: statusColors[lead.status]?.text || "#fff",
                        border: `1px solid ${statusColors[lead.status]?.border || "#333"}`,
                        padding: "0.4rem 1.5rem 0.4rem 0.8rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        outline: "none",
                        cursor: "pointer",
                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${statusColors[lead.status]?.text?.replace("#", "") || "fff"}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.6rem top 50%",
                        backgroundSize: "0.5rem auto",
                      }}
                    >
                      {Object.keys(statusColors).map((status) => (
                        <option
                          key={status}
                          value={status}
                          style={{ background: "#1f2937", color: "#fff" }}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem", color: "#9ca3af" }}>
                    {new Date(lead.createdAt || lead.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        onClick={() => openViewModal(lead)}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          padding: "0.4rem",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(96, 165, 250, 0.2)";
                          e.currentTarget.style.borderColor =
                            "rgba(96, 165, 250, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.05)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      >
                        <Eye size={16} color="#60a5fa" />
                      </button>
                      <button
                        onClick={() => confirmDelete(lead)}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          padding: "0.4rem",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(239, 68, 68, 0.2)";
                          e.currentTarget.style.borderColor =
                            "rgba(239, 68, 68, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.05)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Lead Modal */}
      {isModalOpen && selectedLead && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "rgba(15, 15, 15, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "600px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Lead Details
                </h3>
                <p
                  style={{
                    margin: "0.25rem 0 0 0",
                    fontSize: "0.85rem",
                    color: "#9ca3af",
                  }}
                >
                  Viewing information for {selectedLead.name}
                </p>
              </div>
              <button
                onClick={closeModals}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "0.5rem",
                  display: "flex",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div
              style={{
                padding: "1.5rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Full Name
                  </label>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      padding: "0.8rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {selectedLead.name}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Email
                  </label>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      padding: "0.8rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {selectedLead.email}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Phone
                  </label>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      padding: "0.8rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {selectedLead.phone}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Company
                  </label>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      padding: "0.8rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {selectedLead.company}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Service Requested
                  </label>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      padding: "0.8rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.9rem",
                      color: "#60a5fa",
                      fontWeight: "500",
                    }}
                  >
                    {selectedLead.service || "Not Specified"}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Lead Sources
                  </label>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {selectedLead.leadSourceType &&
                    selectedLead.leadSourceType.length > 0 ? (
                      selectedLead.leadSourceType.map((src, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: "rgba(96, 165, 250, 0.1)",
                            color: "#60a5fa",
                            border: "1px solid rgba(96, 165, 250, 0.2)",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                          }}
                        >
                          {src}
                        </span>
                      ))
                    ) : (
                      <span
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          color: "#9ca3af",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                        }}
                      >
                        {selectedLead.source}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      setSelectedLead({
                        ...selectedLead,
                        status: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.05)",
                      color: statusColors[selectedLead.status].text,
                      border: `1px solid ${statusColors[selectedLead.status].border}`,
                      padding: "0.8rem",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    {Object.keys(statusColors).map((status) => (
                      <option
                        key={status}
                        value={status}
                        style={{ background: "#1f2937", color: "#fff" }}
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    marginBottom: "0.4rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Latest Message
                </label>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    color: "#e2e8f0",
                    minHeight: "60px",
                  }}
                >
                  {selectedLead.message || "No message provided."}
                </div>
              </div>

              {/* All Messages History */}
              {selectedLead.messages && selectedLead.messages.length > 0 && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "1px dashed rgba(255,255,255,0.1)",
                      paddingBottom: "0.4rem",
                    }}
                  >
                    Message History ({selectedLead.messages.length}{" "}
                    {selectedLead.messages.length === 1
                      ? "message"
                      : "messages"}
                    )
                  </label>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      overflow: "hidden",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {selectedLead.messages
                      .slice()
                      .reverse()
                      .map((msg, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "1rem",
                            borderBottom:
                              idx < selectedLead.messages.length - 1
                                ? "1px solid rgba(255,255,255,0.03)"
                                : "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <span
                              style={{
                                background: "rgba(96, 165, 250, 0.1)",
                                color: "#60a5fa",
                                border: "1px solid rgba(96, 165, 250, 0.2)",
                                padding: "0.25rem 0.6rem",
                                borderRadius: "8px",
                                fontSize: "0.7rem",
                                fontWeight: "600",
                              }}
                            >
                              {msg.source || "Unknown"}
                            </span>
                            <span
                              style={{ fontSize: "0.75rem", color: "#6b7280" }}
                            >
                              {new Date(msg.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "#e2e8f0",
                              lineHeight: "1.5",
                            }}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Engagement Tracking Analytics Block */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    marginBottom: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px dashed rgba(255,255,255,0.1)",
                    paddingBottom: "0.4rem",
                  }}
                >
                  Lead Engagement Metrics (ML Features)
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      padding: "1rem",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <MousePointer
                      size={18}
                      color="#9ca3af"
                      style={{ margin: "0 auto 0.5rem" }}
                    />
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {selectedLead.engagement?.website_visits || 0}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Web Visits
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      padding: "1rem",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Hand
                      size={18}
                      color="#60a5fa"
                      style={{ margin: "0 auto 0.5rem" }}
                    />
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#60a5fa",
                      }}
                    >
                      {selectedLead.engagement?.pricing_page_click || 0}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Pricing Clicks
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      padding: "1rem",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Activity
                      size={18}
                      color="#10b981"
                      style={{ margin: "0 auto 0.5rem" }}
                    />
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#10b981",
                      }}
                    >
                      {selectedLead.engagement?.demo_requested || 0}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Demo Requests
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      padding: "1rem",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Mail
                      size={18}
                      color="#8b5cf6"
                      style={{ margin: "0 auto 0.5rem" }}
                    />
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#8b5cf6",
                      }}
                    >
                      {selectedLead.engagement?.email_open_count || 0}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Email Opens
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Analytics for ML */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    marginBottom: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px dashed rgba(255,255,255,0.1)",
                    paddingBottom: "0.4rem",
                  }}
                >
                  Session & Behavior Analytics
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(96, 165, 250, 0.05)",
                      border: "1px solid rgba(96, 165, 250, 0.2)",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Users size={16} color="#60a5fa" />
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Unique Sessions
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#60a5fa",
                      }}
                    >
                      {selectedLead.engagement?.unique_sessions || 0}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(168, 85, 247, 0.05)",
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Clock size={16} color="#a855f7" />
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Total Time (mins)
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#a855f7",
                      }}
                    >
                      {Math.floor(
                        (selectedLead.engagement?.total_time_on_site || 0) / 60,
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(34, 197, 94, 0.05)",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <TrendingUp size={16} color="#22c55e" />
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Pages Viewed
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#22c55e",
                      }}
                    >
                      {selectedLead.engagement?.pages_visited?.length || 0}
                    </div>
                  </div>
                </div>

                {/* Visit Timeline */}
                {(selectedLead.engagement?.first_visit ||
                  selectedLead.engagement?.last_visit) && (
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          First Visit
                        </div>
                        <div
                          style={{
                            color: "#fff",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <Calendar size={14} color="#60a5fa" />
                          {selectedLead.engagement?.first_visit
                            ? new Date(
                                selectedLead.engagement.first_visit,
                              ).toLocaleString()
                            : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Last Visit
                        </div>
                        <div
                          style={{
                            color: "#fff",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <Calendar size={14} color="#10b981" />
                          {selectedLead.engagement?.last_visit
                            ? new Date(
                                selectedLead.engagement.last_visit,
                              ).toLocaleString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ML Prediction Analytics */}
              {selectedLead.mlPrediction && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "1px dashed rgba(255,255,255,0.1)",
                      paddingBottom: "0.4rem",
                    }}
                  >
                    ML Conversion Prediction
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(34, 197, 94, 0.05)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                        padding: "1rem",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#22c55e",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {(selectedLead.mlPrediction.conversionProbability * 100).toFixed(1)}%
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Conversion Prob.
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(59, 130, 246, 0.05)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        padding: "1rem",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#3b82f6",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {selectedLead.mlPrediction.qualityGrade}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Quality Grade
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(168, 85, 247, 0.05)",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                        padding: "1rem",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#a855f7",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {selectedLead.mlPrediction.predictedScore.toFixed(1)}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Score (0-100)
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(245, 158, 11, 0.05)",
                        border: "1px solid rgba(245, 158, 11, 0.2)",
                        padding: "1rem",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#f59e0b",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {new Date(selectedLead.mlPrediction.lastPredicted).toLocaleDateString()}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Last Predicted
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature Breakdown */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        padding: "1rem",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Email Engagement
                      </div>
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#8b5cf6",
                        }}
                      >
                        {selectedLead.mlPrediction.features?.emailEngagement?.toFixed(2) || 0}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        padding: "1rem",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Visit Frequency
                      </div>
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#60a5fa",
                        }}
                      >
                        {selectedLead.mlPrediction.features?.visitFrequency?.toFixed(2) || 0}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        padding: "1rem",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Pricing Interest
                      </div>
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#10b981",
                        }}
                      >
                        {selectedLead.mlPrediction.features?.pricingInterest?.toFixed(2) || 0}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        padding: "1rem",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Demo Interest
                      </div>
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#f59e0b",
                        }}
                      >
                        {selectedLead.mlPrediction.features?.demoInterest?.toFixed(2) || 0}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity Log */}
              {selectedLead.engagement?.activity_log &&
                selectedLead.engagement.activity_log.length > 0 && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                        marginBottom: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        borderBottom: "1px dashed rgba(255,255,255,0.1)",
                        paddingBottom: "0.4rem",
                      }}
                    >
                      Recent Activity Log (Last 5)
                    </label>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      {selectedLead.engagement.activity_log
                        .slice(-5)
                        .reverse()
                        .map((activity, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: "0.75rem 1rem",
                              borderBottom:
                                idx <
                                Math.min(
                                  4,
                                  selectedLead.engagement.activity_log.length -
                                    1,
                                )
                                  ? "1px solid rgba(255,255,255,0.03)"
                                  : "none",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                              }}
                            >
                              <div
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background:
                                    activity.action === "demo_request"
                                      ? "#10b981"
                                      : activity.action === "pricing_view"
                                        ? "#60a5fa"
                                        : activity.action === "email_open"
                                          ? "#8b5cf6"
                                          : "#9ca3af",
                                }}
                              ></div>
                              <div>
                                <div
                                  style={{
                                    fontSize: "0.85rem",
                                    color: "#fff",
                                    fontWeight: "500",
                                  }}
                                >
                                  {activity.action === "visit"
                                    ? "Website Visit"
                                    : activity.action === "pricing_view"
                                      ? "Viewed Pricing Page"
                                      : activity.action === "demo_request"
                                        ? "Requested Demo"
                                        : activity.action === "email_open"
                                          ? "Opened Email"
                                          : activity.action}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.7rem",
                                    color: "#6b7280",
                                  }}
                                >
                                  {activity.metadata?.page &&
                                    `Page: ${activity.metadata.page}`}
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "#9ca3af",
                                textAlign: "right",
                              }}
                            >
                              {new Date(activity.timestamp).toLocaleString()}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    marginBottom: "0.4rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Admin Notes
                </label>
                <textarea
                  value={selectedLead.notes}
                  onChange={(e) =>
                    setSelectedLead({ ...selectedLead, notes: e.target.value })
                  }
                  placeholder="Add private notes for this lead..."
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    background: "rgba(255,255,255,0.03)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    color: "#fff",
                    outline: "none",
                    resize: "vertical",
                  }}
                  onFocus={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.05)";
                    e.target.style.borderColor = "#60a5fa";
                  }}
                  onBlur={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.03)";
                    e.target.style.borderColor = "rgba(96, 165, 250, 0.3)";
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <button
                onClick={closeModals}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLead}
                style={{
                  background: "#60a5fa",
                  border: "none",
                  color: "#0f0f0f",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 0.2s",
                  boxShadow: "0 0 15px rgba(96, 165, 250, 0.3)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3b82f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#60a5fa")
                }
              >
                <Check size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && leadToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "rgba(15, 15, 15, 0.95)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              overflow: "hidden",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(239, 68, 68, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                border: "2px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <Trash2 size={24} color="#ef4444" />
            </div>
            <h3
              style={{
                margin: "0 0 0.5rem 0",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Delete Lead?
            </h3>
            <p
              style={{
                margin: "0 0 1.5rem 0",
                color: "#9ca3af",
                fontSize: "0.95rem",
              }}
            >
              Are you sure you want to delete{" "}
              <span style={{ color: "#fff", fontWeight: "500" }}>
                {leadToDelete.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                onClick={closeModals}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.05)")
                }
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  border: "none",
                  color: "#fff",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#dc2626")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ef4444")
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
