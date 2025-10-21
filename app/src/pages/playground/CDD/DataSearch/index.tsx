import { useState } from "react";
import AppLayout from "../../../../components/ui/AppLayout";
import { SearchBar } from "../../../../components/ui/SearchBar";
import { Icon } from "../../../../components/ui/Icon";
import type { PageProps } from "../../../_page-types";
import { DataCard, FilterSection } from "./components";
import { dataItems, filterGroups, tabOptions } from "./data/searchData";
import styles from "./styles.module.scss";

const DataSearch = () => {
  const [searchQuery, setSearchQuery] = useState("data");
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 102;
  const totalItems = 5076;
  const itemsPerPage = 50;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Changed to page:", page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (currentPage < totalPages - 2) pages.push(currentPage + 2);
    if (currentPage < totalPages - 3) pages.push("...");
    if (currentPage < totalPages) pages.push(totalPages);
    return pages;
  };

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <aside className={styles.sidebar}>
        {filterGroups.map((group, index) => (
          <FilterSection key={index} filterGroup={group} />
        ))}
      </aside>

      {/* Right Content */}
      <main className={styles.main}>
        {/* Top Section: Search Bar and Navigation */}
        <div className={styles.topSection}>
          <div className={styles.searchWrapper}>
            <SearchBar
              placeholder="Search..."
              // size="nav"
              onSearch={handleSearch}
              defaultValue={searchQuery}
              storageKey="data_search_history"
              showSearchButton={true}
              searchButtonText="Search"
            />
          </div>

          <nav className={styles.tabs}>
            {tabOptions.map((tab, index) => (
              <button
                key={index}
                className={`${styles.tab} ${activeTab === index ? styles.active : ""}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Results Section with Switch Filter */}
        <div className={styles.resultsSection}>
          {/* <div className={styles.resultsHeader}>
            <div className={styles.resultsInfo}>
              Total {totalItems} results
            </div>
            <Switch
              options={["All", "Favorites"]}
              initialSelected={0}
              onChange={(_index, value) => console.log("Filter:", value)}
            />
          </div> */}

          {/* Scrollable Results */}
          <div className={styles.resultsContent}>
            {dataItems.map((item) => (
              <DataCard key={item.id} data={item} />
            ))}
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Total {totalItems} results
          </div>

          <div className={styles.paginationControls}>
            <div className={styles.perPageSelector}>
              <select
                className={styles.select}
                value={itemsPerPage}
                onChange={(e) => console.log("Items per page:", e.target.value)}
                aria-label="Items per page"
              >
                <option value="50">50/page</option>
                <option value="100">100/page</option>
                <option value="200">200/page</option>
              </select>
            </div>

            <div className={styles.pageNumbers}>
              <button
                className={styles.pageBtn}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <Icon icon="chevron_left" />
              </button>

              {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={index}
                    className={`${styles.pageBtn} ${page === currentPage ? styles.active : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className={styles.ellipsis}>
                    {page}
                  </span>
                )
              )}

              <button
                className={styles.pageBtn}
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <Icon icon="chevron_right" />
              </button>
            </div>

            <div className={styles.pageJump}>
              <span className={styles.jumpLabel}>Jump to</span>
              <input
                type="number"
                className={styles.pageInput}
                min="1"
                max={totalPages}
                defaultValue={currentPage}
                aria-label="Jump to page"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = parseInt((e.target as HTMLInputElement).value);
                    if (value >= 1 && value <= totalPages) {
                      handlePageChange(value);
                    }
                  }
                }}
              />
              <span className={styles.jumpLabel}>page</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DataSearchPage: PageProps = {
  title: "Data Search",
  slug: "data-search",
  content: (
    <AppLayout isTesting={true}>
      <DataSearch />
    </AppLayout>
  ),
};

export default DataSearchPage;

