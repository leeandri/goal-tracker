import React from "react";
import { useState } from "react";
import "./styles.css";

const initialGoals = [
  {
    id: 1,
    title: "Good Job",
    minis: [
      { idm: 1, name: "Linkedin", accompli: false },
      {
        idm: 2,
        name: "Resume",
        accompli: true,
      },
      { idm: 3, name: "Github", accompli: true },
      { idm: 4, name: "Cover Letter", accompli: false },
      { idm: 5, name: "Portfolio", accompli: false },
    ],
  },
];

export default function App() {
  const [goals, setGoals] = useState(initialGoals);

  function handleAddGoal(goal) {
    setGoals((goals) => [...goals, goal]);
  }

  return (
    <div className="container">
      <FormAddGoal onAddGoal={handleAddGoal} />
      <Tracker data={goals} />
    </div>
  );
}

function FormAddGoal({ onAddGoal }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title) return;

    const newGoal = {
      id: crypto.randomUUID(),
      title,
      minis: [],
    };

    onAddGoal(newGoal);

    setTitle("");
  }

  return (
    <form className="form-add-Goal" onSubmit={handleSubmit}>
      <label>Goal</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Tracker({ data }) {
  return (
    <div className="goal">
      {data.map((goal) => (
        <Goal title={goal.title} minis={goal.minis} key={goal.id} />
      ))}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddMini({ onAddMini }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newMini = {
      idm: crypto.randomUUID(),
      name,
      accompli: false,
    };

    onAddMini(newMini);

    setName("");
  }

  return (
    <form className="form-add-Goal" onSubmit={handleSubmit}>
      <label>Minigoal</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Goal({ title, minis }) {
  const [showAddMini, setShowAddMini] = useState(false);
  const [miniGoals, setMiniGoals] = useState(minis);
  //const [checkMini, setCheckMini] = useState(false);

  const totalMini = miniGoals.length;
  const nbAccompli = miniGoals.filter((item) => item.accompli).length;
  const percentAccompli = Math.round((nbAccompli / totalMini) * 100);

  function handleAddMini(miniGoal) {
    setMiniGoals((miniGoals) => [...miniGoals, miniGoal]);
  }

  function handleShowAddMini(show) {
    setShowAddMini((show) => !show);
  }

  function handleToggleMini(id) {
    setMiniGoals((miniGoals) =>
      miniGoals.map((miniG) =>
        miniG.idm === id ? { ...miniG, accompli: !miniG.accompli } : miniG
      )
    );

    //console.log(miniGoals);
  }

  function handleDeleteMini(id) {
    setMiniGoals((miniGoals) => miniGoals.filter((miniG) => miniG.idm !== id));
    console.log(miniGoals);
  }

  return (
    <div className={`open ${percentAccompli === 100 ? "completed" : ""}`}>
      <div className="goal-header">
        <span className="title">{title}</span>
        <span className="rate">{percentAccompli || 0}%</span>
      </div>
      <div className="content-box">
        <ul className="minis">
          {miniGoals.map((mini) => (
            <Minigoal
              id={mini.idm}
              name={mini.name}
              accompli={mini.accompli}
              key={mini.idm}
              onChangeAccompli={handleToggleMini}
              onDeleteMini={handleDeleteMini}
            />
          ))}
        </ul>
        {showAddMini && <FormAddMini onAddMini={handleAddMini} />}
        {<Button onClick={handleShowAddMini}>{showAddMini ? "-" : "+"}</Button>}
      </div>
    </div>
  );
}

function Minigoal({ id, name, accompli, onChangeAccompli, onDeleteMini }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={accompli}
        onChange={() => onChangeAccompli(id)}
      />
      <span style={accompli ? { textDecoration: "line-through" } : {}}>
        {name}
      </span>
      <button onClick={() => onDeleteMini(id)}>x</button>
    </li>
  );
}
