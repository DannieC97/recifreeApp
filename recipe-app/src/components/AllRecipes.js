//import { useEffect } from "react"
import Navbar from "./Navbar"
import RecipeCards from "./RecipeCards"
//import axios from "axios";
export default function AllRecipes(){






    return(
        <div>
            <Navbar />
            <RecipeCards isRecent={false}/>
        </div>
    )
}