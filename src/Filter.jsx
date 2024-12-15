import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export default function Filter({items, status,render}) {
    const [filter,setFilter]=useState('todo');
    const handleFilterChange=(e)=>{
        setFilter(e.target.value);
    }
    const filterOptions=['all',...Object.keys(status)];
    const filteredItems = items.filter((item) =>
        filter === 'all' || item.status === status[filter]
    );
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const [removed] = filteredItems.splice(result.source.index, 1);
        filteredItems.splice(result.destination.index, 0, removed);
    
        // 调用父组件传入的函数，更新 items
        filteredItems.map(item=>render(item))
      };
    return (
        <>
            <div className="category">
                <span>Filter:</span>
                {filterOptions.map((option)=>(<button className="categoryButton" key={option} value={option} onClick={handleFilterChange}>{option}</button>))}
            </div>
            <div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredItems.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {render(item)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
        
    );
}