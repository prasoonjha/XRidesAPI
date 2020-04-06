# XRidesAPI
A RESTful API for managing location based data recieved from a ride booking company.
Choice of Server Architecture: 
XRides delivers about a 200 rides per minute or 288,000 rides per day. This API, while conforming with the REST architecture, makes sure that all the requests made on the client side are served even at peak times of the day. This is ensured by Node's single threaded non-blocking (asynchronous) server. To put things into perspective, a simple file reading Express server built on NodeJS  Express server is capable of handling about 116 requests/sec, which is quite impressive when compared to similar blocking (synchronous) server architecture.

The API uses mongo database hosted on to an Atlas server via my account to log requests and changes made to the database. This API serves 5 major http verbs, namely:
1. GET --> read data from the database, all at a time or by querying a specific booking id.
2. POST --> write new booking data  into the database intothe home route.
3. PUT --> Update a booking
4. DELETE --> Delete entire Bookings colllection or a specific booking.
The data is stored as JSON objects which makes it easily integratable into mapping and charting libraries across the internet.
API Usage: 
You could be running the server locally by cloning the repository and npm installing the required dependencies listed in the package.json file. For ease of use, I've hosted the home route on a heroku server at https://safe-lowlands-11500.herokuapp.com/.
To view currently saved bookings on the erver, head over to https://safe-lowlands-11500.herokuapp.com/bookings.

This API is devoid of a front end so you might want to use your favorite API client like Postman or Insomnia Rest client.

For making GET requests: Set http verb to GET and paste https://safe-lowlands-11500.herokuapp.com/bookings to view all the bookings and https://safe-lowlands-11500.herokuapp.com/bookings/<id> to recieve a specific booking.

For making POST requests: Set http verb to post and make sure that req.body is url encoded.
POST https://safe-lowlands-11500.herokuapp.com/bookings 

An example booking schema looks like this.
        "id": 56,
        "user_id": 3244,
        "vehicle_model_id": 3,
        "package_id": 9,
        "travel_type_id": 45,
        "from_area_id": 23,
        "to_area_id": 65,
        "from_city_id": null,
        "to_city_id": null,
        "from_date": null,
        "to_date": null,
        "online_booking": 1,
        "mobile_site_booking": 0,
        "booking_created": null,
        "from_lat": {
            "$numberDecimal": "12.74262"
        },
        "from_long": {
            "$numberDecimal": "77.76348"
        },
        "to_lat": {
            "$numberDecimal": "12.65342"
        },
        "to_long": {
            "$numberDecimal": "77.76148"
        },
        "Car_Cancellation": 0,
  
DELETE: Delete one or more bookings by changing the request verb to DELETE.
