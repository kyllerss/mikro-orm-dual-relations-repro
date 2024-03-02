import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity({abstract: true, discriminatorColumn: 'type'}) 
export abstract class BasePicture {

  @PrimaryKey()
  id!: number;

  @Property({type: 'string', nullable: false})
  path: string;

  constructor(path: string) {
    this.path = path;
  }
}    

@Entity({discriminatorValue: 'cover'})
export class CoverPicture extends BasePicture {

  @OneToOne({entity: () => User, fieldName: 'cover_user_id'})
  cover_user?: User;

  constructor(path: string) {
    super(path);
  }
}

@Entity({discriminatorValue: 'profile'})
export class ProfilePicture extends BasePicture {

  @OneToOne({entity: () => User, fieldName: 'profile_user_id'})
  profile_user?: User;

  constructor(path: string) {
    super(path);
  }
}
