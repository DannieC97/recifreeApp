// import React, {useContext, useEffect, useReducer} from "react";
// import axios from "axios";

// const ActionKeyContext = React.createContext()
// const DispatchContext = React.createContext()
// const RecipesContext = React.createContext()
// const IngredientsDispatchContext = React.createContext()
// const IngredientsContext = React.createContext()

// export function useActionKeyContext() {
//     return useContext(ActionKeyContext)
// }

// export function useDispatchContext() {
//     return useContext(DispatchContext)
// }

// export function useRecipesContext() {
//     return useContext(RecipesContext)
// }

// export function useIngredientsDispatchContext() {
//     return useContext(IngredientsDispatchContext)
// }

// export function useIngredientsContext() {
//     return useContext(IngredientsContext)
// }


// const ACTIONS = {
//     INITIALIZE: 'init',
//     ADD: 'add',
//     REMOVE: 'remove',
//     UPDATE_INFO: 'update'
// }

// let change = false;

// //Recipe Reducer
// function reducer(recipe, action) {
//     switch (action.type) {
//         case ACTIONS.INITIALIZE:
//             return action.payload
//         case ACTIONS.ADD: {
//             addRecipe(action.payload)
//             change = true;
//         }
//         case ACTIONS.REMOVE:
//             return removeRecipe(action.payload)
//         case ACTIONS.UPDATE_INFO:
//             return
//     }
// }


// //Ingredients Reducer
// function ingredientsReducer(ingredients, action) {
//     switch (action.type) {
//         case ACTIONS.INITIALIZE:
//             return action.payload
//         case ACTIONS.ADD: {
//             addIngredients(action.payload)
//             change = true;
//         }
//         case ACTIONS.REMOVE:
//             return
//         case ACTIONS.UPDATE_INFO:
//             return
//     }
// }


// async function addRecipe(recipe) {
//     try {
//         await axios.post('https://capstone-project-ttp.herokuapp.com/recipe/addRecipe', recipe);
//     } catch (e) {
//         alert("Error adding recipe")
//     }
// }

// async function removeRecipe(id) {
//     try {
//         await fetch('https://capstone-project-ttp.herokuapp.com/recipe/remove/' + id, { method: 'DELETE' });

//     } catch (e) {
//         console.log("Error Removing recipe...")
//     }
// }

// //Add an ingredient
// async function addIngredients(ingredient) {
//     console.log(ingredient)
//     try {
//         await axios.post('https://capstone-project-ttp.herokuapp.com/recipe_items/addIngredients', ingredient)
//     } catch (e) {
//         alert("Error adding ingredient")
//     }
// }

// function RecipeAPIProvider({children}) {
//     const [recipes, dispatch] = useReducer(reducer, {})
//     const [ingredients, ingredientsDispatch] = useReducer(ingredientsReducer, {})

//     let response
//     useEffect(async () => {
//         response = recipes;
//     }, [recipes])

//     useEffect(async () => {

//         try {
//             await axios.get('/getRecipes').then(val => {
//                 response = val.data
//                 change = false
//                 dispatch({type: ACTIONS.INITIALIZE, payload: response})
//             })
//         } catch (e) {
//             console.log("Error retrieving recipes")
//         }
//     }, [change])

//     return (
//         <ActionKeyContext.Provider value={ACTIONS}>
//             <RecipesContext.Provider value={recipes}>
//                 <DispatchContext.Provider value={dispatch}>
//                     <IngredientsContext.Provider value={ingredients}>
//                         <IngredientsDispatchContext.Provider value={ingredientsDispatch}>
//                             {children}
//                         </IngredientsDispatchContext.Provider>
//                     </IngredientsContext.Provider>
//                 </DispatchContext.Provider>
//             </RecipesContext.Provider>
//         </ActionKeyContext.Provider>
//     )

// }

// export default RecipeAPIProvider;