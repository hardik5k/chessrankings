import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const PlayerGraph = (props) => {

    return (
      <>
        <ResponsiveContainer width = "90%" height = {400}>
        <LineChart data = {props.graphData}>
            <Tooltip />
            <CartesianGrid stroke = "#ccc" />
            <XAxis dataKey = "date" />
            <YAxis type = "number" domain = {props.yrange}/>
          <Line type = "monotone" dataKey = "rating" stroke = "#8884d8" strokeWidth = {4} />
        </LineChart>
        </ResponsiveContainer>
      </>
    );
}

export default PlayerGraph;