import PureSmallCard from "./SmallCard";
import "../CSS/historyBar.css";


function HistoryBar({history}) {
    if (!history) return <h3 id="noHistoryH3">Your search history is empty...</h3>;

    function iterateThrough(history) {
        const cityTimestops = Object.keys(history);
        return cityTimestops.reverse().map(curCity => <PureSmallCard {...history[curCity]} key={curCity} />);
    }
    return (
        <div id="history-bar">
            {iterateThrough(history)}
        </div>
    )
}

export default HistoryBar;