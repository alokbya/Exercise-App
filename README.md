# Final Assignment - Full Stack MERN App

## App Data
> Data will be stored in MongoDB, in a collection named `exercises`

Each `exercise` document in the collection must have the following properties (all required)...

|Property|Data Type|Comments|
|--------|---------|--------|
|name|String|The name of the exercise|
|reps|Number|The number of times the exercise was performed|
|weight|Number|The weight of the weights used for the exercise|
|unit|String|The unit of measurement of the weight. Only values allowed are `kgs` and `lbs`|
|date|String|The date the exercise was performed. Specified as MM-DD-YY|


1. Build RESTful endpoints
2. Create model
3. Validate endpoints working with data via Postman
4. Build React App
   1. HomePage
   2. EditMovie
   3. AddMovie
5. Add Authentication
6. Deploy to Netifly?