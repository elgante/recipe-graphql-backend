import { IResolvers } from "@graphql-tools/utils";
import { RecipeModel } from "./Recipe.js";
import {
  CreateRecipeArgs,
  EditRecipeArgs,
  DeleteRecipeArgs,
  GetRecipeArgs,
  GetRecipesArgs,
  RecipeType,
} from "./types";

export const resolvers: IResolvers = {
  Query: {
    async recipe(_: {}, args: GetRecipeArgs): Promise<RecipeType | null> {
      const recipe = await RecipeModel.findById(args.id);
      if (!recipe) return null;
      return {
        ...recipe.toObject(),
        id: recipe._id.toString(),
      };
    },
    async getRecipes(_: {}, args: GetRecipesArgs): Promise<RecipeType[]> {
      const recipes = await RecipeModel.find()
        .sort({ createdAt: -1 })
        .limit(args.amount);

      return recipes.map((recipe) => ({
        ...recipe.toObject(),
        id: recipe._id.toString(),
      }));
    },
  },

  Mutation: {
    async createRecipe(_: {}, args: CreateRecipeArgs): Promise<RecipeType> {
      const newRecipe = new RecipeModel({
        name: args.recipeInput.name,
        description: args.recipeInput.description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });

      const saved = await newRecipe.save();
      return {
        ...saved.toObject(),
        id: saved._id.toString(),
      };
    },

    async deleteRecipe(_: {}, args: DeleteRecipeArgs): Promise<boolean> {
      const result = await RecipeModel.deleteOne({ _id: args.id });
      return result.deletedCount > 0;
    },

    async editRecipe(_: {}, args: EditRecipeArgs): Promise<boolean> {
      const result = await RecipeModel.updateOne(
        { _id: args.id },
        {
          name: args.recipeInput.name,
          description: args.recipeInput.description,
        }
      );
      return result.modifiedCount > 0;
    },
  },
};
