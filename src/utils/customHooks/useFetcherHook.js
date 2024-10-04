import { useCallback, useEffect } from "react";
import featureSeletor from "../../data/featureSelector";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setLoading,
  updateHasMore,
  updateOriginalList,
} from "../../data/slices/cardsSlice";
function useFetcherHook() {
  let cancel;
  let dataToRender = featureSeletor.useDataTorender();
  let pageNo = featureSeletor.usePageNumber();
  const isLoading = featureSeletor.useIsLoading();
  const isMoreAvailble = featureSeletor.useMoreAvailable();
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    axios({
      method: "get",
      url: `https://dummyjson.com/users`,
      params: {
        select: "firstName,age",
        limit: 50,
        skip: (pageNo - 1) * 50,
      },
    })
      .then((res) => {
        // setdata here
        dispatch(updateOriginalList(res.data.users));
        if (res.data.total > (pageNo - 1) * 50) {
          dispatch(updateHasMore(true));
        } else {
          dispatch(updateHasMore(false));
        }
      })
      .catch((e) => {
        console.error("Error", e);
      });
  }, [pageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return null;
}

export default useFetcherHook;
