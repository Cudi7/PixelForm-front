import { createContext, ReactNode, useContext, useState } from "react";

const useSearchController = () => {
  const [filterName, setFilterName] = useState("");

  const handleFilterByName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterName(e.target.value);
  };

  const clearFilterName = () => setFilterName("");

  return {
    filterName,
    handleFilterByName,
    clearFilterName,
  };
};

const SearchContext = createContext<ReturnType<typeof useSearchController>>({
  filterName: "",
  handleFilterByName: () => {},
  clearFilterName: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => (
  <SearchContext.Provider value={useSearchController()}>
    {children}
  </SearchContext.Provider>
);

export const useSearch = () => useContext(SearchContext);
