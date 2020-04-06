//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://webmessi:test123@cluster0-hau1w.mongodb.net/bookingDB", {  useNewUrlParser: true, useUnifiedTopology: true});

const bookingSchema = {
  id: Number,
  user_id: Number,
  vehicle_model_id: Number,
  package_id: Number,
  travel_type_id: Number,
  from_area_id: Number,
  to_area_id: Number,
  from_city_id: Number,
  to_city_id: Number,
  from_date: { type: Date, default: Date.now },
  to_date: { type: Date, default: Date.now },
  online_booking: Number,
  mobile_site_booking: Number,
  booking_created: { type: Date, default: Date.now },
  from_lat: mongoose.Schema.Types.Decimal128 ,
  from_long: mongoose.Schema.Types.Decimal128,
  to_lat: mongoose.Schema.Types.Decimal128,
  to_long: mongoose.Schema.Types.Decimal128,
  Car_Cancellation: Number

};




const Booking = mongoose.model("Booking", bookingSchema);


///////////////////////////////////Requests Targetting all Bookings////////////////////////

app.route("/bookings")

.get(function(req, res){
  Booking.find(function(err, foundBookings){
    if (!err) {
      res.send(foundBookings);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newBooking = new Booking({
    id: req.body.id,
    user_id: req.body.user_id,
    vehicle_model_id: req.body.vehicle_model_id,
    package_id: req.body.package_id,
    travel_type_id: req.body.travel_type_id,
    from_area_id: req.body.from_area_id,
    to_area_id: req.body.to_area_id,
    from_city_id: req.body.from_city_id,
    to_city_id: req.body.to_city_id,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    online_booking: req.body.online_booking,
    mobile_site_booking: req.body.mobile_site_booking,
    booking_created: req.body.booking_created,
    from_lat: req.body.from_lat,
    from_long: req.body.from_long,
    to_lat: req.body.to_lat,
    to_long: req.body.to_long,
    Car_Cancellation: req.body.Car_Cancellation
  });

  newBooking.save(function(err){
    if (!err){
      res.send("Successfully added a new booking.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  Booking.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all bookings.");
    } else {
      res.send(err);
    }
  });
});



////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/bookings/:bookingId")

.get(function(req, res){

  Booking.findOne({id: req.params.bookingId}, function(err, foundBooking){
    if (foundBooking) {
      res.send(foundBooking);
    } else {
      res.send("No bookings matching that id was found.");
    }
  });
})

.put(function(req, res){

  Booking.update(
    {id: req.params.bookingId},
    {
      id: req.body.id,
      user_id: req.body.user_id,
      vehicle_model_id: req.body.vehicle_model_id,
      package_id: req.body.package_id,
      travel_type_id: req.body.travel_type_id,
      from_area_id: req.body.from_area_id,
      to_area_id: req.body.to_area_id,
      from_city_id: req.body.from_city_id,
      to_city_id: req.body.to_city_id,
      from_date: req.body.from_date,
      to_date: req.body.to_date,
      online_booking: req.body.online_booking,
      mobile_site_booking: req.body.mobile_site_booking,
      booking_created: req.body.booking_created,
      from_lat: req.body.from_lat,
      from_long: req.body.from_long,
      to_lat: req.body.to_lat,
      to_long: req.body.to_long,
      Car_Cancellation: req.body.Car_Cancellation
    },
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected booking.");
      }
      else{
        res.send(err);
      }
    }
  );
})

.patch(function(req, res){

  Booking.update(
    {id: req.params.bookingId},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated booking.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){

  Booking.deleteOne(
    {title: req.params.bookingId},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding booking.");
      } else {
        res.send(err);
      }
    }
  );
});






app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started Successfully");
});
