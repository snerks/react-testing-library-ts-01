import * as React from "react";
import { useState } from "react";

interface Props { };

const TodoForm: React.FC<Props> = () => {
    const [todoItem, setTodoItem] = useState("");
    const [todoItems, setTodoItems] = useState<string[]>([]);

    const handleTodoInputChange = (e: any) => {
        console.log("handleTodoInputChange", "[" + e.target.value + "]");

        setTodoItem(e.target.value);
    };

    const handleSubmit = () => {
        setTodoItems([...todoItems, todoItem]);
        setTodoItem("");
    };

    return (
        <div>
            <input type="text" placeholder="todo..." value={todoItem} onChange={handleTodoInputChange} />

            <button
                type="button"
                disabled={!todoItem}
                onClick={handleSubmit}>OK</button>

            <ul data-testid="todoItems">
                {todoItems && todoItems.map((todoItem, index) => <li key={index}>{todoItem}</li>)}
            </ul>
        </div>
    );
}

export default TodoForm;