// EARTHQUAKE DATA URL CONSTANT
const covidData = "./data/master-data.json"
const nytData = "./data/nyt-master.json"

let table = d3.select("#covidTable").select("tbody")

let stateFilter = d3.select("#stateFilter")



function findStates(data) {
    return data.state = stateSelected;
}

d3.json(`${nytData}`, function(times) {

    let stateSelected = d3.select("#stateFilter").property('value'); 

    // console.log(times); 

    // Select the State for Filtering
    console.log(stateSelected)

    // Get a list of all states
    let states = times.map(item => item.state);


    let stateData = times.filter(function(item){
        return item.state == `${stateSelected}`;         
        });

    
    function timeSeriesData(stateData) {
        let cases = stateData.map(item => item.cases);
        let dates = stateData.map(item => new Date(item.date));
        console.log(cases);
        console.log(dates);

        var trace1 = {
            x: dates,
            y: cases,
            type: 'scatter'
        };

        var timeSeriesData = [trace1];  

        Plotly.newPlot('stateTimeSeries', timeSeriesData);
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