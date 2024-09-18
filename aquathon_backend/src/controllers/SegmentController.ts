import { Request, Response } from 'express';
import {
  getAllSegments,
  getParticipantSegment,

} from '../services/segmentService'; // Adjust the import path as needed

class SegmentController {

  // Get all segments
  static async getAllSegments(req: Request, res: Response) {
    const { raceId } = req.params;
    try {
      const segments = await getAllSegments(raceId);
      res.status(200).json({
        segments
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching segments',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  // Get all participant in segments
  static async getParticipantSegment(req: Request, res: Response) {
    const { raceId , segmentId} = req.params;
    try {
      const segments = await getParticipantSegment(raceId,segmentId);
      res.status(200).json(
        segments
      );
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching segments',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }


}

export default SegmentController;
