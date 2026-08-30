import { Schema, model } from 'mongoose';

const analyticsSchema = new Schema(
  {
    visits: { type: Number, default: 0 },
    resumeDownloads: { type: Number, default: 0 },
    // We can just keep a single document for overall stats
  },
  { timestamps: true },
);

const Analytics = model('Analytics', analyticsSchema);

export default Analytics;
