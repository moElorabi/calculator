import HomePageContent from "../components/Content";
import PrimarySearchAppBar from "../components/Header";

function HomePage() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <HomePageContent />
    </div>
  );
}

export default HomePage;
