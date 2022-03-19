import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import * as domain from "@/domain";

@Entity()
export class DisplayPreferences implements domain.DisplayPreferences {
  @PrimaryGeneratedColumn("uuid")
  ID!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({  type: "text", array: true, default: [] })
  patchTableFields!: string [];
}
