import GlossaryForm from "@/components/GlossaryForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getGlossaryDetails } from "@/api";
import { VocabularyType } from "@/type";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<VocabularyType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === 'string') {
      getGlossaryDetails(Number(id))
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            console.error('Failed to fetch data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // 返回加载状态
  }

  if (!data) {
    return <div>No data found</div>; // 返回错误状态
  }

  return <GlossaryForm editData={data} />;
}
