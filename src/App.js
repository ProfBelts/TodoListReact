import "./styles.css";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Learn Code", checked: false },
  { id: 2, description: "Learn React", checked: false },
  { id: 3, description: "Eat", checked: false }
];

function Button({ children }) {
  return <button type="submit"> {children} </button>;
}

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems([...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <div className="App">
      <Header />
      <ItemList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggle}
      />
      <Form onAddItems={handleAddItems} />
    </div>
  );
}

function Header() {
  return (
    <div className="box" id="heading">
      <h1> Todo List </h1>
    </div>
  );
}

function ItemList({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="box">
      <ul className="list">
        {items.map((item) => (
          <Items
            items={item}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Items({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="item">
      <li>
        <input
          type="checkbox"
          value={items.checked}
          onChange={() => onToggleItem(items.id)}
        />
        <span style={items.checked ? { textDecoration: "line-through" } : {}}>
          {" "}
          {items.description}{" "}
        </span>
        <button
          className="button-close"
          onClick={() => onDeleteItems(items.id)}
        >
          {" "}
          X{" "}
        </button>
      </li>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newItems = {
      id,
      description,
      checked: false
    };

    onAddItems(newItems);

    setDescription("");
  }

  return (
    <div className="box">
      <form className="item" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button> + </Button>
      </form>
    </div>
  );
}
