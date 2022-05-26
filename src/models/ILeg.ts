import { ISegment } from "./ISegment";

export interface ILeg {
  duration: number;
  segments: ISegment[];
}
