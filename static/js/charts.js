// EARTHQUAKE DATA URL CONSTANT
const covidData = "./data/master-data.json"
const nytData = "./data/nyt-master.json"

let table = d3.select("#covidTable").select("tbody")

let stateFilter = d3.select("#stateFilter")

function findStates(data) {
    return data.state = stateSelected;
}

d3.json(`${nytData}`, function(times) {

    let stateSelected = stateFilter.property('value'); 

    stateFilter.on("change", timeSeriesData); 

    // Function Filter
    function stateDataFilter(data) {
        return data.state == `${stateSelected}`; 
    }

    let stateData = times.filter(function(item){
        return item.state == `${stateSelected}`;         
        });

    
    function timeSeriesData(d) {

        stateSelected = stateFilter.property('value'); 

        stateData = times.filter(function(item){
            return item.state == `${stateSelected}`;         
            }); 

        let cases = stateData.map(item => item.cases);
        let dates = stateData.map(item => new Date(item.date));

        var trace1 = {
            x: dates,
            y: cases,
            type: 'scatter'
        };

        var timeSeriesData = [trace1];

        var layout = {
            title: `${stateSelected} Cumulitive Cases Over Time`
          };

        Plotly.newPlot('stateTimeSeries', timeSeriesData, layout);
    }

    timeSeriesData(stateData);
    
    
    // function stateTimeSeries(data) {

    //     var trace1 = {
    //         x: data.date,
    //         y: data.cases,
    //         type: 'scatter'
    //       };

    //     var timeSeriesData = [trace1];  

    //     Plotly.newPlot('stateTimeSeries', timeSeriesData);
    // } 

})

// READ JSON DATA AND INITIALIZE MAP
d3.json(`${covidData}`, function(data) {

    // console.log(data); 

    data.forEach(item => {

        stateFilter.append('option').text(item.state)

        let stateRow = table.append('tr')

        stateRow.append('td').text(item.state)
        stateRow.append('td').text(item.population)
        stateRow.append('td').text(item.cases)
        stateRow.append('td').text(item.deaths)
        stateRow.append('td').text(item.total_distributed)
        stateRow.append('td').text(item.total_administered)
        stateRow.append('td').text(item.percent_vaccinated)
        stateRow.append('td').text(item.est_percent_infected_to_date)
        stateRow.append('td').text(item.est_percent_immune)

    });

}); 