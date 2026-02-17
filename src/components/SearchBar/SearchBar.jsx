const SearchBar = ({ value, onChange }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="🔍 Buscar filme ou série..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar