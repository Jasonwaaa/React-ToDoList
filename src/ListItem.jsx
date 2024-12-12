import { AiFillDelete } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import PropTypes from 'prop-types';
import './ListItem.css';
const ListItem = ({ item,onComplete,onDelete }) => {
    const statuClass = {
        0: 'todo',
        1: 'done',
        2: 'deleted',
    };
    if (!item) {
        return null;
    }
    const {id,title,status} = item;
    
    return (
        <div className="listItem">
            <div key={id} className={'item '+statuClass[status]}>
                <span className='item-content'>
                    <span>{title}</span>
                </span>
                <span className='operators'>
                    <button className="icon-inline" onClick={()=>onComplete(id)}><AiFillCheckCircle /></button>
                    <button className="icon-inline" onClick={()=>onDelete(id)}><AiFillDelete /></button>
                </span>
            </div>
    </div>
    );
    }
    
ListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};


export default ListItem;