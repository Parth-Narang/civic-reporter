import { supabase } from '../supabaseClient';

export default async function handler(req, res) {
  if (req.headers['x-api-key'] !== process.env.SEED_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const sampleIssues = [
      {
        title: "Large pothole on Main Street",
        description: "There is a large pothole near the intersection of Main Street and Oak Avenue that is causing damage to vehicles.",
        category: "Pothole",
        priority: "High",
        location: "Main Street & Oak Avenue",
        photo: null,
        status: "In Progress",
        dateSubmitted: "2025-08-28",
        dateUpdated: "2025-08-30",
        userId: "user1",
      },
      {
        title: "Broken street light on Park Road",
        description: "The street light pole #47 on Park Road has been out for over a week, creating safety concerns.",
        category: "Street Light",
        priority: "Medium",
        location: "Park Road, Pole #47",
        photo: null,
        status: "Submitted",
        dateSubmitted: "2025-08-25",
        dateUpdated: "2025-08-25",
        userId: "user2",
      },
      {
        title: "Water supply disruption in Sector 15",
        description: "No water supply for the past 3 days in Sector 15, Block A. Residents are facing severe inconvenience.",
        category: "Water Supply",
        priority: "Emergency",
        location: "Sector 15, Block A",
        photo: null,
        status: "Submitted",
        dateSubmitted: "2025-08-20",
        dateUpdated: "2025-08-22",
        userId: "user3",
      },
      {
        title: "Garbage accumulation near bus stop",
        description: "Large amount of garbage has been accumulating near the central bus stop for several days.",
        category: "Garbage",
        priority: "Medium",
        location: "Central Bus Stop, City Center",
        photo: null,
        status: "Submitted",
        dateSubmitted: "2025-08-29",
        dateUpdated: "2025-08-29",
        userId: "user1",
      },
      {
        title: "Traffic signal malfunction at 5th Avenue",
        description: "Traffic signal at the intersection of 5th Avenue and Main Street is not functioning properly causing traffic jams.",
        category: "Traffic Signal",
        priority: "High",
        location: "5th Avenue & Main Street",
        photo: null,
        status: "Submitted",
        dateSubmitted: "2025-08-31",
        dateUpdated: "2025-08-31",
        userId: "user4",
      },
      {
        title: "Water leakage near Elm Park",
        description: "There is a major water leakage near Elm Park fountain. The water waste is significant.",
        category: "Water Supply",
        priority: "Medium",
        location: "Elm Park Fountain Area",
        photo: null,
        status: "In Progress",
        dateSubmitted: "2025-08-30",
        dateUpdated: "2025-09-01",
        userId: "user2",
      },
    ];

    for (const issue of sampleIssues) {
      const { error } = await supabase.from('issues').insert([issue]);
      if (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    return res.status(200).json({ message: 'Sample data seeded successfully' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
