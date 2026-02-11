Here is a simple flow chart:

```mermaid
sequenceDiagram
    participant browser
    participant server

        Note right of browser : The browser send the fromData $note as POST request to the server
    browser->>server: POST form data note https://studies.cs.helsinki.fi/exampleapp/new_note 
    activate server 
    server-->>browser: HTML CODE
    deactivate server
       Note left of server : The server redirect the user to the new page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/note
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"test","date":"2026-01-14T08:45:05.458Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```