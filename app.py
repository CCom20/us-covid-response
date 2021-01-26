from flask import Flask, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

endpoint = "db-1-replica.ckcezj6mfmmk.us-east-2.rds.amazonaws.com"
password = "C0vid2021analysis"
username = "uscovid" 
db_name = "us_covid_db"

# Create the engine
engine = create_engine(f'postgresql://uscovid:{password}@{endpoint}/us_covid_db')

connection = engine.connect()

app = Flask(__name__)

# Home page: List all routes that are available.

@app.route("/test")
def test():
    state_session = Session(engine)

    state_result = connection.execute("select * from master_table")

    state_session.close()

    state_info = []

    for row in state_result:
        
        state_dict = {}
        state_dict["state"] = row[0]
        state_dict["population"] = row[1]
        state_dict["total_distributed"] = row[2]
        state_dict["total_administered"] = row[3]
        state_dict["distributed_per_100K"] = row[4]
        state_dict["administered_per_100K"] = row[5]
        state_dict["people_with_1plus_doses"] = row[6]
        state_dict["people_with_1plus_doses_per_100K"] = row[7]
        state_dict["people_with_2_doses"] = row[8]
        state_dict["people_with_2_doses_per_100K"] = row[9]
        state_dict["%_vaccinated"] = row[10]
        state_info.append(state_dict)

    return jsonify(state_info)

# Precipitation Page: List all data

# @app.route("/api/v1.0/precipitation")
# def precipitation():
#     precip_session = Session(engine)

#     precip_result = precip_session.query(measurement.date, measurement.prcp).all()

#     precip_session.close()

#     list_prcp = []
    
#     for date, prcp in precip_result:
#         precip_dict = {}
#         precip_dict["date"] = date
#         precip_dict["prcp"] = prcp
#         list_prcp.append(precip_dict)

#     return jsonify(list_prcp)

# # Stations Page: List all stations

# @app.route("/api/v1.0/stations")
# def stations():
#     station_session = Session(engine)

#     station_results = station_session.query(station_ref.station, station_ref.name).all()

#     station_session.close()

#     list_stations = []

#     for station, name in station_results:
#         station_dict = {}
#         station_dict["station"] = station
#         station_dict["name"] = name
#         list_stations.append(station_dict)
    
#     return jsonify(list_stations)

# # Temperature Observations: List temp observations through one year ago

# @app.route("/api/v1.0/tobs")
# def tobs():
#     temps_session = Session(engine)

#     query_date = dt.date(2017, 8, 23) - dt.timedelta(days=365)

#     temp_results = temps_session.query(measurement.date, measurement.tobs).filter(measurement.station == 'USC00519281').filter(measurement.date >= query_date).all()

#     temps_session.close()

#     list_temps = []

#     for date, tobs in temp_results:
#         temp_dict = {}
#         temp_dict["date"] = date
#         temp_dict["tobs"] = tobs
#         list_temps.append(temp_dict)

#     return jsonify(list_temps)

# # Page for Start Dates - user filtering

# @app.route("/api/v1.0/<start_date>")
# def range(start_date):

#     range_session = Session(engine)

#     range_results = range_session.query(func.min(measurement.tobs), func.max(measurement.tobs), func.avg(measurement.tobs)).filter(measurement.date >= start_date).all()

#     range_session.close()

#     list_start = []

#     for min, max, avg in range_results:
#         start_dict = {}
#         start_dict["min_tobs"] = min
#         start_dict["max_tobs"] = max
#         start_dict["avg_tobs"] = round(avg, 2)
#         list_start.append(start_dict)

#     return jsonify(list_start)

# #  Start and End Dates - user filtering

# @app.route("/api/v1.0/<start_date>/<end_date>")
# def start_end(start_date, end_date):

#     start_end_session = Session(engine)

#     range_results = start_end_session.query(func.min(measurement.tobs), func.max(measurement.tobs), func.avg(measurement.tobs)).filter(measurement.date >= start_date).filter(measurement.date <= end_date).all()

#     start_end_session.close()

#     list_start_end = []

#     for min, max, avg in range_results:
#         start_end_dict = {}
#         start_end_dict["min_tobs"] = min
#         start_end_dict["max_tobs"] = max
#         start_end_dict["avg_tobs"] = round(avg, 2)
#         list_start_end.append(start_end_dict)

#     return jsonify(list_start_end)

if __name__ == "__main__":
    app.run(debug=True)