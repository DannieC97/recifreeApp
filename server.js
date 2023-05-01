const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());


mongoose.connect(
    'mongodb+srv://danielchabi97:OvcxlbSIFtIFTOEc@cluster0.scrqm1m.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => console.log('MongoDB connection successful.'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'recipe-app/build')));

// Catch all routes and redirect to the index file
// app.get(/^(?!\/api\/).*/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'recipe-app/build', 'index.html'));
//   });


// Define the ingredient schema
const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true }
  });

// Define the recipe schema
  const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty_level: { type: String, required: true },
    time: { type: String, required: true },
    steps: { type: String, required: true },
    img_link: { type: String, required: true },
    ingredients: [ingredientSchema]
  });

// Create the recipe and ingredient models
const Ingredient = mongoose.model('Ingredient', ingredientSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

//add a recipe
app.post('/addRecipes', (req, res) => {
    const Recipe = mongoose.model('Recipe');
    console.log('recipe recievd post request')
    if (!req.body || !req.body.name) {
        res.status(400).send('Invalid request');
        return;
      }
      
  
    const recipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      difficulty_level: req.body.difficulty_level,
      time: req.body.time,
      steps: req.body.steps,
      img_link: req.body.img_link,
      ingredients: req.body.ingredients
    });
  
    recipe.save()
    .then(savedRecipe => {
      //console.log('Recipe saved successfully:', savedRecipe);
      res.status(201).send('Recipe saved successfully');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to save recipe');
    });
});
//get recipe by id
app.get('/recipes/:id', (req, res) => {
  const Recipe = mongoose.model('Recipe');
  const id = req.params.id;

  Recipe.findById(id).exec()
    .then(recipe => {
      if (!recipe) {
        res.status(404).send('Recipe not found');
        return;
      }
      
      res.status(200).json(recipe);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to get recipe');
    });
});

//delete a recipe
app.delete('/deleteRecipes/:id', (req, res) => {
    const Recipe = mongoose.model('Recipe');
    
    Recipe.findByIdAndDelete(req.params.id)
      .then(deletedRecipe => {
        if (!deletedRecipe) {
          res.status(404).send('Recipe not found');
        } else {
          console.log('Recipe deleted successfully:', deletedRecipe);
          res.status(200).send('Recipe deleted successfully');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Failed to delete recipe');
      });
  });
//get recipes
app.get('/getRecipes', async (req, res) => {
    console.log('Received GET request for /getRecipes');
  const Recipe = mongoose.model('Recipe');
  
  try {
    const recipes = await Recipe.find();
    //console.log('Recipes found:', recipes);
    const responseData = JSON.stringify(recipes);
    //console.log('Response data:', responseData);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch recipes');
  }
  });

  
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});