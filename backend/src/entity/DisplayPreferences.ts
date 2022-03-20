import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
} from "typeorm";
import * as domain from "@/domain";

@Entity()
export class DisplayPreferences implements domain.DisplayPreferences {
  @PrimaryColumn({ nullable: false})
  email!: string;

  @Column({  type: "text", array: true, default: [] })
  patchTableFields!: string [];
}
