import TopBar from '@/components/General/TopBar';
import { montserrat } from '../fonts';
import EventDetails from '@/components/Dashboard/EventDetails';

const DashboardPage = async () => {
  return (
    <div>
      <TopBar />
      <h2
        className={`${montserrat.className} mt-4 text-4xl text-blueMain font-bold text-center mb-4`}
      >
        Dashboard
      </h2>
      <div className="px-[5%]">
        <EventDetails />
      </div>
    </div>
  );
};

export default DashboardPage;
