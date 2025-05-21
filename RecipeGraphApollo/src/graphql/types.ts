export interface RecipeType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  thumbsUp: number;
  thumbsDown: number;
}

//Input arguments
export interface RecipeInput {
  name: string;
  description: string;
}

export interface CreateRecipeArgs {
  recipeInput: RecipeInput;
}

export interface EditRecipeArgs {
  id: string;
  recipeInput: RecipeInput;
}

export interface DeleteRecipeArgs {
  id: string;
}

export interface GetRecipeArgs {
  id: string;
}

export interface GetRecipesArgs {
  amount: number;
}
