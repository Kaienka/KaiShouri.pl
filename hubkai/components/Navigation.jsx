import BottomNavbar from "@/components/navigation/BottomNavbar";
import MainNavbar from "@/components/navigation/MainNavbar";
import Header from "@/components/navigation/Header";

function Navigation() {
  return (
    <>
      <div className="left-0 top-0 h-screen bg-plume-wine shadow-xl flex flex-col justify-between">
        <div>
          <Header />
          <MainNavbar />
        </div>
        <BottomNavbar />
      </div>
    </>
  );
}

export default Navigation;
