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
    
Create session cookie 2 month: 
    
    $.easyCookie().setMonth('name', 'value', 2); // Set 2 month.
