import { useState } from "react";
import AppLayout from "../../../components/ui/AppLayout";
import { SearchBar } from "../../../components/ui/SearchBar";
import { Icon } from "../../../components/ui/Icon";
import type { PageProps } from "../../_page-types";

// Special component for style preview with always-visible history
const StylePreviewSearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  // Test data array for search history
  const TEST_HISTORY_DATA = [
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence",
    "React Components",
    "TypeScript Tutorial",
    "CSS Modules",
    "Web Development"
  ];

  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(TEST_HISTORY_DATA);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleHistoryTagClick = (historyItem: string) => {
    setQuery(historyItem);
    onSearch(historyItem);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const resetToTestData = () => {
    setSearchHistory([...TEST_HISTORY_DATA]);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Control Buttons */}
      <div style={{ 
        marginBottom: "12px", 
        display: "flex", 
        gap: "8px",
        alignItems: "center" 
      }}>
        <button
          onClick={resetToTestData}
          style={{
            padding: "6px 12px",
            backgroundColor: "var(--color-semantic-active)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500
          }}
        >
          Reset Test Data
        </button>
        <button
          onClick={clearHistory}
          style={{
            padding: "6px 12px",
            backgroundColor: "transparent",
            color: "var(--color-text-main)",
            border: "1px solid var(--color-border-main-trans)",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Clear History
        </button>
        <span style={{ fontSize: "14px", color: "var(--color-neg)" }}>
          ({searchHistory.length} items)
        </span>
      </div>

      <div style={{ position: "relative", maxWidth: "600px" }}>
      {/* SearchBar Input */}
      <div style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "0 8px",
        border: "1px solid var(--color-border-main-trans)",
        height: "44px",
        fontSize: "16px",
        borderRadius: "8px",
        gap: "8px",
        borderColor: "var(--color-semantic-active)"
      }}>
        <Icon icon="search" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Style preview - history always visible..."
          style={{
            padding: "8px 0",
            flex: 1,
            outline: "none",
            border: "none",
            background: "none",
            height: "100%",
            color: "inherit",
            fontSize: "inherit"
          }}
        />
      </div>

      {/* Always Visible History Box */}
      <div style={{
        backgroundColor: "var(--color-bg-main)",
        borderRadius: "8px",
        border: "1px solid var(--color-border-main-trans)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        width: "100%",
        minWidth: "320px",
        left: 0,
        top: "calc(44px + 4px)",
        zIndex: 1000,
        padding: "12px 16px"
      }}>
        {/* Search history header with clear button */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px"
        }}>
          <div style={{
            margin: 0,
            padding: 0,
            fontSize: "12px",
            fontWeight: "bold",
            color: "var(--color-neg)"
          }}>
            Search History
          </div>
          {searchHistory.length > 0 && (
            <button
              onClick={clearHistory}
              aria-label="Clear search history"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.6,
                transition: "opacity 0.2s ease",
                color: "inherit"
              }}
            >
              <Icon icon="clear" />
            </button>
          )}
        </div>

        {/* Render search history tags */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px"
        }}>
          {searchHistory.length === 0 ? (
            <div style={{
              padding: "24px 16px",
              textAlign: "center",
              color: "var(--color-neg)",
              fontSize: "14px",
              fontStyle: "italic",
              width: "100%"
            }}>
              No search history
            </div>
          ) : (
            searchHistory.map((item: string, index: number) => (
              <button 
                key={index} 
                onClick={() => handleHistoryTagClick(item)}
                style={{
                  backgroundColor: "var(--color-bg-sec-trans)",
                  border: "1px solid var(--color-border-main-trans)",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontSize: "14px",
                  color: "inherit"
                }}
              >
                {item}
              </button>
            ))
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

const SearchBarDebug = () => {
  const [lastSearch, setLastSearch] = useState<string>("");
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (query: string) => {
    setLastSearch(query);
    setSearchCount((prev) => prev + 1);
    console.log("Search executed:", query);
  };

  const clearTestHistory = () => {
    setSearchCount(0);
    setLastSearch("");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "32px" }}>SearchBar Component Debug</h1>

      {/* Search Info Display */}
      <div style={{ 
        marginBottom: "40px", 
        padding: "16px", 
        backgroundColor: "var(--color-bg-sec-trans)",
        borderRadius: "8px",
        border: "1px solid var(--color-border-main-trans)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ marginTop: 0 }}>Search Information</h3>
          <button
            onClick={clearTestHistory}
            style={{
              padding: "6px 12px",
              backgroundColor: "var(--color-semantic-active)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear Test History
          </button>
        </div>
        <p><strong>Last Search:</strong> {lastSearch || "No searches yet"}</p>
        <p><strong>Total Searches:</strong> {searchCount}</p>
      </div>

      {/* Style Preview - Always Visible History UI */}
      <div style={{ 
        marginBottom: "120px", 
        padding: "16px", 
        backgroundColor: "var(--color-bg-sec-trans)",
        borderRadius: "8px",
        border: "1px solid var(--color-border-main-trans)"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Style Preview - History Dropdown (Always Visible)</h3>
        <p style={{ fontSize: "14px", color: "var(--color-neg)", marginBottom: "12px" }}>
          This preview shows the SearchBar's history dropdown UI with persistent visibility for style inspection.
        </p>
        <StylePreviewSearchBar onSearch={handleSearch} />
      </div>

      {/* Default Size */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Default Size</h2>
        <SearchBar
          placeholder="Search with default size..."
          onSearch={handleSearch}
        />
      </section>

      {/* Nav Size */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Nav Size</h2>
        <SearchBar
          placeholder="Search with nav size..."
          size="nav"
          onSearch={handleSearch}
        />
      </section>

      {/* Small Size */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Small Size</h2>
        <SearchBar
          placeholder="Search with small size..."
          size="small"
          onSearch={handleSearch}
        />
      </section>

      {/* With Default Value */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>With Default Value</h2>
        <SearchBar
          placeholder="Search..."
          defaultValue="React Components"
          onSearch={handleSearch}
        />
      </section>

      {/* Custom Placeholder */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Custom Placeholder</h2>
        <SearchBar
          placeholder="Type to search for documentation..."
          onSearch={handleSearch}
        />
      </section>

      {/* Separate Instance */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Separate History Instance</h2>
        <p style={{ marginBottom: "12px", color: "var(--color-neg)", fontSize: "14px" }}>
          This search bar uses a different localStorage key, so it has its own independent history.
        </p>
        <SearchBar
          placeholder="Search with separate history..."
          onSearch={handleSearch}
          storageKey="search_history_separate_demo"
        />
      </section>

      {/* With Search Button - Default Size */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>With Search Button (Default Size)</h2>
        <p style={{ marginBottom: "12px", color: "var(--color-neg)", fontSize: "14px" }}>
          Search bar with integrated search button.
        </p>
        <SearchBar
          placeholder="Search..."
          onSearch={handleSearch}
          showSearchButton={true}
        />
      </section>

      {/* With Search Button - Nav Size */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>With Search Button (Nav Size)</h2>
        <p style={{ marginBottom: "12px", color: "var(--color-neg)", fontSize: "14px" }}>
          Compact search bar with button for navigation bars.
        </p>
        <SearchBar
          placeholder="Search..."
          size="nav"
          onSearch={handleSearch}
          showSearchButton={true}
        />
      </section>

      {/* With Search Button - Small Size */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>With Search Button (Small Size)</h2>
        <p style={{ marginBottom: "12px", color: "var(--color-neg)", fontSize: "14px" }}>
          Small search bar with button for tight spaces.
        </p>
        <SearchBar
          placeholder="Search..."
          size="small"
          onSearch={handleSearch}
          showSearchButton={true}
        />
      </section>

      {/* With Custom Button Text */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>With Custom Button Text</h2>
        <p style={{ marginBottom: "12px", color: "var(--color-neg)", fontSize: "14px" }}>
          Search bar with customized button label.
        </p>
        <SearchBar
          placeholder="Enter search query..."
          onSearch={handleSearch}
          showSearchButton={true}
          searchButtonText="Go"
        />
      </section>

      {/* With Custom Button Click Handler */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>With Custom Button Click Handler</h2>
        <p style={{ marginBottom: "12px", color: "var(--color-neg)", fontSize: "14px" }}>
          Search bar with custom button click logic that shows an alert.
        </p>
        <SearchBar
          placeholder="Try clicking the button..."
          onSearch={handleSearch}
          showSearchButton={true}
          searchButtonText="Custom Action"
          onSearchButtonClick={() => {
            alert("Custom button click handler executed!");
            handleSearch("Custom button clicked");
          }}
        />
      </section>

      {/* Usage Instructions */}
      <section style={{ marginTop: "64px", padding: "24px", backgroundColor: "var(--color-bg-sec-trans)", borderRadius: "8px" }}>
        <h2>Usage Instructions</h2>
        <ul>
          <li>SearchBar starts with empty history by default</li>
          <li>Type and press Enter to execute a search</li>
          <li>Click on the search bar when empty to see search history</li>
          <li>Click on history items to search them again</li>
          <li>Use the clear button to remove all history</li>
          <li>History is saved to localStorage (max 10 items)</li>
          <li>Use custom <code>storageKey</code> prop to create separate history instances</li>
          <li>Set <code>showSearchButton</code> to true to display an integrated search button</li>
          <li>Customize button text with <code>searchButtonText</code> prop</li>
          <li>Use <code>onSearchButtonClick</code> for custom button click behavior</li>
        </ul>
      </section>
    </div>
  );
};

const SearchBarDebugPage: PageProps = {
  title: "SearchBar Debug",
  slug: "debug-searchbar",
  content: (
    <AppLayout isTesting={true}>
      <SearchBarDebug />
    </AppLayout>
  ),
};

export default SearchBarDebugPage;

