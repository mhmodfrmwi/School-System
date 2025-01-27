import AboutScore from "../components/Motivation/AboutScore";
import HeaderInfo from "../components/Motivation/headerInfo";
import NewWayOfLearning from "../components/Motivation/NewWayOfLearning";
import PointsSummary from "../components/Motivation/pointsSummary";
import SummaryScore from "../components/Motivation/summaryScore";
import Table from "../components/Motivation/table";

function MotivationPage() {
    return (
      <>
        <HeaderInfo/>
        <PointsSummary/>
        <AboutScore/>
        <NewWayOfLearning/>
        <SummaryScore/>
        <Table/>
        
      </>
    );
  }
  
  export default MotivationPage;
  