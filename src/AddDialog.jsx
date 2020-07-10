import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import './Recipes.css';

class AddDialog extends Component {
    state = {
        page: 1,
        title: '',
        image: '',
        desc: '',
        ingredients: ['', '', ''],
        steps: ['', '', ''],
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    addIngredient = () => {
        const ingredients = this.state.ingredients;
        ingredients.push('');
        this.setState({ingredients});
    }

    addStep = () => {
        const steps = this.state.steps;
        steps.push('');
        this.setState({steps});
    }

    // delete = (type, index) => {
    //     if(type === 'ingredients'){
    //         const copy = this.state.ingredients;
    //         copy.splice(index, 1);
    //         this.setState({ingredients: copy});
    //     }
    //     if(type === 'steps'){
    //         const copy = this.state.steps;
    //         copy.splice(index, 1);
    //         this.setState({steps: copy});
    //     }
    // }

    handleNext = (next, grab=false) => {
        if(grab){
            const ingredients = document.getElementsByClassName('recipe-field-add-ingredients');
            const resingredients = [];
            for(let i=0; i<ingredients.length; i++){
                const ingredient = ingredients[i].firstChild.firstElementChild.value;
                if(ingredient !== "")
                    resingredients.push(ingredient);
            }
            this.setState({ingredients: resingredients});
        }
        if(next){
            if(this.state.title === ''){
                return;
            }
            this.setState({page: this.state.page + 1});
        } else {
            this.setState({page: this.state.page - 1});
        }
    }

    finish = () => {
        const steps = document.getElementsByClassName('recipe-field-add-steps');
        const resSteps = [];
        for(let i=0; i<steps.length; i++){
            const step = steps[i].firstChild.firstElementChild.value;
            if(step !== "")
                resSteps.push(step);
        }
        const res = {
            title: this.state.title,
            image: this.state.image,
            desc: this.state.desc,
            ingredients: this.state.ingredients,
            steps: resSteps,
        }
        this.props.addRecipe(res);
        this.props.toggle();
        this.setState({page: 1, ingredients: ['', '', ''], steps: ['', '', '']});
    }

    handleClose = () => {
        this.props.toggle();
        setTimeout(() => this.setState({page: 1, ingredients: ['', '', ''], steps: ['', '', '']}), 500);
    }

    render(){
        return(
            <Dialog
                open={this.props.show}
                onClose={this.handleClose}
            >
                {this.state.page === 1 && 
                    <div className='recipe-dialog'>
                        <div className='recipe-dialog-header'>Title</div>
                        <TextField
                            className='recipe-field'
                            variant="outlined"
                            name={'title'}
                            value={this.state.title}
                            onChange={this.handleInputChange}
                        />
                        <div className='recipe-dialog-header'>Image Link</div>
                        <TextField
                            className='recipe-field'
                            variant="outlined"
                            name={'image'}
                            value={this.state.image}
                            onChange={this.handleInputChange}
                        />
                        <div className='recipe-dialog-header'>Description</div>
                        <TextField
                            className='recipe-field'
                            multiline
                            rows={4}
                            variant="outlined"
                            name={'desc'}
                            value={this.state.desc}
                            onChange={this.handleInputChange}
                        />
                        <Button
                            className='recipe-dialog-next'
                            variant="contained"
                            onClick={() => this.handleNext(true)}
                        >
                            NEXT
                        </Button>
                    </div>
                }
                {this.state.page === 2 &&
                    <div className='recipe-dialog'>
                        <div className='recipe-dialog-header'>Ingredients</div>
                        {this.state.ingredients.map((item, i) => {
                            return(
                                <div key={i + '-ingredient'} className='recipe-field-container'>
                                    <TextField
                                        className='recipe-field-add-ingredients'
                                        variant="outlined"
                                    />
                                    {/* <IconButton onClick={() => this.delete('ingredients', i)} className='recipe-dialog-add'>
                                        <DeleteIcon />
                                    </IconButton> */}
                                </div>
                            )
                        })}
                        <div style={{display: 'flex'}}>
                            <IconButton onClick={() => this.addIngredient()} className='recipe-dialog-add'>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <Button
                            className='recipe-dialog-next'
                            variant="contained"
                            onClick={() => this.handleNext(true, true)}
                        >
                            NEXT
                        </Button>
                        {/* <Button
                            style={{float: 'left'}}
                            className='recipe-dialog-next'
                            variant="contained"
                            onClick={() => this.handleNext(false)}
                        >
                            BACK
                        </Button> */}
                    </div>
                }
                {this.state.page === 3 &&
                    <div className='recipe-dialog'>
                        <div className='recipe-dialog-header'>Steps</div>
                        {this.state.steps.map((item, i) => {
                            return(
                                <div key={i + '-steps'} className='recipe-field-container'>
                                    <TextField
                                        className='recipe-field-add-steps'
                                        variant="outlined"
                                    />
                                    {/* <IconButton onClick={() => this.delete('steps', i)} className='recipe-dialog-add'>
                                        <DeleteIcon />
                                    </IconButton> */}
                                </div>
                            )
                        })}
                        <div style={{display: 'flex'}}>
                            <IconButton onClick={() => this.addStep()} className='recipe-dialog-add'>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <Button
                            className='recipe-dialog-next'
                            variant="contained"
                            onClick={() => this.finish()}
                        >
                            FINISH
                        </Button>
                        {/* <Button
                            style={{float: 'left'}}
                            className='recipe-dialog-next'
                            variant="contained"
                            onClick={() => this.handleNext(false)}
                        >
                            BACK
                        </Button> */}
                    </div>
                }
            </Dialog>
        )
    }
}

export default AddDialog;