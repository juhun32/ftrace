// import DataChart from "./components/DataChart";
import DataTableSessions from "./components/DataTableSessions";
import DataTableLaps from "./components/DataTableLaps";
import InteractiveSessions from "./components/InteractiveSessions";
import InteractiveLaps from "./components/InteractiveLaps";
import DriverLapTable from "./components/DriverLapTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>F1 Datas</h1>

      <div className="sessions">
        {<DataTableSessions />}
        {<InteractiveSessions />}
      </div>

      <div className="laps">
        {<InteractiveLaps />}
        {/* {<DriverLapTable />} */}
      </div>
    </div>
  );
}

export default App;
