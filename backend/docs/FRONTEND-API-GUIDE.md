# 🚀 Calf Health Monitoring API - Frontend Integration Guide

## Base URL

```
http://localhost:3001/api/calf-health
```

---

## 📱 API Endpoints

### 1. Dashboard Summary

**Get overall statistics and recent concerns**

```http
GET /dashboard
```

**Response:**

```json
{
  "success": true,
  "data": {
    "summary": {
      "total_calves": 25,
      "active_concerns": 6,
      "critical_concerns": 2,
      "runs_today": 4,
      "unread_notifications": 3
    },
    "recentConcerns": [...]
  }
}
```

**Usage in React:**

```javascript
const fetchDashboard = async () => {
  const response = await fetch(
    "http://localhost:3001/api/calf-health/dashboard"
  );
  const data = await response.json();
  console.log(data.data.summary);
};
```

---

### 2. Get Drone Runs for Pen (Screen 1)

**Get list of all drone runs for a specific pen**

```http
GET /pens/:penNumber/runs
```

**Example:**

```http
GET /pens/2/runs
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "runId": "RUN-20241129-001",
      "droneNumber": 178,
      "penNumber": 2,
      "status": "completed",
      "completedAt": "2024-11-29T12:00:00Z",
      "concernsFound": 4,
      "calvesScanned": 20
    }
  ]
}
```

**Usage in React:**

```javascript
const fetchPenRuns = async (penNumber) => {
  const response = await fetch(
    `http://localhost:3001/api/calf-health/pens/${penNumber}/runs`
  );
  const data = await response.json();
  return data.data; // Array of runs
};

