import React,{Component} from 'react';
import AddStock from '../AddStock/AddStock';
import Modal from '../Modal/Modal';

class Container extends Component {

    
    render(props){
        return (
            <div>
                <AddStock/>
                <Modal/>
            </div>
        )
    }
}

export default Container;