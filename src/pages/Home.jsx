import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctor from "../components/TopDoctor";
import Chatbot from "../components/Chatbot.jsx";


const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctor />
      <Banner/>
      <Chatbot/>
    </div>
  );
};

export default Home;
