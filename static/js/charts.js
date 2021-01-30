// EARTHQUAKE DATA URL CONSTANT
const covidData = "./data/master-data.json"
const nytData = "./data/nyt-master.json"

let table = d3.select("#covidTable").select("tbody")

let stateFilter = d3.select("#stateFilter")

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
        stateBar(); 
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

        let tableHeader = d3.select("#stateTableHeader").text(`${stateSelected}`)

        data.forEach(item => {

            if (item.state == stateSelected) {

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

function stateBar() {

    d3.json(`${covidData}`, function(data) {

        stateSelected = stateFilter.property('value');

        stateData = data.filter(function(item){
            return item.state == `${stateSelected}`;         
            }); 

        let perVaccinated = stateData.map(item => item.percent_vaccinated);
        let percInfected = stateData.map(item => item.est_percent_infected_to_date);
        let percImmune = stateData.map(item => item.est_percent_immune);

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
            name: 'Percent Vaccinated', 
            opacity: 0.5,
            marker: {
                color: '#0089BA',
                line: {
                color: '#374955',
                width: 1.5
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
            name: 'Est. Percent Infected',
            marker: {
                color: '#374955',
                line: {
                color: '#374955',
                width: 1.5
                }
            }
        };

        var trace3 = {
            x: xValue,
            y: yValue3,
            type: 'bar',
            text: yValue3.map(String),
            textposition: 'auto',
            name: 'Est. Percent Immune',
            hoverinfo: 'none',
            marker: {
                color: '#48DAA2',
                line: {
                color: '#374955',
                width: 1.5
                }
            }
        };

        var data = [trace1,trace2, trace3];

        var layout = {
        title: `${stateSelected} <br /> Estimated Infection, Vaccination, and Immunity`, 
        yaxis: {
            title: '% of Total State Population'
            }
        };

        Plotly.newPlot('stateBarChart', data, layout);

    
    });
 
}

function usBoxplot() {

    d3.json(`${covidData}`, function(data) {

        var trace1 = {
            y: data.map(item => item.est_percent_immune),
            name: 'Est. % State Immunity', 
            type: 'box'
        };

        var data = [trace1];

        var layout = {
            yaxis: {
              title: 'State Percent Immune',
            }
          };

        Plotly.newPlot('usBoxPlot', data, layout);

    });
}

usBoxplot();

function usBarChart() {

    d3.json(`${covidData}`, function(data) {

        console.log(data);

        var sortedStates = data.sort((a, b) => b.est_percent_immune - a.est_percent_immune);

        var trace1 = {
            x: sortedStates.map(state => state.state),
            y: sortedStates.map(state => state.est_percent_immune),
            name: 'Est. Percent Immune',
            type: 'bar'
          };
          
          var data = [trace1];
          
          var layout = {
              barmode: 'stack',
              title: 'State Overview <br />Sorted by Estimated Percent Immune',
              xaxis: {
                  title: 'States',
                  tickangle: -45,
                  automargin: true
              },
              yaxis: {
                  title: 'Total % of Population'
              }
            };
          
          Plotly.newPlot('usBarChart', data, layout);

    });

}

usBarChart();

dailyCases = "../data/daily_new_cases.json"

function drawCalendar() {
    
    d3.json(`${dailyCases}`, function(data) {

        dateCases = data.map((date) => [new Date(date.date), date.daily_new_cases]);
        console.log(dateCases); 

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'date', id: 'Date' });
        dataTable.addColumn({ type: 'number', id: 'Cases' });
        dataTable.addRows(dateCases);

 
        var chart = new google.visualization.Calendar(document.getElementById('calendarChart'));
 
        var options = {
          title: "Daily New Cases",
          height: 350,
          calendar: {
              minValue: 0,  colors: ['#48DAA2']
            }
        };
 
        chart.draw(dataTable, options);

    });    
}