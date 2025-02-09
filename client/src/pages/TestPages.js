import React, { useEffect } from "react";

const TestPages = () => {
  const getAllData = async () => {
    try {
      const res = await fetch(
        "https://psd-backend-nodejs.vercel.app/api/get/all/data"
      );

      const data = res.json();

      console.log("Semua data : ", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <h1>asdasdsad</h1>
    </div>
  );
};

export default TestPages;
