import { SignIn } from "@clerk/nextjs";
import styles from "./index.module.css";

export default function Page() {
  return (
    <div className={styles.signInContainer}>
      <SignIn />
    </div>
  );
}
