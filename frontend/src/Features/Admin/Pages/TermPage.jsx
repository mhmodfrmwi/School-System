import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTerms } from "../components/AdminRedux/termSlice";
import TermList from "../components/Terms/TermList";

const AllTerms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTerms());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-4">
    <div className="flex-1">
      <div className="mx-auto w-[360px]  p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <TermList />
        </div>
      </div>
    </div>
  );
};

export default AllTerms;
