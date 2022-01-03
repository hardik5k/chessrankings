import 'bootstrap/dist/css/bootstrap.css';
import {Button, Badge} from 'react-bootstrap';
import PlayerGraph from './PlayerGraph.js'
import CreateTable from './CreateTable';
import Heading from './Heading';
import {Link, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {spreadsheetId, API_KEY} from '../credentials';
import ReactLoading from 'react-loading';

function PlayerInfo() {
  const playerName = new URLSearchParams(useLocation().search).get('name');
    useEffect(() => {
      window.scrollTo(0, 0);
      getData(`${playerName}!A28:H`);
      setLoading(true);
    }, []);

    async function getData(sheetName) {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      let newData = data.values;
      newData.forEach((_, index, arr) => {
          arr[index][4] = arr[index][4].replace(',', '');
          arr[index][6] = arr[index][6].replace(',', '');
          let name = arr[index][3];
          arr[index][3] = name.replace(/['!]/g, '').slice(0, name.length - 5);
      })
      setTableData(newData);
      setBadgeType(newData[0][newData[0].length - 1] >= 0 ? "success" : "danger");
      setPRating(newData[0][6]);
      setLoading(false);
  }

    const [tableData, setTableData] = useState([
      [
        'Date',
        'Time',
        'white/black',
        "Name",
        'Oppo Rating',
        'Result',
        'Rating',
        'Change'
      ],
    ]);
    const [loading, setLoading] = useState(false);
    const [badgeType, setBadgeType] = useState("success");
    const [pRating, setPRating] = useState("...");
    if (loading){
      return (<>
        <Heading title = "PLAYER INFO"/>
        <br></br>
        <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}> 
        <ReactLoading type={"spinningBubbles"} color={"grey"} height={'10%'} width={'10%'}/>
        </div>
        </>
        );
    }
    else{
      let minRating = 10000, maxRating = 0;
      const graphData = [...tableData].reverse().map((matchData) => {
        const rating = parseInt(matchData[6].split(',').join(''));
        minRating = Math.min(minRating, rating);
        maxRating = Math.max(maxRating, rating);
          return ({
            date : matchData[0],
            rating: rating
          })
        });
    const yrange = [minRating - 10, maxRating + 20];
    const tableHeadings = ['Date', 'Time', 'Played as', 'Opponent', 'Opponent Rating', 'Outcome', "Rating", 'Change' ];
    tableData.pop();

      return (
        <>
            <Heading title = "PLAYER INFO"/>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                <h2 style = {{textAlign: "center", margin: "auto"}}>{playerName}<Badge bg = {badgeType}>{pRating}</Badge></h2>
                <Link to = "/"><Button variant="dark">Back</Button></Link>
            </div>
            
            <br></br>
          
            <PlayerGraph graphData = {graphData} yrange = {yrange}/><br></br>
            <CreateTable tableData = {tableData} tableHeadings = {tableHeadings} style = {{textAlign: "center"}}/>
        </>
    );

    }

    
}

export default PlayerInfo;