# Serverless Static Site 
A static site sample that aims to display the musical production of an indie artist. 
Technologies applied:

* IAM
* DynamoDB - see the entity relatioships on the [ERD document](Entity-Relationship-Diagram-ERD.jpg)
* AWS Lambda
* API Gateway
* S3
* Route53
* Cloudfront
* Serverless Framework


## About the music domain definition

The following _user categories_ will exist:
_Admin_ and _marketing_
The Admin user will have permissions to add, edit, delete songs and events. 
The Marketing users will have permissions to add or edit songs as well as events.
In this iteration only admin users are implemented. Users to Songs tables have a one to many relationship.


The main table will be the _Songs_ table
Songs could have the same title but belong to a different category ie: _instrumental_ or _uncut_ version.
They could feature a guest artist on instrument or vocals. A many to one relationship will be established with the _Featured Artist_ table.
Ideally all available songs will be present on the same platforms. Since these platforms are 3PT, a many to many relationship seems to be the best implementation here. Same will appply to selling platforms (not active ATM).


In the future, the following functionality could be added: 
- support widget, via [Bandcamp](https://bandcamp.com/) 3PT
- events. Also something that could be done via 3PT with [Bandsintown](https://artists.bandsintown.com/) for instance
- search should be allowed by title, genre, release date, length. This could be done via 3PT vendors like [Algolia](https://www.algolia.com/)
- email subscription, with actors like [Mailchimp](https://mailchimp.com/developer/marketing/api/)

#### TODO

**AWS Ecosystem**

* Cognito auth


**Automation**

* Automated testing

* CI/CD implementation


**Back End Alternative Implementations**

* Java

* Typescript

* Python 


**Front End Alternative Implementations**

* React

* Vue


**3PT Integrations**

* Events

* Search

* Email: two kinds, one for fans to get event newsletter and one for the admin user to get notifications for possible bookings.