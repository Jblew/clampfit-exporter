import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import * as domain from "@/domain";

@Entity()
export class PatchSample implements domain.PatchSample {
  @PrimaryGeneratedColumn("uuid")
  ID!: string;

  @CreateDateColumn()
  date!: Date;

  @Column()
  category!: number;

  @Column()
  traceNumber!: number;

  @Column()
  searchNumber!: number;

  @Column()
  amplitudeMeanPa!: string;

  @Column()
  amplitudeSDPa!: string;

  @Column()
  amplitudeSampleCount!: string;

  @Column()
  halfWidthMeanMs!: string;

  @Column()
  halfWidthSDMs!: string;

  @Column()
  halfWidthCount!: string;

  @Column()
  instantanoeusFrequencyMeanHz!: string;

  @Column()
  instantanoeusFrequencySDHz!: string;

  @Column()
  instantanoeusFrequencyCount!: string;

  @Column()
  intereventIntervalMeanMs!: string;

  @Column()
  intereventIntervalSDMs!: string;

  @Column()
  intereventIntervalCount!: string;

  @Column()
  pOpenForSpecifiedLevel!: string;

  @Column()
  npOpenForAllLevels!: string;
}
