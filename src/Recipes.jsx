import React, {Component} from 'react';
import MainDisplay from './MainDisplay';
import LeftDrawer from './LeftDrawer';

class Recipes extends Component {
    render(){
        return(
            <div>
                <LeftDrawer/>
                <MainDisplay/>
            </div>
        )
    }
}

export default Recipes;