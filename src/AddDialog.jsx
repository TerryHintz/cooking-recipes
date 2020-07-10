import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Recipes.css';

class AddDialog extends Component {
    state = {
        page: 1,
        title: '',
        image: '',
        desc: '',
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render(){
        return(
            <Dialog
                open={this.props.show}
                onClose={this.props.toggle}
            >
                {this.state.page == 1 && 
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
                        >
                            NEXT
                        </Button>
                    </div>
                }
                {this.state.page == 2 &&
                    <div className='recipe-dialog'>
                        
                    </div>
                }
                
            </Dialog>
        )
    }
}

export default AddDialog;