import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import './Recipes.css';

const default_recipe = [
    {
        title: 'Shrimp Fried Rice',
        image: 'https://www.simplyrecipes.com/wp-content/uploads/2008/08/shrimp-fried-rice-horiz-a-1600.jpg',
        desc: 'Do you ever have leftover rice in the fridge? A great way to use it up is to make fried rice! Fried rice works best with chilled leftover rice actually. Fresh rice can fry up a bit mushy. But leftover rice that had a chance to dry out a bit? Perfect for frying.',
        ingredients: [
            '8 ounces of shrimp',
            '1/2 teaspoon of salt',
            'freshly ground black pepper',
        ],
        steps: [
            'Toss shrimp with salt, pepper, cornstarch',
            'Heat pan on high heat',
            'Sear shrimp on both sides',
        ],
    }
]

class MainDisplay extends Component {
    state = {
        recipes: [],
    }
    
    componentDidMount(){
        const recipes = JSON.parse(localStorage.getItem('recipes')) || default_recipe;
        this.setState({recipes});
    }

    render(){
        return(
            <div>
                {this.state.recipes.map((recipe) => {
                    return(
                        <Paper key={recipe.title} elevation={10} className='recipe-paper'>
                            <div className='recipe-header'>{recipe.title}</div>
                            <img src={recipe.image} alt={recipe.title} className='recipe-img'/>
                            <p>{recipe.desc}</p>
                            <div className='recipe-sub-section'>
                                <div className='recipe-sub-header'>Ingredients</div>
                                <ul>
                                    {recipe.ingredients.map((item) => {
                                        return (
                                            <li key={item}>
                                                {item}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='recipe-sub-section'>
                                <div className='recipe-sub-header'>Steps</div>
                                <ol>
                                    {recipe.steps.map((step) => {
                                        return (
                                            <li key={step}>
                                                {step}
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        </Paper>
                    )
                })}
            </div>
        )
    }
}

export default MainDisplay;