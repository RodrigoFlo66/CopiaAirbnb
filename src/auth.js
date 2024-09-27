const { google } = require('googleapis');

//Agrega permisos a la cuenta de servicio para que utilice Google Drive
const SCOPES = ['https://www.googleapis.com/auth/drive'];

//Init del auth que necesita la key y los scopes
const auth = new google.auth.GoogleAuth({
    credentials: {
      "type": process.env.GOOGLE_TYPE,
      "project_id": process.env.GOOGLE_PROJECT_ID,
      "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID,
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCTpqPaNrx0sdTJ\n6nF8b0WZe3Y0kw+e4UoXRMmtsvfDnYo5Kg0MlYFQ6FJRrFD/gKp9wkEX1ogcYU1Z\nqDIvdZBcQuAPk35V6/NiQHZDjVE6H4SrWrECnlD8nfby5h0wCHEw0ygL+yuFRCVh\nIyymBi97G9NQho+DrS6XxNddD9lI0zMDvGnoZJM3UfhEBSZ6vJk8yJW/FjAX/mSj\nQr1ok6pbuRzhw8YD4Dg0q7k81GNwrVroiE7o9KEJh+pKSKV/Zai0VXnzP5TI1XoG\n3AlZipW7coQjVKe6oEvxGzUtImNyq7/YcQ0WC31w5y9ym5VJkX0bhbf/bQuYmFKm\nJtoVJ7RPAgMBAAECggEAGoj+NX9UyxwSg98wWg6dUYIQsk4jpogSirAAFsltIai0\naKWYBsTvopy9/pObUu/KtCMvE5uohoEuJ4jEzCaytQIHxoTZVZO7/9JZ7rX8/Rcg\n/rKj0Tamk1/IO8sDP9ikjwPD1LNlFOQ0W4q4wXWnHtbXWUd1j1KWZwwnMEBi6mVU\ne/D1UoZQ5fOwWGBiNKw2yppBvL1J3zWdVtf78EGeXNeslaTCevh8/Y6Ckt6xwfRX\nNCxHrd+y9Tmfi6DBk8Qas94Rwqqt1xPcSbhbbReMask4N76hFaNyOtaqc/X9UE9v\no0uUeRpfJ9311V6Xod90BZeVcNetpQM0lj5oZfLtYQKBgQDKVO/c7gr8aE06UF18\n1NrG5uZHiRVVHxRTlQYjCL6VKsOObG7UvrnWT+AHNKZCl7L+/AatCdgCbOXK0esw\nSKWAX0lnRfNOyHxsKgZWuubg7R4uo49sTisd2KKdlWarPK9RCBnoOdIris8uh2pK\nsmnh09t0FnKeT95cFvMhYOHSlwKBgQC60KzKG/X3ZSd4AXZ8Bik2Y0AQl0/1ha8m\n0xZrKOURDS6PKy9LQrzsQrQhoprKt7h5u9SI1DbQfw96mfYlFe/g3eBvsEmymM6G\nuIXF+eg6H7b9td+OtUKKEuMnmR1e9WpfMR+i/3XehZuNj8OXsprOgmcfsIdZUOFm\nYOJJXhW7CQKBgQC8YvEip5EbCpI9ZW5mOFmrMHngyUZPhyyJ1gtsu0uX38VM6rEW\n7K5jWOOiUecrwcsrlsUwgCXbvEEI4wM0Za+TIyVZPswX4pvWqhpUzpkBfEXJ7wgv\nM2j51SczylNZxJsHu59DlfKWEBxvmi3hdtUXKwb9w5jcxkinPccKoQYh6QKBgQCT\nHmDk7W4fvRZ/CE/hzgxIm5LJPhAnH3dXEOdXzqXObt4au3yMPWuAd+tZja9vM43g\nuE3gz5a3TUjIWVUh0YvOP41PB7qSHoqOR+R5i5wZof4/ASqkPRTAna0r8wXRUV3K\nx2nNuHZ/niJpMi1rWqlVNha2OxPr/6jyMhwigSiF2QKBgFMCoXQh+ZMSAXTFHetz\nlJ40y1VEuz8gGh9vyhuvYWIMWVBOwxlG3tXAkomCWaavLi4wQa0suKDYgIzEW+6Q\nnl1EZKtrDZZM5M/eyYtZhRDvGtMyR1ABo2zco7KHdtzTnycppHjw+yMbwm5zjZbW\nUR48EjWHhFLOPia/+IJavvxi\n-----END PRIVATE KEY-----\n",
      "client_email": process.env.GOOGLE_CLIENT_EMAIL,
      "client_id": process.env.GOOGLE_CLIENT_ID,
      "auth_uri": process.env.GOOGLE_AUTH_URI,
      "token_uri": process.env.GOOGLE_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.GOOGLE_CLIENT_X509_CERT_URL,
      "universe_domain": process.env.GOOGLE_UNIVERSE_DOMAIN
    }, 
    scopes: SCOPES
});

module.exports = { auth };