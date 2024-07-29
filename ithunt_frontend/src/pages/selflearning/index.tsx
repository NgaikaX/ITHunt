import React, { useEffect, useState } from "react";
import { Card } from "antd";
import {getAllSl_CourseList, getSl_CourseList} from "@/api";
import { Sl_CourseType } from "@/type";
import styles from "./index.module.css";
import router from "next/router";

export default function Home() {
  const { Meta } = Card;
  const [cardList, setCourseList] = useState<Sl_CourseType[]>([]);

  useEffect(() => {
    (async function () {
      getAllSl_CourseList().then((res) => {
        console.log("%c[res]-21", res);
        setCourseList(res.data);
      });
    })();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/selflearning/coursedetails/${id}`);
  };
  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < cardList.length; i++) {
      const card = cardList[i];
      cards.push(
        <Card
          key={i}
          hoverable
          className={styles.cardtype}
          cover={
            <img alt="example" src={card.cover} className={styles.covertype} />
          }
          onClick={() => handleClick(card.id as string)}
        >
          <Meta title={card.coursename} description={card.description} />
        </Card>
      );
    }
    return cards;
  };
  return (
    <>
      <div className={styles.tableWrap}>{renderCards()}</div>
    </>
  );
}
