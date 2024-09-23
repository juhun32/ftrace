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
      <h1>Data from PostgreSQL</h1>
      {/* {<DataChart />} */}
      {<DataTableSessions />}
      {/* {<DataTableLaps />} */}

      {<InteractiveSessions />}
      {<InteractiveLaps />}

      {<DriverLapTable />}
    </div>
  );
}

export default App;
