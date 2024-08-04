import React, { useEffect, useState } from "react";
import type { CollapseProps, TablePaginationConfig } from "antd";
import { Collapse, Form, Table } from "antd";
import {getAllVocabularyList} from "@/api";
import styles from "./index.module.css";
import { VocabularyType } from "@/type/glossary";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function Home() {
  useEffect(() => {
    (async function () {
      getAllVocabularyList().then((res) => {
        console.log(
          "%c[res]-21",
          "font-size:13px; background:pink; color:#000",
          res
        );
        setItemsList(res.data);
      });
    })();
  }, []);

  const [itemsList, setItemsList] = useState<VocabularyType[]>([]);

  const items: CollapseProps["items"] = itemsList.map((item, index) => ({
    key: String(index),
    label: item.vocabulary,
    children: (<ReactQuill
        value={item.explanation}
        readOnly={true}
        theme="bubble" // 使用 bubble 主题
    />),
  }));

  return (
    <>
      <Form className={styles.tableWrap}>
        <div>
          <Collapse accordion items={items} />
        </div>
      </Form>
    </>
  );
}
