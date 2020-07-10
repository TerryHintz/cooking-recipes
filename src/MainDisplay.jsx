import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './Recipes.css';
import AddDialog from './AddDialog';

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
    },
]

class MainDisplay extends Component {
    state = {
        recipes: [],
        dialog: false,
    }
    
    componentDidMount(){
        const recipes = JSON.parse(localStorage.getItem('recipes')) || default_recipe;
        this.setState({recipes});
    }

    jump = (id) => {
        document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    }

    toggleAdd = () => {
        this.setState({dialog: !this.state.dialog});
    }

    addRecipe = (recipe) => {
        const copy = this.state.recipes;
        copy.push(recipe);
        this.setState({recipes: copy});
        const newRecipes = JSON.stringify(copy);
        localStorage.setItem('recipes', newRecipes);
    }

    delete = (i) => {
        const copy = this.state.recipes;
        copy.splice(i, 1);
        this.setState({recipes: copy});
        const newRecipes = JSON.stringify(copy);
        localStorage.setItem('recipes', newRecipes);
    }

    render(){
        return(
            <div className='recipe-root'>
                <div className='recipe-drawer'>
                    <div className='recipe-drawer-header'>Recipes</div>
                    <div>
                        <IconButton onClick={() => this.toggleAdd()} className='recipe-icon-btn'>
                            <AddIcon />
                            <span style={{fontWeight: '600' ,fontSize: '20px', fontFamily: 'montserrat', marginLeft: '5px'}}>New Recipe</span>
                        </IconButton>
                        {/* <IconButton style={{marginLeft: '25px'}} className='recipe-icon-btn'>
                            <EditIcon />
                        </IconButton> */}
                    </div>
                    <div style={{marginTop: '20px', textAlign: 'left'}}>
                        {this.state.recipes.map((recipe, i) => {
                            return(
                                <div
                                    key={recipe.title + '-drawer ' + i}
                                    className='recipe-drawer-item'
                                    onClick={() => this.jump(recipe.title)}
                                >
                                    {recipe.title}
                                    <IconButton onClick={() => this.delete(i)} className='recipe-delete'>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='recipe-container'>
                    {this.state.recipes.map((recipe, i) => {
                        return(
                            <Paper id={recipe.title} key={recipe.title + i} elevation={10} className='recipe-paper'>
                                <div className='recipe-header'>{recipe.title}</div>
                                {recipe.image &&
                                    <img src={recipe.image} alt={recipe.title} className='recipe-img'/>
                                }
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
                <AddDialog
                    addRecipe = {this.addRecipe}
                    show = {this.state.dialog}
                    toggle = {this.toggleAdd}
                />
            </div>
        )
    }
}

export default MainDisplay;