import React, { useEffect, useState } from "react";
import {Card, Image} from "antd";
import {getAllCourseList, getCourseList} from "@/api";
import { CourseType } from "@/type";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const { Meta } = Card;
  const [cardList, setCourseList] = useState<CourseType[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      getAllCourseList().then((res) => {
        console.log("%c[res]-21", res);
        setCourseList(res.data);
      });
    })();
  }, []);
  const handleClick = (id: number) => {
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
            <Image alt="example" src={card.cover} height={220}/>
          }
          onClick={() => handleClick(card.id as number)}
        >
          <Meta title={card.coursename} description={card.uploaddate} />
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
