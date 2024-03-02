import { Cascade, Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { CoverPicture, ProfilePicture } from "./Pictures";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @OneToOne({entity: () => CoverPicture, 
    mappedBy: 'cover_user',
    orphanRemoval: true, 
    eager: true,
    cascade: [Cascade.ALL]})
  cover_picture?: CoverPicture;

  @OneToOne({entity: () => ProfilePicture, 
    mappedBy: 'profile_user',
    orphanRemoval: true, 
    eager: true,
    cascade: [Cascade.ALL]})
  profile_picture?: ProfilePicture;
}
