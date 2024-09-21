from db_control import db
import plotly.express as px


class graph:
    sessions_data = db.db_fetch_sessions(db)
    laps_data = db.db_fetch_laps(db)
    axis = []

    def get_axis(self, data):
        for d in data.columns:
            self.axis.append(d)
        print(self.axis)

    def graph_data(self, data, x_column, y_column):

        if x_column not in data.columns or y_column not in data.columns:
            print(f"Error: '{x_column}' or '{y_column}' column not found in data.")
            return None

        fig = px.scatter(data, x=x_column, y=y_column)
        fig.show()


print(graph.get_axis(graph, graph.sessions_data))
print(graph.graph_data(graph, graph.sessions_data, graph.axis[0], graph.axis[1]))