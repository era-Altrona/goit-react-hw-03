import css from "./searchBox.module.css";
export default function SearchBox({ value, onFilter }) {
  return (
    <div className={css.searchBox}>
      <label className={css.title}>Find contacts by name</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onFilter(event.target.value)}
      ></input>
    </div>
  );
}
