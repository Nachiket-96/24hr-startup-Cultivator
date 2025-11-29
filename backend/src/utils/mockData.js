// Mock data for demo/presentation
const mockData = {
  dashboard: {
    summary: {
      total_calves: 25,
      active_concerns: 6,
      critical_concerns: 2,
      runs_today: 4,
      unread_notifications: 3,
    },
    recentConcerns: [
      {
        concern_id: "CONCERN-001",
        calf_id: "CALF-009",
        tag_number: "TAG-1009",
        pen_number: 2,
        pen_name: "Pen South",
        severity_level: "critical",
        severity_score: 85,
        ai_notes:
          "Droopy ears noted, Snotty nose, Dirty tail, Dirty hind legs observed",
      },
      {
        concern_id: "CONCERN-002",
        calf_id: "CALF-012",
        tag_number: "TAG-2012",
        pen_number: 2,
        pen_name: "Pen South",
        severity_level: "high",
        severity_score: 75,
        ai_notes: "Droopy ears noted, Snotty nose detected",
      },
    ],
  },

  penRuns: {
    2: [
      {
        runId: "RUN-20241129-001",
        droneNumber: 178,
        penNumber: 2,
        status: "completed",
        completedAt: "2024-11-29T12:00:00Z",
        concernsFound: 4,
        calvesScanned: 20,
      },
      {
        runId: "RUN-20241129-002",
        droneNumber: 178,
        penNumber: 2,
        status: "completed",
        completedAt: "2024-11-29T16:00:00Z",
        concernsFound: 0,
        calvesScanned: 20,
      },
      {
        runId: "RUN-20241129-003",
        droneNumber: 178,
        penNumber: 2,
        status: "completed",
        completedAt: "2024-11-29T20:00:00Z",
        concernsFound: 17,
        calvesScanned: 20,
      },
      {
        runId: "RUN-20241129-004",
        droneNumber: 178,
        penNumber: 2,
        status: "pending",
        scheduledAt: "2024-11-30T00:00:00Z",
        concernsFound: 0,
        calvesScanned: 0,
      },
    ],
  },

  runConcerns: {
    "RUN-20241129-001": [
      {
        calfId: "CALF-012",
        calfIdNumber: 12,
        tagNumber: "TAG-2012",
        imageUrl:
          "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400",
        concerns: ["Droopy ears noted", "Snotty nose"],
        severityLevel: "high",
        severityScore: 75,
        detectedAt: "2024-11-29T12:15:00Z",
      },
      {
        calfId: "CALF-009",
        calfIdNumber: 9,
        tagNumber: "TAG-1009",
        imageUrl:
          "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400",
        concerns: ["Droopy ears noted", "Snotty nose", "Dirty Tail"],
        severityLevel: "critical",
        severityScore: 85,
        detectedAt: "2024-11-29T12:15:00Z",
      },
    ],
    "RUN-20241129-003": [
      {
        calfId: "CALF-005",
        calfIdNumber: 5,
        tagNumber: "TAG-1005",
        imageUrl:
          "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400",
        concerns: ["Eye issues detected", "Reduced movement"],
        severityLevel: "medium",
        severityScore: 55,
        detectedAt: "2024-11-29T20:15:00Z",
      },
    ],
  },

  notifications: [
    {
      notification_id: "NOTIF-001",
      title: "Critical: Calf #9",
      message:
        "Calf ID #9 in Pen #2 requires urgent attention: droopy ears, dirty tail, dirty hind legs, snotty nose.",
      severity: "critical",
      calf_id: "CALF-009",
      tag_number: "TAG-1009",
      pen_number: 2,
      is_read: 0,
      sent_at: "2024-11-29T12:16:00Z",
    },
    {
      notification_id: "NOTIF-002",
      title: "Health Concern: Calf #12",
      message:
        "Calf ID #12 in Pen #2 showing signs of illness: droopy ears, snotty nose. Check soon.",
      severity: "high",
      calf_id: "CALF-012",
      tag_number: "TAG-2012",
      pen_number: 2,
      is_read: 0,
      sent_at: "2024-11-29T12:16:00Z",
    },
  ],

  calves: {
    "CALF-009": {
      calf_id: "CALF-009",
      tag_number: "TAG-1009",
      breed: "Holstein",
      health_score: 65,
      pen_number: 2,
      pen_name: "Pen South",
      image_url:
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400",
      birth_date: "2024-10-22",
      gender: "Male",
      current_weight: 82.1,
    },
    "CALF-012": {
      calf_id: "CALF-012",
      tag_number: "TAG-2012",
      breed: "Hereford",
      health_score: 55,
      pen_number: 2,
      pen_name: "Pen South",
      image_url:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400",
      birth_date: "2024-10-20",
      gender: "Female",
      current_weight: 90.2,
    },
  },
};

module.exports = mockData;
