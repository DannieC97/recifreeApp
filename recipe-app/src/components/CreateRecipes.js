import {useEffect} from "react"
import {useState} from "react"
import Navbar from "./Navbar"
import axios from "axios"
import AsyncSelect from "react-select/async";
import ListofIngredients from "./ListofIngredients";
//import {useActionKeyContext, useDispatchContext, useIngredientsDispatchContext} from "./context/RecipeContext";
import {useNavigate} from "react-router-dom";


export default function CreateRecipes() {
    const navigate = useNavigate()
    //search field state
    const [searchField, setSearchField] = useState("")
    //requested list from api state
    const [ingredientsList, setIngredientsList] = useState([])
    //sets string value of the query
    const [query, setQuery] = useState("")
    //sets ID value of the query
    const [ingredientID, setIngredientID] = useState(null)
    //state for amount of ingredient
    const [amount, setAmount] = useState()
    //an array of objects that contains the ingredients the user makes
    const [userIngredientList, setUserIngredientList] = useState([])
    //change state
    const [change, setChange] = useState(false)
    //Show ingredient Submit
    const [showIngButt, setShowIngButt] = useState(false)

    //const [recipeId, setRecipeId] = useState(0)
    //const dispatch = useDispatchContext()
    //const ingredientDispatch = useIngredientsDispatchContext()
    //const ACTION = useActionKeyContext()


    //apikey
    const apiKey = '135105a81ad44fc89fc31589dcff5303'
    //API Keys
    //0ff1d546021945128788f803cac47584
    //dd323d58462c4007843ea152dc7fee30
    //6693ceb5d7454ecca429359308d788ed
    //135105a81ad44fc89fc31589dcff5303
    //084ccfa492e6484e8e1b6294d9c7bbb4
    //fed50daa930847a1a3cf282ef28c9f3b

    //returns to AsyncSelect for the dropdown bar ingredient search
    const loadOptions = async () => {
        return ingredientsList
    }

    //This fetches the api for the name of the ingredient
    useEffect(async () => {
        if (searchField !== "") {
            const data = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${searchField}&number=5`)
            setIngredientsList(data.data)
        }
    }, [searchField]);

    //This fetches the api for the ID of the ingredient
    useEffect(async () => {
        if (query !== "") {
            const data = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${query}`)
            setIngredientID(data.data.results[0].id)
        }
    }, [query])

    //fetches the api for the nutritional information
    useEffect(async () => {
        if (ingredientID !== null) {
            const data = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientID}/information?apiKey=${apiKey}&amount=${amount}`)
            let obj = {
                ingredient: query,
                quantity: amount,
                
            }
            setUserIngredientList(prev => prev.concat(obj))
        }
    }, [change])

    // useEffect(async () => {
    //     await axios.get(`https://capstone-project-ttp.herokuapp.com/recipe/GetRecent`).then(val => setRecipeId(val.data.id))
    //     setRecipeId(recipeId => {
    //         return recipeId
    //     });
    // }, [showIngButt, userIngredientList, change])

    //submit handler for add ingredients button
    function submitHandler(e) {
        e.preventDefault()
        setAmount(e.target[1].value)
        console.log(e.target[1].value)
        console.log(ingredientsList)
        e.target[1].value = ""
        setChange(prev => !prev)
        console.log("Hi");
        console.log(userIngredientList)
    }

    //Submitting a recipe
    function recipeSubmit(e) {
        e.preventDefault();
        const name = e.target[0].value;
        const description = e.target[1].value;
        const level_of_diff = e.target[2].value;
        const time = e.target[3].value;
        const steps = e.target[4].value;
        const img = e.target[5].value;
      
        if (!name || !description || !level_of_diff || !time || !steps || !img) {
          // Show an error message or alert if any of the required fields are missing
          return;
        }
      
        const ingredients = userIngredientList.map((ingredient) => ({
          name: ingredient.ingredient,
          quantity: ingredient.quantity
        }));
      
        const newRecipe = {
          name,
          description,
          difficulty_level: level_of_diff,
          time,
          steps,
          img_link: img,
          ingredients
        };
      
        axios.post('http://localhost:5000/addRecipes', newRecipe)
          .then((res) => {
            console.log(res.data);
            // Show a success message or alert if the recipe was added successfully
            setShowIngButt(true);
          })
          .catch((err) => {
            console.error(err);
            // Show an error message or alert if there was an error adding the recipe
          });
      }

    //completely submitting ingredients
    function addIngredientHandler(e) {
        //console.log(userIngredientList)
        e.preventDefault()
        userIngredientList.map(ingredient => {
            
            
            //ingredientDispatch({type: ACTION.ADD, payload: ingredient})
        });

        setUserIngredientList([])
        setShowIngButt(false)
        navigate('/')
        console.log("list " +userIngredientList);
    }

    //async-select styler
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#ececec",
            borderRadius: "8px",
            borderColor: state.isFocused ? "blue" : "green",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                borderColor: "blue"
            }
        }),
        menu: base => ({
            ...base,
            borderRadius: "8px",
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            padding: 0,
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'blue',
            padding: 20,
            background: '#ffffff'
        }),
    };

    return (
        <div>
            <Navbar/>
            <div className="wrapperForm">
                <form className="myForm" onSubmit={recipeSubmit}>
                    <div className="input_div">
                        <label className="name_txt">Recipe Name: </label>
                        <input className="recipe_name_box" type="text" name="name" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}></input>
                    </div>
                    <div className="input_div">
                        <label className="description_text">Description: </label>
                        <textarea className="description_box" type="text" name="description"></textarea>
                    </div>
                    <div className="input_div">
                        <label>Difficulty Level: </label>
                        <input className="diiffuculty_box" type="text" name="level_of_diff" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}></input>
                    </div>
                    <div className="input_div">
                        <label>Time: </label>
                        <input className="time_box" type="text" name="time" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}></input>
                    </div>
                    <div className="input_div">
                        <label>Steps: </label>
                        <textarea  className="steps_box" type="text" name="steps"></textarea >
                    </div>
                    <div className="input_div">
                        <label>Image Link </label>
                        <input className="image_box" type="text" name="image" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}></input>
                    </div>
                    <div className="input_div">
                        <input className="submitBtn" type="submit" value="Submit"></input>
                    </div>
                </form>
                <form className="ingredients_input" onSubmit={submitHandler}>
                    <div>
                        <label className="ingredients">Ingredients: </label>
                        {/* <input type="text" name="ingredients" onChange={handleSearch}></input> */}
                        <AsyncSelect
                            styles={customStyles}
                            loadOptions={loadOptions}
                            onInputChange={(value) => setSearchField(value)}
                            onChange={(value) => setQuery(value.name)}
                            getOptionLabel={data => data.name}
                        />
                    </div>
                    <div className="quantity_box">
                        <label className="quanLbl">Quantity: </label>
                        <input className="quanInpt" type="number" min={0}/>
                        <button className="add_btn" type="submit" value="Submit">Add</button>
                    </div>
                    <div>

                        <ListofIngredients data={userIngredientList} keyId={ingredientID}/>


                    </div>
                    {showIngButt &&
                        <button className="add_btn" onClick={addIngredientHandler}>ADD INGREDIENT
                            LIST!</button>}
                </form>
            </div>
        </div>
    )
}