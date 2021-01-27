// EARTHQUAKE DATA URL CONSTANT
const covidData = "./data/master-data.json"

let table = d3.select("#covidTable").select("tbody")

let stateFilter = d3.select("#stateFilter")

// READ JSON DATA AND INITIALIZE MAP
d3.json(`${covidData}`, function(data) {
    console.log(data);

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

    })

}); 