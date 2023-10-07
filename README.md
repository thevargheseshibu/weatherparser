#  Project Stack
    "agenda": "^4.4.0",
    "body-parser": "^1.20.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^6.7.0",
    "nodemon": "^2.0.20"
    
- Create parser that parses the hourly weather data file and saves it to database (data file attached in this email).
- Create aggregation function that calculates min/max/avg Air Temperature per day / week / month
-  Create UI from where the raw weather data and aggredated data can be visualized
- Also create a cyclic background job (for example Spring Scheduler or Database Agent job) which creates XML-report to file containing some data from database
