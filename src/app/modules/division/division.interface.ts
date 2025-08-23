import { StringExpressionOperatorReturningArray } from "mongoose";

export interface IDivision {
  name: string;
  slug: string;
  thumbnail?: string;
  description?: StringExpressionOperatorReturningArray;
}
