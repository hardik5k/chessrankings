import {Link} from 'react-router-dom';
import CreateTable from './CreateTable';
import Heading from './Heading';
import {useState, useEffect} from 'react';
import {spreadsheetId, API_KEY} from '../credentials';
import ReactLoading from 'react-loading';

const linkStyle = {
    textDecoration: "none",
    color: 'blue'
};

export default function Leaderboard(){

    useEffect(() => {
        getData('Wins & Losses!A2:H');
        setLoaing(true);
    }, []);

    async function getData(sheetName) {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        let newData = data.values;
        newData.forEach((_, index, arr) => {
            arr[index].splice(3, 4);
            arr[index][0] = '#' + arr[index][0];
            arr[index][2] = arr[index][2].replace(',', '');
            let name = arr[index][1];
            arr[index][1] = name.replace(/['!]/g, '').slice(0, name.length - 5);
            arr[index][1] = <Link style = {linkStyle} to = {`/playerInfo?name=${arr[index][1]}`}>{arr[index][1]}</Link>
        })
        setTableData(newData);
        setLoaing(false);
    }
    const [loading, setLoaing] = useState(false);
    const [tableData, setTableData] = useState([]);
    const tableHeadings = ["Ladder Rank", "Player Name", "Rating", "W-D-L"];

    if (loading){
        return (<>
          <Heading title = "LEADERBOARD"/>
          <br></br>
          <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}> 
          <ReactLoading type={"spinningBubbles"} color={"grey"} height={'10%'} width={'10%'}/>
          </div>
          </>
          );
      }
    else{
        return(
            <>
                <Heading title = "LEADERBOARD"/>
                <CreateTable tableData = {tableData} tableHeadings = {tableHeadings} style = {{fontSize: "1.2em"}}/>
    
            </>
        );

    }
    
}