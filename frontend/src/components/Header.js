import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Header({ title }) {
  //   const [projects, setProjects] = useState(["project 0034", "project 9382"]);

  function handleAddProject() {
    // setProjects([...projects, `project ${Date.now()}`]);
  }

  useEffect(() => {
    api.get("").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <>
      <header></header>
    </>
  );
}
