import mongoose, { Schema, Document } from 'mongoose';

export interface IStation extends Document {
  id: number;
  name: string;
  line_id: number;
  pref_cd: number;
  lon: number;
  lat: number;
  weight: number;
  e_sort: number;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const StationSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  line_id: { type: Number, required: true },
  pref_cd: { type: Number, required: true },
  lon: { type: Number, required: true },
  lat: { type: Number, required: true },
  weight: { type: Number, required: true },
  e_sort: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

StationSchema.index({ location: '2dsphere' });

const Station = mongoose.model<IStation>('Station', StationSchema);

export default Station;
