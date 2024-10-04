import "./App.css";
import featureSeletor from "./data/featureSelector";
import useFetcherHook from "./utils/customHooks/useFetcherHook";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { nextPage } from "./data/slices/cardsSlice";
import throttle from "lodash.throttle";

function App() {
  const list = featureSeletor.useDataTorender();
  //   const [list, setList] = useState(new Array(50).fill("wertyuwerty"));
  const isLoading = featureSeletor.useIsLoading();
  const pageNo = featureSeletor.usePageNumber();
  const hasMoreEntries = featureSeletor.useMoreAvailable();

  const [scrollTop, setScrollTop] = useState(0);
  const dispatch = useDispatch();
  const itemHeight = 35; // Height of each item
  const windowHeight = window.innerHeight * 0.9; // Height of the visible window
  const overscan = 10; // Number of items to render before/after the current viewport
  const numberOfItems = list.length;

  const validScrollTop = scrollTop || 0;

  const startIndex = useMemo(
    () => Math.max(0, Math.floor(validScrollTop / itemHeight) - overscan),
    [validScrollTop]
  );
  const endIndex = useMemo(
    () =>
      Math.min(
        numberOfItems,
        Math.floor((validScrollTop + windowHeight) / itemHeight) + overscan
      ),
    [numberOfItems, validScrollTop, windowHeight]
  );

  const listRef = useRef(null);

  // Scroll event handler
  const handleListScroll = (e) => {
    const newScrollTop = e.target?.scrollTop;
    setScrollTop(newScrollTop); // Update scroll position
  };

  // Attach and detach the scroll event listener
  useEffect(() => {
    const currentListRef = listRef.current;

    if (currentListRef) {
      const handleScroll = throttle(handleListScroll, 100);
      currentListRef.addEventListener("scroll", handleScroll);

      // Cleanup event listener on unmount
      return () => {
        currentListRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  useFetcherHook();

  useEffect(() => {
    if (endIndex >= numberOfItems - 10 && !isLoading && hasMoreEntries) {
      dispatch(nextPage());
    }
  }, [dispatch, endIndex, hasMoreEntries, isLoading, numberOfItems]);

  // Generate visible rows based on startIndex and endIndex
  const generateRows = useCallback(() => {
    let items = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (list[i]) {
        items.push(
          <div
            key={list[i].id}
            style={{
              position: "absolute",
              top: `${itemHeight * i}px`, // Position item based on its index
              height: `${itemHeight}px`,
              width: "100%",
              backgroundColor: i % 2 === 0 ? "#f0f0f0" : "#ffffff",
            }}
          >
            {list[i].firstName}
            {list[i].id}
          </div>
        );
      }
    }

    return items;
  }, [endIndex, list, startIndex]);

  return (
    <div className="App">
      <div className="cards_container" ref={listRef}>
        <div
          className="overscan_container"
          style={{
            height: `${list.length * itemHeight}px`,
            position: "relative",
          }}
        >
          {generateRows()}
        </div>
      </div>
    </div>
  );
}

export default App;
