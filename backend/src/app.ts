import * as dotenv from 'dotenv'

dotenv.config();

import sequelize from "./config/database";
import recipeRoutes from "./routes/recipeRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import commentRoutes from "./routes/commentRoutes";
import ingredientRoutes from "./routes/ingredientRoutes";
import accountRoutes from "./routes/accountRoutes";
import defineAssociations from "./config/associations";
import recipeIngredientsRoutes from "./routes/recipeIngredientsRoutes";
import Ingredient from "./models/Ingredient";
import Recipe from "./models/Recipe";
import RecipeIngredient from "./models/RecipeIngredient";


const express = require('express');
const app = express();

app.use(express.json());


app.use('/api', recipeRoutes)
app.use('/api', commentRoutes)
app.use('/api', ingredientRoutes)
app.use('/api', accountRoutes)
app.use('/api', favoriteRoutes)
app.use('/api', recipeIngredientsRoutes)



const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

console.log('DB_URL via app.ts:', process.env.DB_URL);


defineAssociations()

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });



// Synchroniser les modèles avec la base de données
sequelize.sync({ force: true }) // Force true si on veut effacer la DB et la recréer
    .then(async () => {
        console.log('Database & tables created!');
        await setDatabase();
    });


async function setDatabase(){
    const ingredientCount = await Ingredient.count();
    const recipeCount = await Recipe.count();

    if(ingredientCount == 0){
        //Ajout d'ingrédient par défaut

        await Ingredient.bulkCreate([
            { name: "Tomate" },
            { name: "Courgette" },
            { name: "Carotte" },
            { name: "Oignon" },
            { name: "Pates" },
            { name: "Riz" },
            { name: "Lardon" },
            { name: "Poulet" },
            { name: "Lait" },
            { name: "Chocolat" },
            { name: "Sucre" },
            { name: "Farine" },
            { name: "Levure" },
            { name: "Oeufs" },
        ]);

    }

    if(recipeCount == 0){
        //Ajout de 2 recettes par défaut
        await Recipe.bulkCreate([
            {
                name: 'Pâtes Carbonara',
                description: 'Des pâtes délicieuses avec une sauce crémeuse à base de jaunes d\'œufs. Pour les végétariens, il est possible' +
                    'de remplacer les lardons par ce qui vous donne envie !',
                timeToPrepareInMinute: 20,
                averageRating: 4.5
            },
            {
                name: 'Gâteau au Chocolat',
                description: 'Un gâteau moelleux et riche en chocolat, parfait pour les amateurs de chocolat. A cuire à 180° pendant 20 min top chrono !',
                timeToPrepareInMinute: 45,
                averageRating: null
            }
        ]);

        // Ajout des ingrédients aux recettes
        const pastaCarbonara = await Recipe.findOne({ where: { name: 'Pâtes Carbonara' } });
        const chocolateCake = await Recipe.findOne({ where: { name: 'Gâteau au Chocolat' } });

        const ingredients = await Ingredient.findAll();

        if (pastaCarbonara && chocolateCake) {
            await RecipeIngredient.bulkCreate([
                // Ingrédients pour les Pâtes Carbonara
                { recipeId: pastaCarbonara.id, ingredientId: ingredients.find(i => i.name === "Pates")!.id, quantity: 200 },
                { recipeId: pastaCarbonara.id, ingredientId: ingredients.find(i => i.name === "Lardon")!.id, quantity: 100 },
                { recipeId: pastaCarbonara.id, ingredientId: ingredients.find(i => i.name === "Oeufs")!.id, quantity: 3 },

                // Ingrédients pour le Gâteau au Chocolat
                { recipeId: chocolateCake.id, ingredientId: ingredients.find(i => i.name === "Chocolat")!.id, quantity: 200 },
                { recipeId: chocolateCake.id, ingredientId: ingredients.find(i => i.name === "Farine")!.id, quantity: 150 },
                { recipeId: chocolateCake.id, ingredientId: ingredients.find(i => i.name === "Sucre")!.id, quantity: 100 },
                { recipeId: chocolateCake.id, ingredientId: ingredients.find(i => i.name === "Oeufs")!.id, quantity: 4 },
                { recipeId: chocolateCake.id, ingredientId: ingredients.find(i => i.name === "Lait")!.id, quantity: 50 },
            ]);
        }




    }

}