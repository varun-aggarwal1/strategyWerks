import { useSelector } from "react-redux";
const useDataTorender = () =>
  useSelector((state) => state.cardSlice.originalList);
const usePageNumber = () => useSelector((state) => state.cardSlice.pageNumber);
const useIsLoading = () => useSelector((state) => state.cardSlice.isLoading);
const useMoreAvailable = () =>
  useSelector((state) => state.cardSlice.hasMoreEntries);

const featureSeletor = {
  useDataTorender,
  usePageNumber,
  useIsLoading,
  useMoreAvailable,
};
export default featureSeletor;
