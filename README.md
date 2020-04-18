READ ME


*** SETUP ***
- Make sure NodeJS version and NPM installed on the machine
- Get an extracted copy from donut-domain.zip file
- Change directory (cd) into the main directory and do 'npm install'
- Then run 'node bin/www' via command line
- If everything is ok, server should be run on defined port inside bin/www (Default is on port 3000).

*** TESTING ***
- Using Postman to send request to this server for create, update (renewal), delete, get domain.


1/ Create - localhost:3000/api/domain - POST Method.
   ** Make sure customerId and verifiedContact matched with dummy list provided inside routes/index.js
EX BODY: 
{
 "domainName": "art.software",
 "periodRegistration": {"value": 2, "unit": "year" },
 "verifiedContact": {"provider": "provider-software", "contactId": "software-domain"},
 "customerId": "123456"
}
EX RESPONSE:
{
    "status": 200,
    "message": "Successfully registering the domain",
    "data": {
        "domainName": "art.software",
        "expirationDate": "2022-04-01"
    }
}


2/ Update (renewal) - localhost:3000/api/domain - PUT Method.
   ** Make sure domainName matched with dummy list provided inside routes/index.js
EX BODY: 
{
 "domainName": "art.software",
 "periodRegistration": {"value": 3, "unit": "year" }
}
EX RESPONSE:
{
    "status": 200,
    "message": "Successfully update the domain",
    "data": {
        "domainName": "art.software",
        "expirationDate": "2026-12-01T08:00:00.000Z"
    }
}


3/ Delete - localhost:3000/api/domain - DELETE Method.
   ** Make sure domainName matched with dummy list provided inside routes/index.js
EX BODY: 
{
 "domainName": "art.software"
}
EX RESPONSE:
{
    "status": 200,
    "message": "Successfully delete the domain",
    "data": {}
}


4/ Get - localhost:3000/api/domain - GET Method.
   ** Make sure domainName matched with dummy list provided inside routes/index.js
EX BODY: 
{
  "domainName": "art.software"
}
EX RESPONSE:
{
    "status": 200,
    "message": "Successfully retrieve the domain",
    "data": {
        "domainName": "art.software",
        "expirationDate": "2023-12-01T08:00:00.000Z"
    }
}
