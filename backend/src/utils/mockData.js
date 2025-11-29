<<<<<<< HEAD
=======
// Mock data for demo/presentation
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
        detected_at: new Date().toISOString(),
=======
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
        detected_at: new Date().toISOString(),
=======
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
        completedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
=======
        completedAt: "2024-11-29T12:00:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
        concernsFound: 4,
        calvesScanned: 20,
      },
      {
        runId: "RUN-20241129-002",
        droneNumber: 178,
        penNumber: 2,
        status: "completed",
<<<<<<< HEAD
        completedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
=======
        completedAt: "2024-11-29T16:00:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
        concernsFound: 0,
        calvesScanned: 20,
      },
      {
        runId: "RUN-20241129-003",
        droneNumber: 178,
        penNumber: 2,
        status: "completed",
<<<<<<< HEAD
        completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
=======
        completedAt: "2024-11-29T20:00:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
        concernsFound: 17,
        calvesScanned: 20,
      },
      {
        runId: "RUN-20241129-004",
        droneNumber: 178,
        penNumber: 2,
        status: "pending",
<<<<<<< HEAD
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
=======
        scheduledAt: "2024-11-30T00:00:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
        imageUrl: "http://localhost:3001/images/calves/1.jpg",
        concerns: ["Droopy ears noted", "Snotty nose"],
        severityLevel: "high",
        severityScore: 75,
        detectedAt: new Date().toISOString(),
=======
        imageUrl:
          "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400",
        concerns: ["Droopy ears noted", "Snotty nose"],
        severityLevel: "high",
        severityScore: 75,
        detectedAt: "2024-11-29T12:15:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
      },
      {
        calfId: "CALF-009",
        calfIdNumber: 9,
        tagNumber: "TAG-1009",
<<<<<<< HEAD
        imageUrl: "http://localhost:3001/images/calves/2.jpg",
        concerns: [
          "Droopy ears noted",
          "Snotty nose",
          "Dirty Tail",
          "Dirty hind legs",
        ],
        severityLevel: "critical",
        severityScore: 85,
        detectedAt: new Date().toISOString(),
=======
        imageUrl:
          "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400",
        concerns: ["Droopy ears noted", "Snotty nose", "Dirty Tail"],
        severityLevel: "critical",
        severityScore: 85,
        detectedAt: "2024-11-29T12:15:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
      },
    ],
    "RUN-20241129-003": [
      {
        calfId: "CALF-005",
        calfIdNumber: 5,
        tagNumber: "TAG-1005",
<<<<<<< HEAD
        imageUrl: "http://localhost:3001/images/calves/3.jpg",
        concerns: ["Eye issues detected", "Reduced movement"],
        severityLevel: "medium",
        severityScore: 55,
        detectedAt: new Date().toISOString(),
      },
      {
        calfId: "CALF-008",
        calfIdNumber: 8,
        tagNumber: "TAG-1008",
        imageUrl: "http://localhost:3001/images/calves/4.jpg",
        concerns: ["Dirty tail (possible scours)", "Reduced movement"],
        severityLevel: "high",
        severityScore: 65,
        detectedAt: new Date().toISOString(),
      },
      {
        calfId: "CALF-011",
        calfIdNumber: 11,
        tagNumber: "TAG-1011",
        imageUrl: "http://localhost:3001/images/calves/5.jpg",
        concerns: ["Droopy ears noted"],
        severityLevel: "medium",
        severityScore: 45,
        detectedAt: new Date().toISOString(),
      },
      {
        calfId: "CALF-014",
        calfIdNumber: 14,
        tagNumber: "TAG-1014",
        imageUrl: "http://localhost:3001/images/calves/6.jpg",
        concerns: ["Snotty nose (respiratory concern)"],
        severityLevel: "medium",
        severityScore: 40,
        detectedAt: new Date().toISOString(),
=======
        imageUrl:
          "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400",
        concerns: ["Eye issues detected", "Reduced movement"],
        severityLevel: "medium",
        severityScore: 55,
        detectedAt: "2024-11-29T20:15:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
      sent_at: new Date().toISOString(),
=======
      sent_at: "2024-11-29T12:16:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
      sent_at: new Date().toISOString(),
    },
    {
      notification_id: "NOTIF-003",
      title: "Health Concern: Calf #8",
      message: "Calf ID #8 in Pen #2 showing signs of scours. Check today.",
      severity: "high",
      calf_id: "CALF-008",
      tag_number: "TAG-1008",
      pen_number: 2,
      is_read: 0,
      sent_at: new Date().toISOString(),
=======
      sent_at: "2024-11-29T12:16:00Z",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
      image_url: "http://localhost:3001/images/calves/2.jpg",
=======
      image_url:
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
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
<<<<<<< HEAD
      image_url: "http://localhost:3001/images/calves/1.jpg",
=======
      image_url:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400",
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
      birth_date: "2024-10-20",
      gender: "Female",
      current_weight: 90.2,
    },
<<<<<<< HEAD
    "CALF-005": {
      calf_id: "CALF-005",
      tag_number: "TAG-1005",
      breed: "Jersey",
      health_score: 72,
      pen_number: 2,
      pen_name: "Pen South",
      image_url: "http://localhost:3001/images/calves/3.jpg",
      birth_date: "2024-10-25",
      gender: "Female",
      current_weight: 75.5,
    },
    "CALF-008": {
      calf_id: "CALF-008",
      tag_number: "TAG-1008",
      breed: "Angus",
      health_score: 68,
      pen_number: 2,
      pen_name: "Pen South",
      image_url: "http://localhost:3001/images/calves/4.jpg",
      birth_date: "2024-10-28",
      gender: "Male",
      current_weight: 88.3,
    },
    "CALF-011": {
      calf_id: "CALF-011",
      tag_number: "TAG-1011",
      breed: "Holstein",
      health_score: 78,
      pen_number: 2,
      pen_name: "Pen South",
      image_url: "http://localhost:3001/images/calves/5.jpg",
      birth_date: "2024-11-01",
      gender: "Female",
      current_weight: 79.8,
    },
    "CALF-014": {
      calf_id: "CALF-014",
      tag_number: "TAG-1014",
      breed: "Brown Swiss",
      health_score: 80,
      pen_number: 2,
      pen_name: "Pen South",
      image_url: "http://localhost:3001/images/calves/6.jpg",
      birth_date: "2024-11-03",
      gender: "Male",
      current_weight: 85.0,
    },
=======
>>>>>>> 1a6bfb76df1f2a17dbbd724c193c7cf70cae9446
  },
};

module.exports = mockData;
