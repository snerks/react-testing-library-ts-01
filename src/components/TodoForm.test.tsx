import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom'
import TodoForm from './TodoForm';

test('renders', () => {
    render(<TodoForm />);
});

test('renders todo input', () => {
    const { getByPlaceholderText } = render(<TodoForm />);
    const todoInput = getByPlaceholderText("todo...");
    expect(todoInput).toBeInTheDocument();
});

test('renders ok button', () => {
    const { getByText } = render(<TodoForm />);
    const okButton = getByText("OK");
    expect(okButton).toBeInTheDocument();
});

test('Clicking ok button sets stored Todo Item', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<TodoForm />);

    const todoInput = getByPlaceholderText("todo...");
    const okButton = getByText("OK");

    const todoItemsElement = getByTestId("todoItems");

    const expectedTodoItemText = "Use react-testing-library";

    fireEvent.change(todoInput, { target: { value: expectedTodoItemText } });
    fireEvent.click(okButton);

    // expect(todoItemsElement).toHaveTextContent(expectedTodoItemText);

    const todoItemElements = todoItemsElement.getElementsByTagName("li");
    expect(todoItemElements).toHaveLength(1);
    expect(todoItemElements[0]).toHaveTextContent(expectedTodoItemText);

    screen.debug(todoItemsElement);
});