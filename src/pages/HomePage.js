import HomeTitle from "../components/HomeTitle";
import { StartButton } from "../components/StartButton";

export default function HomePage({ start }) {
  return (
    <div className="home-page">
      <HomeTitle />
      <StartButton start={start} />
    </div>
  );
}
