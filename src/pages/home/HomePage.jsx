import { useRef } from "react";
import Challenge from "../../components/common/Challenge";
import HomeActivity from "./HomeActivity";
import HomeMain from "./HomeMain";
import HomeCurriculum from "./HomeCurriculum";
import HomeService from "./HomeService";
import HomeUMC from "./HomeUMC";
import HomeUniversity from "./HomeUniversity";

const HomePage = () => {
  const umcRef = useRef(null);

  const scrollToUMC = () => {
    if (umcRef.current) {
      const offset =
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 10; // 스크롤할 위치에서의 오프셋(16rem을 px로 변환)
      const umcPosition = umcRef.current.offsetTop + offset; // HomeUMC의 시작 위치에 오프셋 추가
      window.scrollTo({ top: umcPosition, behavior: "smooth" });
    }
  };

  // HomeMain에서 특정 길이만큼 스크롤하면 HomeUMC의 특정 부분으로 이동
  // const handleScroll = () => {
  //   const threshold =
  //     parseFloat(getComputedStyle(document.documentElement).fontSize) * 20; // 스크롤 이동 기준 위치(15rem을 px로 변환)
  //   const scrollPosition = window.scrollY; // 현재 스크롤 위치

  //   if (scrollPosition >= threshold) {
  //     scrollToUMC();
  //     // 스크롤 이벤트가 한 번만 발생하도록 설정
  //     window.removeEventListener("scroll", handleScroll);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div style={{ background: "black" }}>
      <HomeMain key="homemain" downClick={scrollToUMC} />
      <HomeUMC key="homeumc" ref={umcRef} />
      <HomeService key="homeservice" />
      <HomeCurriculum key="homecurri" />
      <HomeActivity key="homeactivity" />
      <HomeUniversity key="homeuniv" />
      <Challenge key="challenge" />
    </div>
  );
};

export default HomePage;
