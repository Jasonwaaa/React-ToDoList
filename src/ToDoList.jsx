import { useState } from "react";
import ListItem from "./ListItem";
import Filter from "./Filter";
const ToDoList = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const statusMap={
        'todo':0,
        'done':1,
        'deleted':2
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // 箭头函数, 如果函数体只有一行, 可以省略大括号和return关键字,如果使用大括号,则需要return关键字
    // const onComplete = (id) => {setItems(items.map((item) => {item.id === id && {...item, status:statusMap.done}}));};
    // const onDelete = (id) => {setItems(items.map((item) => {item.id === id && {...item, status:statusMap.deleted}}));};
    const onComplete = (id) => {setItems(items.map((item) => item.id === id ? {...item, status:statusMap.done}:item));};
    const onDelete = (id) => {setItems(items.map((item) => item.id === id ?{...item, status:statusMap.deleted}:item));};
    const renderItem = (item) => (
        <ListItem
            key={item.id}
            item={item}
            onComplete={onComplete}
            onDelete={onDelete}
        />
    );
    return (
        <>
            <header>
                <h2>ToDoList</h2>
            </header>
            <div>
                <input type="text" 
                className="toDoInput"
                value={inputValue}
                onChange={handleInputChange}
                />
                <button onClick={()=>{
                    // const input = document.querySelector('.toDoInput');
                    // setItems([...items, {title: input.value, status:0,id:items.length}]);
                    if (inputValue === "") {
                        return;
                    }
                    setItems([...items, {title: inputValue, status:statusMap.todo,id:items.length}]);
                    setInputValue("");
                }}>add</button>
            </div>
            {/* {items.map((item, index) => (<ListItem key={index} item={item} onComplete={onComplete} onDelete={onDelete} />))} */}
            <Filter items={items} render={renderItem} status={statusMap}/>
        </>
    );
}

export default ToDoList;