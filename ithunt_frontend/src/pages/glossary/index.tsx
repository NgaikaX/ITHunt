import React, { useEffect, useState } from "react";
import type { CollapseProps } from "antd";
import { Collapse, Form } from "antd";
import { getAllVocabularyList } from "@/api";
import styles from "./index.module.css";
import { VocabularyType } from "@/type/glossary";
import dynamic from "next/dynamic";

//动态导入 ReactQuill 并禁用服务器端渲染
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

export default function Glossary() {
  const [itemsList, setItemsList] = useState<VocabularyType[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await getAllVocabularyList();
        // 控制台输出 API 返回的结果，便于调试
        console.log(
            "%c[res]-21",
            "font-size:13px; background:pink; color:#000",
            res
        );
        // 设置词汇列表数据到状态
        setItemsList(res.data);
      } catch (error) {
        // 捕获并打印可能的错误
        console.error("获取词汇列表失败:", error);
      }
    })();
  }, []);

  // 将 itemsList 转换为 Collapse 组件所需的格式
  const items: CollapseProps["items"] = itemsList.map((item, index) => ({
    key: String(index), // 使用字符串作为 key
    label: item.vocabulary, // 展示词汇
    children: (
        <ReactQuill
            value={item.explanation} // 设置编辑器的内容为解释
            readOnly={true} // 设置为只读模式
            theme="bubble" // 使用 bubble 主题
        />
    ),
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
