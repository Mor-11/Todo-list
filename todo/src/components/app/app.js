import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Havea lunch"),
    ],
    coincidence: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      import: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  togglePreperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onTiggleImpontant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.togglePreperty(todoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.togglePreperty(todoData, id, "done"),
      };
    });
  };

  onLabelChange = (coincidence) => {
    this.setState({ coincidence });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search = (items, coincidence) => {
    if (coincidence === "") return items;
    return items.filter((text) => {
      return text.label.toLowerCase().indexOf(coincidence.toLowerCase()) > -1;
    });
  };

  filter = (items, filter) => {
    if (filter === "all") return items;
    if (filter === "active")
      return items.filter((todo) => {
        return todo.done === false;
      });
    if (filter === "done")
      return items.filter((todo) => {
        return todo.done === true;
      });
    else return items;
  };

  render() {
    const { todoData, coincidence, filter } = this.state;

    const visibleItems = this.filter(
      this.search(todoData, coincidence),
      filter
    );

    const doneCount = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onLabelChange={this.onLabelChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onTiggleImpontant={this.onTiggleImpontant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
