import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  CheckCircle,
  Clock,
  TrendingUp,
  MousePointer,
  Hand,
  Activity,
  Mail,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";

const dataTrend = [
  { name: "Jan", leads: 40 },
  { name: "Feb", leads: 30 },
  { name: "Mar", leads: 20 },
  { name: "Apr", leads: 45 },
  { name: "May", leads: 60 },
  { name: "Jun", leads: 55 },
  { name: "Jul", leads: 70 },
];

const dataSource = [
  { name: "Website", value: 35 },
  { name: "LinkedIn", value: 25 },
  { name: "Ads", value: 20 },
  { name: "Referral", value: 15 },
  { name: "Direct", value: 5 },
];

const COLORS = ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e3a8a"];

const AdminOverview = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [engagementStats, setEngagementStats] = useState({
    totalVisits: 0,
    totalPricingClicks: 0,
    totalDemoRequests: 0,
    totalEmailOpens: 0,
    avgSessionsPerLead: 0,
    totalSessions: 0,
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data } = await axios.get("/api/leads");
      if (data.success) {
        setLeads(data.data);
        calculateEngagementStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateEngagementStats = (leadsData) => {
    const stats = leadsData.reduce(
      (acc, lead) => {
        const eng = lead.engagement || {};
        return {
          totalVisits: acc.totalVisits + (eng.website_visits || 0),
          totalPricingClicks:
            acc.totalPricingClicks + (eng.pricing_page_click || 0),
          totalDemoRequests: acc.totalDemoRequests + (eng.demo_requested || 0),
          totalEmailOpens: acc.totalEmailOpens + (eng.email_open_count || 0),
          totalSessions: acc.totalSessions + (eng.unique_sessions || 0),
        };
      },
      {
        totalVisits: 0,
        totalPricingClicks: 0,
        totalDemoRequests: 0,
        totalEmailOpens: 0,
        totalSessions: 0,
      },
    );

    stats.avgSessionsPerLead =
      leadsData.length > 0
        ? (stats.totalSessions / leadsData.length).toFixed(1)
        : 0;

    setEngagementStats(stats);
  };

  const kpiData = [
    {
      title: "Total Leads",
      value: leads.length.toString(),
      growth: "+12.5%",
      icon: Users,
      color: "#60a5fa",
    },
    {
      title: "New Leads (Today)",
      value: leads
        .filter((l) => {
          const today = new Date();
          const leadDate = new Date(l.createdAt);
          return leadDate.toDateString() === today.toDateString();
        })
        .length.toString(),
      growth: "+5.2%",
      icon: UserPlus,
      color: "#38bdf8",
    },
    {
      title: "Converted Leads",
      value: leads.filter((l) => l.status === "Converted").length.toString(),
      growth: "+18.1%",
      icon: CheckCircle,
      color: "#818cf8",
    },
    {
      title: "Pending Follow-ups",
      value: leads
        .filter((l) => ["New", "Contacted"].includes(l.status))
        .length.toString(),
      growth: "-2.4%",
      icon: Clock,
      color: "#94a3b8",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* KPI Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px -10px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: `rgba(255,255,255,0.03)`,
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <kpi.icon size={20} color={kpi.color} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  color: kpi.growth.startsWith("+") ? "#60a5fa" : "#9ca3af",
                  background: kpi.growth.startsWith("+")
                    ? "rgba(96, 165, 250, 0.1)"
                    : "rgba(255,255,255,0.05)",
                  padding: "4px 8px",
                  borderRadius: "12px",
                }}
              >
                {kpi.growth.startsWith("+") && <TrendingUp size={12} />}
                {kpi.growth}
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "0.85rem",
                  color: "#9ca3af",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                }}
              >
                {kpi.title}
              </h3>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {kpi.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Metrics for ML - Key Features */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "1.5rem",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "1rem",
            color: "#e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Activity size={18} color="#60a5fa" />
          Engagement Metrics (ML Model Features)
        </h3>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#9ca3af",
            marginBottom: "1.5rem",
          }}
        >
          Real-time user behavior tracking across all leads for predictive
          analysis
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "rgba(156, 163, 175, 0.05)",
              border: "1px solid rgba(156, 163, 175, 0.15)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(156, 163, 175, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MousePointer size={22} color="#9ca3af" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: "0.25rem",
                }}
              >
                {engagementStats.totalVisits}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Total Website Visits
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(96, 165, 250, 0.05)",
              border: "1px solid rgba(96, 165, 250, 0.2)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(96, 165, 250, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Hand size={22} color="#60a5fa" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#60a5fa",
                  marginBottom: "0.25rem",
                }}
              >
                {engagementStats.totalPricingClicks}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Pricing Page Views
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(16, 185, 129, 0.05)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={22} color="#10b981" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#10b981",
                  marginBottom: "0.25rem",
                }}
              >
                {engagementStats.totalDemoRequests}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Demo Requests
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(139, 92, 246, 0.05)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(139, 92, 246, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Mail size={22} color="#8b5cf6" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#8b5cf6",
                  marginBottom: "0.25rem",
                }}
              >
                {engagementStats.totalEmailOpens}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Email Opens
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(245, 158, 11, 0.05)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={22} color="#f59e0b" />
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#f59e0b",
                  marginBottom: "0.25rem",
                }}
              >
                {engagementStats.avgSessionsPerLead}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Avg Sessions/Lead
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(96, 165, 250, 0.05)",
            border: "1px solid rgba(96, 165, 250, 0.15)",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "#60a5fa",
              fontWeight: "600",
              marginBottom: "0.25rem",
            }}
          >
            💡 ML Model Ready
          </div>
          <div
            style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: "1.5" }}
          >
            These metrics are automatically tracked and stored for each lead.
            The ML model will use these features (email opens, visits, pricing
            views, demo requests) to predict conversion probability.
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Line Chart */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "1.5rem",
            height: "380px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              color: "#e2e8f0",
            }}
          >
            Lead Trend
          </h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dataTrend}
                margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,15,15,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#60a5fa" }}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#0f0f0f",
                    stroke: "#60a5fa",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#60a5fa",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "1.5rem",
            height: "380px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              color: "#e2e8f0",
            }}
          >
            Lead Source
          </h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataSource}
                margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
                barSize={32}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    background: "rgba(15,15,15,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {dataSource.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
