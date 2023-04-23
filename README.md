# ShortLink

ShortLink is a URL shortening service where you enter a URL such as https://indicina.co and it
returns a short URL such as http://short.est/GeAi9K. Visiting the shortened URL should redirect
the user to the long URL. Using the example above, visiting http://short.est/GeAi9K should
redirect the user to https://indicina.co.

## How To Test Project

To run this project, follow the steps below:

1. Clone the project repository with the command:

```
git clone https://github.com/PaulPextra/shortlink.git
```
2. Install the project dependencies using the command:
```
npm install
```
3. Start the project development server using the command:
`npm run dev` or `yarn dev`


## API Test

### To Encode or Shorten a URL

```
POST http://localhost:5000/encode
Content-Type: application/json
payload -
{
  "longUrl": "Enter a url you want to shorten here!"
}
```

### To Decode An Already Shortened URL

```
POST http://localhost:5000/decode
Content-Type: application/json
payload -
{
  "shortUrl": "Enter a shortened url you want to decode here!"
}
```

### To View The Statistics of A URL Path

```
GET http://localhost:5000/statistic/{url_path} 
```

**Author: Paul Okoli**
[Linkedin](https://www.linkedin.com/in/paulokoli/)
[Github](https://github.com/PaulPextra)