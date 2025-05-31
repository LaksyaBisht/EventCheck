
#### We have used 3 models:

### 1. userModel

The fields are 'username', 'email', 'password', 'role', 'clubName' and 'created_at'


### 2. eventModel

The fields are 'event_name', 'event_date', 'event_description', 'club_name', 'created_by', 'venue', 'team_size', 'organizer_email', 'rewards', 'created_at', 'updated_at'.


### 3. registerEventModel

The fields are 'event_name', 'name', 'email', 'registrationNum', 'phone', 'teamDetails', 'register_at'



## Code

``` js
const <schemaName> = new mongoose.schema({
<fieldName1>:{

}, 
<fieldName2>:{

}
})

const <modelName> = mongoose.model('<CollectionName', <schemaName>)
module.exports = <modelName>
```
