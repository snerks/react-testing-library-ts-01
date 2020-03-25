import * as React from "react";
import { useState } from "react";

interface Props { };

const TodoForm: React.FC<Props> = () => {
    const [todoItem, setTodoItem] = useState("");
    const [todoItems, setTodoItems] = useState<string[]>([]);

    return (
        <div>
            <input placeholder="todo..." onChange={(e: any) => setTodoItem(e.target.value)} />
            {/* <input placeholder="todo..." /> */}

            <button type="button" onClick={() => setTodoItems([...todoItems, todoItem])}>OK</button>
            {/* <button type="button">OK</button> */}

            <ul data-testid="todoItems">
                {todoItems && todoItems.map((todoItem, index) => <li key={index}>{todoItem}</li>)}
            </ul>
        </div>
    );
}

export default TodoForm;