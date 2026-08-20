import { useMemo, useState } from "react";
import Nav from "./Nav";
import initialHogs from "../porkers_data";

const emptyHog = {
  name: "",
  specialty: "",
  weight: "",
  greased: false,
  "highest medal achieved": "bronze",
  image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
};

function HogCard({ hog, onHide }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article aria-label="hog card" className="ui card hog-card">
      <button
        className="hog-card__summary"
        type="button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        aria-label={`Show details for ${hog.name}`}
      >
        <img src={hog.image} alt={`Photo of ${hog.name}`} />
        <h3>{hog.name}</h3>
      </button>

      {isExpanded && (
        <div className="content hog-card__details">
          <p>{`Specialty: ${hog.specialty}`}</p>
          <p>{hog.weight}</p>
          <p>{hog.greased ? "Greased" : "Nongreased"}</p>
          <p>{hog["highest medal achieved"]}</p>
        </div>
      )}

      <div className="extra content hog-card__actions">
        <button className="ui basic button" type="button" onClick={() => onHide(hog.name)}>
          Hide Me
        </button>
      </div>
    </article>
  );
}

function HogForm({ onAdd }) {
  const [form, setForm] = useState(emptyHog);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function submitForm(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.specialty.trim() || form.weight === "") return;

    onAdd({
      ...form,
      name: form.name.trim(),
      specialty: form.specialty.trim(),
      weight: Number(form.weight),
    });
    setForm(emptyHog);
  }

  return (
    <form className="ui form add-hog-form" onSubmit={submitForm}>
      <h2>Add a new hog</h2>
      <div className="fields">
        <div className="field">
          <label htmlFor="hog-name">Name:</label>
          <input id="hog-name" name="name" value={form.name} onChange={updateField} required />
        </div>
        <div className="field">
          <label htmlFor="hog-weight">Weight:</label>
          <input id="hog-weight" name="weight" type="number" min="0" step="0.1" value={form.weight} onChange={updateField} required />
        </div>
        <div className="field">
          <label htmlFor="hog-specialty">Specialty:</label>
          <input id="hog-specialty" name="specialty" value={form.specialty} onChange={updateField} required />
        </div>
      </div>
      <div className="inline field">
        <div className="ui checkbox">
          <input id="hog-greased" name="greased" type="checkbox" checked={form.greased} onChange={updateField} />
          <label htmlFor="hog-greased">Greased?</label>
        </div>
      </div>
      <button className="ui primary button" type="submit">Add Hog</button>
    </form>
  );
}

function App() {
  const [hogs, setHogs] = useState(initialHogs);
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [hiddenHogs, setHiddenHogs] = useState(() => new Set());

  const visibleHogs = useMemo(() => {
    const filtered = hogs.filter((hog) => !hiddenHogs.has(hog.name) && (!greasedOnly || hog.greased));
    return [...filtered].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "weight") return Number(a.weight) - Number(b.weight);
      return 0;
    });
  }, [greasedOnly, hiddenHogs, hogs, sortBy]);

  function hideHog(name) {
    setHiddenHogs((current) => new Set([...current, name]));
  }

  function addHog(hog) {
    setHogs((current) => [...current, hog]);
  }

  return (
    <div className="App">
      <Nav />
      <main className="ui container app-content">
        <section className="intro" aria-labelledby="page-title">
          <h1 id="page-title">County Fair Hog Showcase</h1>
          <p>Meet the talented hogs competing at this year&apos;s county fair. Select a card to learn more about each contestant.</p>
        </section>

        <section className="controls" aria-label="Hog controls">
          <div className="ui checkbox">
            <input id="greased-only" type="checkbox" checked={greasedOnly} onChange={(event) => setGreasedOnly(event.target.checked)} />
            <label htmlFor="greased-only">Greased Pigs Only?</label>
          </div>
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" className="ui dropdown" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="none">Featured order</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </section>

        <section className="ui grid container hog-grid" aria-label="Hog contestants">
          {visibleHogs.map((hog) => (
            <div className="eight wide column" key={`${hog.name}-${hog.image}`}>
              <HogCard hog={hog} onHide={hideHog} />
            </div>
          ))}
        </section>

        {visibleHogs.length === 0 && <p className="empty-state">No hogs match the current filters.</p>}
        <HogForm onAdd={addHog} />
      </main>
    </div>
  );
}

export default App;
