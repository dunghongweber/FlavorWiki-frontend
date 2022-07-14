import { useEffect, useState } from "react";
import { IInfo } from "../interfaces/Interfaces";

interface IUseFetch {
  data: IInfo[];
  singleData: IInfo;
  isPending: boolean;
  error: null | string;
}

/**
 * This custom hook helps making GET request to server/database
 * @param url
 * @returns data, singleData, isPending, error
 */
const useFetch = (url: string): IUseFetch => {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState<IInfo>({
    _id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortContl = new AbortController();

    // //using async await?
    // const fetchRecords = async () => {
    //   const response = await fetch(url);
    //   const json = await response.json();

    //   if (response.ok) {
    //     setData(json);
    //   }
    // };

    fetch(url, { signal: abortContl.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data from server.");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        const returnArray = Array.isArray(data);

        setData(data);

        //return single record if API url is requesting a single record by Id
        if (!returnArray) {
          setSingleData(data);
        }

        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortContl.abort();
  }, [url]);

  return { data, singleData, isPending, error };
};

export default useFetch;
