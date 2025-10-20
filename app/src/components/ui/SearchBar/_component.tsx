import { useState, useEffect } from "react";
import styles from "./_styles.module.scss";
import { Icon } from "../Icon";

export interface SearchBarProps {
  placeholder?: string;
  size?: "default" | "nav" | "small";
  onSearch: (query: string) => void;
  defaultValue?: string;
  className?: string;
  /**
   * Custom localStorage key for search history
   * Use this to create separate history instances
   */
  storageKey?: string;
}

const SEARCH_HISTORY_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

export const SearchBar = ({
  placeholder = "Search...",
  size = "default",
  onSearch,
  defaultValue = "",
  className = "",
  storageKey = SEARCH_HISTORY_KEY,
}: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(storageKey);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    } else {
      setSearchHistory([]);
    }
  }, [storageKey]);

  // Save search history to localStorage
  const saveSearchHistory = (history: string[]) => {
    localStorage.setItem(storageKey, JSON.stringify(history));
    setSearchHistory(history);
  };

  // Add search query to history
  const addToHistory = (searchQuery: string) => {
    if (searchQuery.trim() === "") return;
    
    const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)]
      .slice(0, MAX_HISTORY_ITEMS);
    saveSearchHistory(updatedHistory);
  };

  // Clear all search history
  const clearHistory = () => {
    saveSearchHistory([]);
  };

  // Handle search execution
  const executeSearch = (searchQuery: string) => {
    if (searchQuery.trim() === "") return;
    
    addToHistory(searchQuery);
    onSearch(searchQuery);
    setIsFocused(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeSearch(query);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding to allow clicking on history items
    setTimeout(() => setIsFocused(false), 150);
  };

  // Handle clicking on history tag
  const handleHistoryTagClick = (historyItem: string) => {
    setQuery(historyItem);
    executeSearch(historyItem);
  };

  return (
    <div
      className={`${styles["search-bar"]} ${styles[`size-${size}`]} ${
        isFocused ? styles["focused"] : ""
      } ${className}`}
    >
      {/* Render a search icon */}
      <Icon icon={"search"} />

      {/* Render the input field for search queries */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={styles.input}
      />

      {/* Render the search history box when input is empty and focused */}
      {query === "" && isFocused && (
        <div
          className={`${styles["hint-box"]} ${
            isFocused ? styles["focused"] : ""
          }`}
        >
          {/* Search history header with clear button */}
          <div className={styles["history-header"]}>
            <div className={styles["hint-group-title"]}>
              Search History
            </div>
            {searchHistory.length > 0 && (
              <button
                className={styles["clear-btn"]}
                onClick={clearHistory}
                aria-label="Clear search history"
              >
                <Icon icon="clear" />
              </button>
            )}
          </div>

          {/* Render search history tags */}
          <div className={styles["history-tags"]}>
            {searchHistory.length === 0 ? (
              <div className={styles["no-history"]}>
                No search history
              </div>
            ) : (
              searchHistory.map((item: string, index: number) => (
                <button 
                  key={index} 
                  className={styles["history-tag"]}
                  onClick={() => handleHistoryTagClick(item)}
                >
                  {item}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