// Component
function PenRunsList() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    fetchPenRuns(2).then(setRuns);
  }, []);

  return (
    <div>
      {runs.map((run) => (
        <div
          key={run.runId}
          style={{
            backgroundColor: run.status === "completed" ? "#22C55E" : "#9CA3AF",
            padding: "16px",
            margin: "8px",
            borderRadius: "8px",
          }}
        >
          <p>
            Status: Completed @ {new Date(run.completedAt).toLocaleTimeString()}
          </p>
          <p>Drone #: {run.droneNumber}</p>
          <p>Concerns: {run.concernsFound}</p>
          <button>Tap to view</button>
        </div>
      ))}
    </div>
  );
}
```

---

### 3. Get Concerns for Run (Screen 2)

**Get detailed health concerns for a specific drone run**

```http
GET /runs/:runId/concerns
```

**Example:**

```http
GET /runs/RUN-20241129-001/concerns
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "calfId": "CALF-009",
      "calfIdNumber": 9,
      "tagNumber": "TAG-1009",
      "imageUrl": "https://...",
      "concerns": ["Droopy ears noted", "Dirty tail", "Snotty nose"],
      "severityLevel": "critical",
      "severityScore": 85
    }
  ]
}
```

**Usage in React:**

```javascript
function ConcernsList({ runId }) {
  const [concerns, setConcerns] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/calf-health/runs/${runId}/concerns`)
      .then((res) => res.json())
      .then((data) => setConcerns(data.data));
  }, [runId]);

  const getSeverityColor = (level) => {
    switch (level) {
      case "critical":
        return "#DC2626"; // Red
      case "high":
        return "#EA580C"; // Orange
      case "medium":
        return "#F59E0B"; // Yellow
      default:
        return "#10B981"; // Green
    }
  };

  return (
    <div>
      <h2>Pen #2 Selected - Run 1 @ 12pm</h2>
      {concerns.map((concern) => (
        <div
          key={concern.calfId}
          style={{
            border: `3px solid ${getSeverityColor(concern.severityLevel)}`,
            padding: "16px",
            margin: "16px",
            borderRadius: "8px",
          }}
        >
          <img
            src={concern.imageUrl}
            alt={`Calf ${concern.calfIdNumber}`}
            style={{ width: "100%" }}
          />
          <h3>Calf id # {concern.calfIdNumber}</h3>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: getSeverityColor(concern.severityLevel),
              float: "right",
            }}
          />
          <p>
            <strong>Concerns:</strong>
          </p>
          <ul>
            {concern.concerns.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

---

### 4. Get Notifications

**Get unread notifications for the farmer**

```http
GET /notifications
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "notification_id": "NOTIF-001",
      "title": "URGENT: Calf #9",
      "message": "Calf ID #9 in Pen #2 requires immediate attention...",
      "severity": "critical",
      "calf_id": "CALF-009",
      "pen_number": 2,
      "timestamp": "2024-11-29T12:16:00Z"
    }
  ],
  "count": 2
}
```

**Usage:**

```javascript
function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications
    fetch("http://localhost:3001/api/calf-health/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data.data));

    // Poll every 30 seconds for new notifications
    const interval = setInterval(() => {
      fetch("http://localhost:3001/api/calf-health/notifications")
        .then((res) => res.json())
        .then((data) => {
          if (data.count > 0) {
            // Show alert/toast
            alert(`${data.count} new health alerts!`);
          }
          setNotifications(data.data);
        });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {notifications.map((notif) => (
        <div
          key={notif.notification_id}
          style={{
            backgroundColor:
              notif.severity === "critical" ? "#FEE2E2" : "#FEF3C7",
            padding: "16px",
            margin: "8px",
            borderRadius: "8px",
          }}
        >
          <h4>{notif.title}</h4>
          <p>{notif.message}</p>
          <small>{new Date(notif.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
```

---

### 5. Simulate Drone Run

**Trigger a new drone run (for demo)**

```http
POST /simulate-run
Content-Type: application/json

{
  "penNumber": 2
}
```

**Response:**

```json
{
  "success": true,
  "message": "Drone run simulation completed",
  "data": {
    "runId": "RUN-1733248567890",
    "status": "completed",
    "concernsFound": 2,
    "calvesScanned": 5,
    "notificationsSent": 1,
    "detections": [...],
    "notifications": [...]
  }
}
```

**Usage:**

```javascript
async function triggerDroneRun(penNumber) {
  const response = await fetch(
    "http://localhost:3001/api/calf-health/simulate-run",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ penNumber }),
    }
  );

  const data = await response.json();
  console.log("Drone run completed:", data.data);
  return data.data;
}

// Button component
function StartDroneButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await triggerDroneRun(2);
    alert(`Drone run complete! Found ${result.concernsFound} concerns.`);
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Running drone..." : "Start Drone Run"}
    </button>
  );
}
```

---

## 🎨 Color Scheme

Use these exact colors to match the UI mockups:

```javascript
const COLORS = {
  severity: {
    critical: "#DC2626", // Red
    high: "#EA580C", // Orange
    medium: "#F59E0B", // Yellow
    low: "#10B981", // Green
  },
  status: {
    completed: "#22C55E", // Green
    in_progress: "#3B82F6", // Blue
    pending: "#9CA3AF", // Gray
    failed: "#EF4444", // Red
  },
};
```

---

## 📦 Complete Example App

```javascript
import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001/api/calf-health";

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedPen, setSelectedPen] = useState(2);
  const [selectedRun, setSelectedRun] = useState(null);

  return (
    <div className="app">
      <nav>
        <button onClick={() => setActiveView("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveView("pens")}>Pen Runs</button>
        <button onClick={() => setActiveView("notifications")}>
          Notifications
        </button>
      </nav>

      {activeView === "dashboard" && <Dashboard />}
      {activeView === "pens" && <PenRuns penNumber={selectedPen} />}
      {activeView === "notifications" && <Notifications />}
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/dashboard`)
      .then((res) => res.json())
      .then((data) => setStats(data.data.summary));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats">
        <StatCard label="Total Calves" value={stats.total_calves} />
        <StatCard label="Active Concerns" value={stats.active_concerns} />
        <StatCard
          label="Critical"
          value={stats.critical_concerns}
          color="red"
        />
        <StatCard label="Runs Today" value={stats.runs_today} />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: color === "red" ? "#FEE2E2" : "#F3F4F6",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

export default App;
```

---

## 🚀 Getting Started (Frontend Team)

1. **Start the backend:**

```bash
   cd backend
   npm run dev
```

Backend runs on: `http://localhost:3001`

2. **Test endpoints:**
   Use Thunder Client, Postman, or browser:

```
   http://localhost:3001/api/calf-health/dashboard
```

3. **Enable CORS (already done):**
   Backend already has CORS enabled, so frontend can call from any origin.

4. **Start building:**
   Use the code examples above!

---

## 📱 Mobile App (React Native)

For push notifications:

```javascript
// When notification arrives
const notification = {
  title: "URGENT: Calf #9",
  body: "Calf #9 in Pen #2 requires immediate attention",
  data: {
    calfId: 9,
    penNumber: 2,
    severity: "critical",
    concerns: ["Droopy ears", "Snotty nose", "Dirty tail"],
  },
};

// Handle tap
onNotificationTap((notification) => {
  navigation.navigate("ConcernDetail", {
    calfId: notification.data.calfId,
  });
});
```

---

## 🐛 Troubleshooting

**CORS Error?**

- Backend has CORS enabled. If issues persist, check browser console.

**Connection Refused?**

- Make sure backend is running on port 3001
- Check URL: `http://localhost:3001` (not 3000)

**Empty Data?**

- Backend uses mock data, so data is always available
- Try: `GET /export/mock-ui` for all mock data

---

## 📞 Contact Backend Team

- **Developer:** Nachiket
- **Backend Repo:** https://github.com/Nachiket-96/24hr-startup-Cultivator
- **Questions?** Ask in team chat!

---

## ✅ Quick Test Checklist

- [ ] Dashboard loads with stats
- [ ] Pen runs display for Pen #2
- [ ] Click run shows concerns
- [ ] Concerns show calf images
- [ ] Severity colors display correctly
- [ ] Notifications appear
- [ ] Simulate button works

---

**You're ready to build! 🚀**
