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

    stateFilter.on("change", timeSeriesData, filteredTable); 

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
            title: `${stateSelected} Cumulitive Cases Over Time`,
            xaxis: {
                title: 'Date'
              },
            yaxis: {
            title: 'Total Cases'
            }
          };

        Plotly.newPlot('stateTimeSeries', timeSeriesData, layout);

        filteredTable(); 
    }

    timeSeriesData(stateData);
    stateBar(stateData);
    
    filteredTable(); 

})

function filteredTable() {
    d3.json(`${covidData}`, function(data) {

        table.html("")
        
        let stateSelected = stateFilter.property('value');
        let stateRow = table.append('tr') 

        data.forEach(item => {

            if (item.state == stateSelected) {

                stateRow.append('td').text(item.state)
                stateRow.append('td').text(item.population)
                stateRow.append('td').text(item.cases)
                stateRow.append('td').text(item.deaths)
                stateRow.append('td').text(item.total_distributed)
                stateRow.append('td').text(item.total_administered)
                stateRow.append('td').text(item.percent_vaccinated)
                stateRow.append('td').text(item.est_percent_infected_to_date)
                stateRow.append('td').text(item.est_percent_immune)

            }; 

        }); 
    }); 
}; 
// READ JSON DATA AND INITIALIZE MAP
d3.json(`${covidData}`, function(data) {

    data.forEach(item => {

        stateFilter.append('option').text(item.state)

    });

});

function stateBar(d) {

    d3.json(`${covidData}`, function(data) {

        console.log(data); 

        stateSelected = stateFilter.property('value');

        stateData = data.filter(function(item){
            return item.state == `${stateSelected}`;         
            }); 

        let perVaccinated = stateData.map(item => item.percent_vaccinated);
        let percInfected = stateData.map(item => new Date(item.est_percent_infected_to_date));
        let percImmune = stateData.map(item => new Date(item.est_percent_immune));

        let xValue = [`${stateSelected}`];

        let yValue = perVaccinated;
        let yValue2 = percInfected;
        let yValue3 = percImmune; 

        var trace1 = {
            x: xValue,
            y: yValue,
            type: 'bar',
            text: yValue.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            opacity: 0.5,
            marker: {
                color: 'rgb(75, 88, 99)',
                line: {
                color: 'rgb(75, 88, 99)',
                width: 1.0
                }
            }
        };

        var trace2 = {
            x: xValue,
            y: yValue2,
            type: 'bar',
            text: yValue2.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'rgba(58,200,225,.5)',
                line: {
                color: 'rgb(8,48,107)',
                width: 1.5
                }
            }
        };

        var trace3 = {
            x: xValue,
            y: yValue3,
            type: 'bar',
            text: yValue2.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'rgba(58,200,225,.5)',
                line: {
                color: 'rgb(8,48,107)',
                width: 1.5
                }
            }
        };

        var data = [trace1,trace2, trace3];

        var layout = {
        title: `${stateSelected} Estimated Infection, Vaccination, and Immunity`
        };

        Plotly.newPlot('stateBarChart', data, layout);

    
    });
 
}