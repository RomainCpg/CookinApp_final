import Account from "../models/Account";
import Favorite from "../models/Favorite";
import Comment from "../models/Comment";
import Recipe from "../models/Recipe";
import RecipeIngredient from "../models/RecipeIngredient";
import Ingredient from "../models/Ingredient";

const defineAssociations = () => {

    // Relations account
    Account.hasMany(Comment, { foreignKey: 'authorId' });
    Account.hasMany(Favorite, { foreignKey: 'userId' });

    // Relations comments
    Comment.belongsTo(Recipe, { foreignKey: 'recipeId' });
    Comment.belongsTo(Account, { foreignKey: 'authorId' });

    // Relations favorite
    Favorite.belongsTo(Recipe, { foreignKey: 'recipeId' });
    Favorite.belongsTo(Account, { foreignKey: 'userId' });

    // Relations ingredients
    Ingredient.hasMany(RecipeIngredient, {foreignKey: 'ingredientId'})

    // Relations recipe
    Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipeId' });
    Recipe.hasMany(Comment, { foreignKey: 'recipeId' });
    Recipe.hasMany(Favorite, { foreignKey: 'recipeId' });

    // Relations recipeIngredient
    RecipeIngredient.belongsTo(Ingredient, { foreignKey: 'ingredientId' });
    RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipeId' });
}

export default defineAssociations;