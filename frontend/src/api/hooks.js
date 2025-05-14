import { useEffect, useState } from "react";
import { fetchData } from "./fakeDb";

export const useProfessors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("professors").then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};
