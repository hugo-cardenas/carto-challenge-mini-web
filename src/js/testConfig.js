export default {
    "center": "[42.5897007687178, 12.734375]",
    "zoom": 4,
    "maps_api_config": {
        "user_name": "documentation",
        "maps_api_template": "http://{user}.cartodb.com:80"
    },
    "layers": [
        {
            "type": "tiled",
            "options": {
                "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                "minZoom": "0",
                "maxZoom": "18",
                "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
            }
        },
        {
            "type": "CartoDB",
            "options": {
                "sql": "select * from european_countries_e",
                "cartocss": "/** choropleth visualization */\n\n#european_countries_e{\n  polygon-fill: #FFFFB2;\n  polygon-opacity: 0.8;\n  line-color: #FFF;\n  line-width: 1;\n  line-opacity: 0.5;\n}\n#european_countries_e [ area <= 1638094] {\n   polygon-fill: #B10026;\n}\n#european_countries_e [ area <= 55010] {\n   polygon-fill: #E31A1C;\n}\n#european_countries_e [ area <= 34895] {\n   polygon-fill: #FC4E2A;\n}\n#european_countries_e [ area <= 12890] {\n   polygon-fill: #FD8D3C;\n}\n#european_countries_e [ area <= 10025] {\n   polygon-fill: #FEB24C;\n}\n#european_countries_e [ area <= 9150] {\n   polygon-fill: #FED976;\n}\n#european_countries_e [ area <= 5592] {\n   polygon-fill: #FFFFB2;\n}",
                "cartocss_version": "2.1.1"
            }
        },
        // {
        //     "type": "CartoDB",
        //     "options": {
        //         "sql": "SELECT * FROM ne_50m_lakes", // Natural and artificial lakes
        //         "cartocss": "#ne_50m_lakes {polygon-fill:#0000FF;}",
        //         "cartocss_version": "2.1.1"
        //     }
        // },
        
        // {
        //     "type": "CartoDB",
        //     "options": {
        //         "sql": "SELECT * FROM earthquakes_cdbjs_lesson3", // Earthquakes from the past 30 days
        //         "cartocss": "#all_day{marker-fill-opacity:0.9;marker-line-color:#ffffff;marker-line-width: 1.5;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 10;marker-fill: #FF6600;marker-allow-overlap: true;}",
        //         "cartocss_version": "2.1.1"
        //     }
        // },
        {
            "options": {
                "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                "minZoom": "0",
                "maxZoom": "18",
                "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
            },
            "type": "tiled"
        }
    ]
};