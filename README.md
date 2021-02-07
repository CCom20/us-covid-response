# U.S. COVID-19 Response Dashboard

> *A dashboard to visualize and analyze the U.S. response to COVID-19. Data from the New York Times, NIH, CDC, and Census Bureau.*

This is a simple dashboard to look at the overall response with the option to drill down by state. 

## Process of Analysis

**ETL**

Pandas was used to clean the data and export JSON files for use with a static website. SQLalchemy was used to upload the cleaned data to an Amazon RDS (PostgreSQL). 

**Estimated Percent Immune**

There are some assumptions in the "Estimate Percent Immune" field. Here they are in no particular order: 

1. We do not definitively know how long immunity lasts, so it is assumed it lasts for 1+ years.
2. State population is recalculated based on the number of deaths. 
3. Vaccinations are assumed to be 100% effective, even though most have tested at 90-95% effective.
4. There is no adjustment for unreported cases not in the data.

A lot of this was done to keep calculations simple and conservative.

## National Overview 

> Map, Correlations, and Daily New Cases

There's a slight negative correlation between the number of cases and the percent vaccinated. However, this is early data with a correlation of *-.31*. More data will be needed to confirm and draw definitive conclusions.

Users are able to switch datasets to view different maps. The default is the estimated percent immune. Other key metrics are provided for the user to consider.

## State Overview 

> Total Cases by Date, Bar Chart of Key Indicators, and a reference table.

A dropdown menu allows users to focus on a specific state, and the graphs and table update accordingly. The line  graph shows total cases by date, and the bar chart provides an estimation of the total number of people infected over the course of the outbreak, an estimation of total percent of the population immune, and the percent of population vaccinated. These are mostly calculated based on CDC vaccination data.

### Data and Files

Below is a provided outline for finding folders and data. 

**Project**
- Data
    - Contains JSON and CSV files from data sources, as well as output data from Jupiter Notebooks
- Notebooks
    - Contains notebooks for data cleaning, testing, and a brief state analysis for correlations.
- SQL Queries
    - A very small SQL file for renaming and assigning keys to tables after uploading to AWS RDS.
- static
    - JavaScript files for displaying the dashboard, all found in charts.js
- app.py
    - The start of the API for providing access to data.
- index.html
    - The main landing page for the dashboard. 