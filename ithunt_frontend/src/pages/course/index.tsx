import React, { useEffect, useState } from "react";
import { Card, Form } from "antd";
import { getCourseList } from "@/api";
import { CourseType } from "@/type";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const { Meta } = Card;
  const [cardList, setCourseList] = useState<CourseType[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      getCourseList().then((res) => {
        console.log(
          "%c[res]-21",
          "font-size:13px; background:pink; color:#000",
          res
        );
        setCourseList(res.data);
      });
    })();
  }, []);
  const handleClick = (id: string) => {
    router.push(`/course/details/${id}`);
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
