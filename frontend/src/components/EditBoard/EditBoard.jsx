import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import global from "@assets/global.module.css";
import styles from "./EditBoard.module.css";
import Header from "../Header/Header";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, {
  modules,
  formats,
} from "../UI/RichTextEditor/EditorToolBar";

const EditBoard = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [projectId, SetProjectId] = useState(null);
  const [priorNovelVal, setPriorNovelVal] = useState(null);
  const [priorTechVal, setPriorTechVal] = useState(null);
  const [priorCapableVal, setPriorCapableVal] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projectboards/${id}`
        );
        setTitle(response.data.title || "");
        setContent(response.data.content || "");
        SetProjectId(response.data.project_fk || "");

        setPriorNovelVal(response.data.novelty || 0);
        setPriorTechVal(response.data.technical_feasibility || 0);
        setPriorCapableVal(response.data.capability || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const updateProjectBoard = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/projectboards/${id}/update`,
        {
          title: title,
          content: content, // Use the content from the React Quill editor
          novelty: priorNovelVal,
          capability: priorCapableVal,
          technical_feasibility: priorTechVal,
          feedback: "s",
          recommendation: "s",
          references: "s",
          project_fk: projectId,
        }
      );
      // console.log(response.data.project_fk);
      // await axios.put(
      //   `http://127.0.0.1:8000/api/project/${response.data.project_fk}/update_score`
      // );

      navigate(`result`);

      console.log("ProjectBoard updated successfully:", response.data.id);
    } catch (error) {
      console.error("Error updating ProjectBoard:", error);
    }
  };

  // Handle changes in the React Quill editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <div className={global.body}>
      <Header />
      <div className={styles.container}>
        <span className={styles.title}> {title} </span>

        <Card className={styles.cardContainer}>
          <div className={styles.box} />

          <div className={styles.containerStyle}>
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleEditorChange} // Update content state
              placeholder="Write something"
              modules={modules}
              formats={formats}
              className={global.quill}
            />
          </div>
        </Card>

        <Button className={styles.button} onClick={updateProjectBoard}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditBoard;
