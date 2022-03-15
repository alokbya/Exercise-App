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
