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
            const data = await axios.get("/getRecipes")
            

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
          await axios.delete(`/deleteRecipes/${recipeId}`);
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
        //console.log(recipes);
        return (
          <div>
            <ul className="recipeContainer">
              {recipes.map((item) => {
                return (
                  <div className="recipe_box" key={item.id}>
                    <div className="panel" key={item.id + 1}>
                      <div className="topPanel" key={item.id + 2}>
                        <img
                          className="panelImg"
                          src={item.img_link
                          }
                          onClick={() => {
                            navigate(`/recipepage/${item._id}`);
                          }}
                          key={item.id + 3}
                        />
                        <div className="bottomPanel" key={item.id + 4}>
                          <h3 className="recipeName" key={item.id + 5}>
                            {item.name}
                          </h3>
                          <div>
                            <div className="description" key={item.id + 6}>
                              <h5 className="desText" key={item.id + 7}>
                                {item.description}
                              </h5>
                            </div>
                            <div className="timeFlex" key={item.id + 8}>
                              <img
                                className="timer"
                                src={timer}
                                key={item.id + 9}
                              />
                              <div className="timeText" key={item.id + 10}>
                                <p>{item.time}</p>
                              </div>
                              <button
                                key={item.id + 11}
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