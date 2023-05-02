import React, { useEffect, useState} from "react";
import Navbar from "./Navbar"
import SlideShow from "./SlideShow"
import RecipeCards from "./RecipeCards"

import axios from "axios";
export default function Home() {
    console.log("Home component rendered");
    console.log("yo testyyy");

    // useEffect(() => {
    //     async function fetchData() {
    //       try {
    //         const response = await axios.get("http://localhost:3000/getRecipes");
    //         console.log(response.data);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     }
    //     fetchData();
    //   }, []);
    return (
        
        <div className="container">
            <Navbar />
            <div className="home_page">
                <SlideShow className="home_background" />
                {/* <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    className="home_background"
                /> */}
                {/* <div className="home_img_text">
                    <h1>test</h1>
                </div> */}
                <div className="recent_recipes">
                    <h1>Recent Recipes</h1>
                    <RecipeCards isRecent={true}/>
                </div>
            </div>
        </div>
    )
}