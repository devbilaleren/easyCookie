# easyCookie

## Installation

    <script src="/path/to/jquery.easyCookie.min.js"></script>
    
## Usage

Create session cookie:

    $.easyCookie('name', 'value'); // Set 1 day.
    
Or: 

    $.easyCookie('name', 'value', {
        expire: 5
    });
    
Options: 

     {
        domain: location.hostname,
        path: '/',
        secure: false,
        expire: 1
     }
    
## More Usage

Create session cookie:
    
    $.easyCookie().set('name', 'value'); // Set 1 day.
    
Create session cookie 2 months: 
    
    $.easyCookie().setMonth('name', 'value', 2); // Set 2 months.
    
Create session cookie 2 years: 
    
    $.easyCookie().setYears('name', 'value', 2); // Set 2 years.
    
Chech session cookie: 
    
    $.easyCookie().has('name'); // true or false
    
Get session cookie: 
    
    $.easyCookie().get('name'); // string or null
    
Remove session cookie: 
    
    $.easyCookie().remove('name'); // true or false
