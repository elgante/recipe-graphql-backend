import { Schema, model, Document } from "mongoose";

//  TypeScript interface
export interface Recipe extends Document {
  name: string;
  description: string;
  createdAt: string;
  thumbsUp: number;
  thumbsDown: number;
}

//  Mongoose schema
const recipeSchema = new Schema<Recipe>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: String, required: true },
  thumbsUp: { type: Number, default: 0 },
  thumbsDown: { type: Number, default: 0 },
});

// Export the model
export const RecipeModel = model<Recipe>("Recipe", recipeSchema);
