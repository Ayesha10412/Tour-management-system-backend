import { model, Schema } from "mongoose";
import { IAuthProviders, IsActive, IUser, ROLE } from "./user.interface";
const authProviderSchema = new Schema<IAuthProviders>(
  {
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    phone: {
      type: String,
    },
    picture: {
      type: String,
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const User = model<IUser>("User", userSchema);
