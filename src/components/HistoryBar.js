import SmallCard from "./SmallCard";

function HistoryBar({history}) {
    if (!history) return <h3>Your search history is empty...</h3>;

    function iterateThrough(history) {
        let cityTimestops = Object.keys(history);
        console.log("WAS HERE -> in iteration")
        return cityTimestops.map(curCity => <SmallCard {...history[curCity]} key={curCity} />);
    }
    return (
        <div id="history-bar" style={{margin: "auto", display: "flex", flexWrap: "wrap"}}>
            {iterateThrough(history)}
        </div>
    )
}

export default HistoryBar;