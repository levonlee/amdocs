## Usage
`git clone https://github.com/levonlee/amdocs.git`

`cd amdocs`

`npm install`

`npm start`

Home URL is `localhost:3000`

## Route
Homepage `/` shows the Login page. After successfully login, it will redirect to `/search` which is the Search page

## Authentication & REST
Login page passes username and password to the specified external server using `axios`

The same external server is also used to fetch search results

## Limitation & Improvements
Since the external server's `JSESSIONID` cannot be saved to this environment, every search query is run after a login query. This is not ideal.

Some improvements in the future
- Troubleshoot and find a way to store cookie returned by external server after successful login and pass this cookie to other services e.g. search query, on the external server
- Build state management so that states e.g. login info, and configuration can be shared across Router, Login, Search and App
- Implement testing
- Add pagination to Search page

## Some Thoughts
I know this is not a production-level creation and I did a bad job ):
This is my first time to build a React app and I really like it. The syntax, the functional programming feature, code readability, the ease feeling of coding are better than Vue and Angular.
The documentation and the community support is amazing.
I am glad that I have a chance to learn React.
