import PureSmallCard from "./SmallCard";

function HistoryBar({history}) {
    if (!history) return <h3 style={{textAlign: "center", width: "100vw"}}>Your search history is empty...</h3>;

    function iterateThrough(history) {
        let cityTimestops = Object.keys(history);
        return cityTimestops.reverse().map(curCity => <PureSmallCard {...history[curCity]} key={curCity} />);
    }
    return (
        <div id="history-bar" style={{margin: "auto", display: "grid", gridTemplate: "repeat(5, 1fr) / repeat(2, 1fr)"}}>
            {iterateThrough(history)}
        </div>
    )
}

export default HistoryBar;