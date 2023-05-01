import axios from "axios";
import React, { useEffect, useState} from "react";
import logoLoad from '../images/loading.gif'
//import {Link} from "react-router-dom";
import timer from '../images/timer2.png'
//import {useActionKeyContext, useDispatchContext, useIngredientsDispatchContext} from "./context/RecipeContext";
import {useNavigate} from "react-router-dom"

export default function RecipeCards(props) {
    let navigate = useNavigate();

    const [recipes, setRecipes] = useState([])
    //const dispatch = useDispatchContext()
    //const ingredientDispatch = useIngredientsDispatchContext()
    //const ACTION = useActionKeyContext()

    useEffect(() => {
        const getRecipes = async () => {
            const data = await axios.get("http://localhost:5000/getRecipes")
            

            if(props.isRecent){
                if(data.data.length >= 4){
                    const limit = data.data.slice(data.data.length-4).reverse();
                    setRecipes(limit)
                } else {
                    setRecipes(data.data)
                }  
            } else {
                setRecipes(data.data)
            }


        }
        getRecipes()
    }, []);

    const handleDeleteRecipe = async (recipeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    
        if (!confirmed) {
          return;
        }
    
        try {
          await axios.delete(`http://localhost:5000/deleteRecipes/${recipeId}`);
          window.location.reload(false);
        } catch (err) {
          console.error(err);
        }
      };

    if (recipes.length < 1) {
        return (
            <div>
                <img className="loader" src={logoLoad} alt="loading" style={{width: "500px"}}/>
            </div>
        )
    } else {
      console.log("Recipes Loaded!");
      return (
        <div>
          <ul className="recipeContainer">
            {recipes.map((item) => {
              return (
                <div className="recipe_box" key={item._id}>
                  <div className="panel">
                    <div className="topPanel">
                      <img
                        className="panelImg"
                        src={item.img_link}
                        onClick={() => {
                          navigate(`/recipepage/${item._id}`);
                        }}
                      />
                      <div className="bottomPanel">
                        <h3 className="recipeName">{item.name}</h3>
                        <div>
                          <div className="description">
                            <h5 className="desText">{item.description}</h5>
                          </div>
                          <div className="timeFlex">
                            <img className="timer" src={timer} />
                            <div className="timeText">
                              <p>{item.time}</p>
                            </div>
                            <button
                              className="delete"
                              onClick={() => {
                                handleDeleteRecipe(item._id);
                                window.location.reload(false);
                              }}
                            >
                              <strong>X</strong>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      );
    }
}