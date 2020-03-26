import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitForDomChange } from '@testing-library/dom'
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

test('clicking ok button sets stored Todo Item', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<TodoForm />);

    const todoInput = getByPlaceholderText("todo...");
    const okButton = getByText("OK");

    const todoItemsElement = getByTestId("todoItems");

    const expectedTodoItemText = "Use react-testing-library";

    fireEvent.change(todoInput, { target: { value: expectedTodoItemText } });

    screen.debug(todoInput);
    fireEvent.click(okButton);
    console.log("After fireEvent.click(okButton)");
    screen.debug(todoInput);

    const todoItemElements = todoItemsElement.getElementsByTagName("li");
    expect(todoItemElements).toHaveLength(1);
    expect(todoItemElements[0]).toHaveTextContent(expectedTodoItemText);

    expect(todoInput).toHaveTextContent("");
    expect(okButton).toBeDisabled();

    screen.debug(okButton);
});

test('empty TODO input disables ok button', () => {
    const { getByText, getByPlaceholderText } = render(<TodoForm />);

    const todoInput = getByPlaceholderText("todo...");
    const okButton = getByText("OK");

    const expectedTodoItemText = "";

    fireEvent.change(todoInput, { target: { value: expectedTodoItemText } });

    expect(okButton).toBeDisabled();

    // screen.debug(okButton);
});

test('non-empty TODO input enables ok button', () => {
    const { getByText, getByPlaceholderText } = render(<TodoForm />);

    const todoInput = getByPlaceholderText("todo...");
    const okButton = getByText("OK");

    const expectedTodoItemText = "not empty";

    fireEvent.change(todoInput, { target: { value: expectedTodoItemText } });

    expect(okButton).toBeEnabled();

    // screen.debug(okButton);
});