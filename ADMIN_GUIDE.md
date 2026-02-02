# Admin Panel & Dictionary Management Guide

## Overview

The admin panel provides a complete CRUD (Create, Read, Update, Delete) interface for managing dictionary entries across multiple languages (Tajik, English, Russian).

## Access

Navigate to `/admin` in your browser to access the admin panel.

## Features

### 1. Dictionary Manager

#### View Dictionary Entries

1. Select a language from the dropdown (English, Tajik, Russian)
2. The system displays all entries for that language in a table format
3. Each entry shows:
   - **Word**: The dictionary word
   - **Part of Speech**: Noun, Verb, Adjective, etc.
   - **Meaning**: The definition of the word
   - **Actions**: Edit or Delete buttons

#### Search Words

- Use the search box to filter entries by word name
- Search is case-insensitive
- Results update in real-time

#### Add New Word

1. Click the "Add Word" button
2. Fill in the required fields:
   - **Word**: The word to add
   - **Part of Speech**: e.g., Noun, Verb, Adjective, Adverb, Interjection
   - **Meaning**: The definition
   - **Example** (optional): Usage example
3. Click "Save"

#### Edit Word

1. Click the edit (pencil) icon for any word
2. Modify the fields
3. Click "Save"

#### Delete Word

1. Click the delete (trash) icon for any word
2. Confirm deletion when prompted

#### Statistics

The dashboard shows:

- Total languages supported
- Number of entries in the current language
- Total entries across all languages

## API Endpoints

All API endpoints require JSON requests and return JSON responses.

### Get Supported Languages

**Endpoint:** `GET /api/admin/languages`

**Response:**

```json
{
  "supportedLanguages": [
    {
      "code": "en",
      "name": "English",
      "nativeName": "English",
      "entries": 24
    }
  ],
  "totalLanguages": 3
}
```

### Get All Entries for a Language

**Endpoint:** `GET /api/admin/dictionary/:language`

**Example:** `GET /api/admin/dictionary/en`

**Response:**

```json
{
  "language": "en",
  "totalEntries": 24,
  "entries": [
    {
      "word": "hello",
      "definitions": [
        {
          "partOfSpeech": "Interjection",
          "meaning": "A polite greeting or expression of goodwill",
          "example": "Hello! How are you doing today?",
          "synonyms": ["hi", "hey"],
          "antonyms": ["goodbye"]
        }
      ]
    }
  ]
}
```

### Get Specific Word

**Endpoint:** `GET /api/admin/dictionary/:language/:word`

**Example:** `GET /api/admin/dictionary/en/hello`

**Response:**

```json
{
  "word": "hello",
  "language": "en",
  "definitions": [
    {
      "partOfSpeech": "Interjection",
      "meaning": "A polite greeting or expression of goodwill",
      "example": "Hello! How are you doing today?"
    }
  ]
}
```

### Create New Word

**Endpoint:** `POST /api/admin/dictionary`

**Request Body:**

```json
{
  "language": "en",
  "word": "beautiful",
  "definitions": [
    {
      "partOfSpeech": "Adjective",
      "meaning": "Attractive and striking",
      "example": "The sunset is beautiful.",
      "synonyms": ["pretty", "lovely"],
      "antonyms": ["ugly"]
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "message": "Dictionary entry created successfully",
  "word": "beautiful",
  "language": "en",
  "definitions": [...]
}
```

### Update Word

**Endpoint:** `PUT /api/admin/dictionary/:language/:word`

**Example:** `PUT /api/admin/dictionary/en/hello`

**Request Body:**

```json
{
  "definitions": [
    {
      "partOfSpeech": "Interjection",
      "meaning": "Updated definition here",
      "example": "New example"
    }
  ]
}
```

**Response:** `200 OK`

```json
{
  "message": "Dictionary entry updated successfully",
  "word": "hello",
  "language": "en",
  "definitions": [...]
}
```

### Delete Word

**Endpoint:** `DELETE /api/admin/dictionary/:language/:word`

**Example:** `DELETE /api/admin/dictionary/en/hello`

**Response:** `200 OK`

```json
{
  "message": "Dictionary entry deleted successfully",
  "word": "hello",
  "language": "en"
}
```

### Batch Create Entries

**Endpoint:** `POST /api/admin/dictionary/batch`

**Request Body:**

```json
{
  "language": "en",
  "entries": [
    {
      "word": "apple",
      "definitions": [
        {
          "partOfSpeech": "Noun",
          "meaning": "A round fruit",
          "example": "I eat an apple daily."
        }
      ]
    },
    {
      "word": "banana",
      "definitions": [
        {
          "partOfSpeech": "Noun",
          "meaning": "A yellow tropical fruit",
          "example": "Bananas are rich in potassium."
        }
      ]
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "message": "Batch create completed",
  "language": "en",
  "results": {
    "created": 2,
    "skipped": 0,
    "errors": []
  }
}
```

### Search Dictionary

**Endpoint:** `GET /api/admin/dictionary-search?language=en&query=hello`

**Response:**

```json
{
  "language": "en",
  "query": "hello",
  "totalResults": 1,
  "results": [
    {
      "word": "hello",
      "definitions": [...]
    }
  ]
}
```

## Current Data

The system includes comprehensive mock data for three languages:

### English (24 entries)

- Basic greetings: hello, goodbye, please, thank
- Nature: water, fire, tree, flower
- Emotions: love, happy, sad
- Family: friend, family, mother, father, brother, sister
- Work: work
- Food: bread, milk
- Colors: white, black, green, red

### Tajik (22 entries)

- Basic greetings: салом, хода, шукрон
- Nature: об, оташ, фарғона
- Emotions: мӯҳаббат, хўшҳолӣ, гам
- Family: дӯст, оила, модар, падар, брадар, хоҳар
- Food: наан, дӯд
- Colors: сафед, сиёҳ, сабз, суркҳ

### Russian (22 entries)

- Basic greetings: привет, пока, спасибо, пожалуйста
- Nature: вода, огонь, дерево, цветок
- Emotions: любовь, счастье, грусть
- Family: друг, семья, мать, отец, брат, сестра
- Work: работа
- Food: хлеб, молоко
- Colors: белый, черный, зеленый, красный

## Usage Examples

### Using cURL

```bash
# Get all languages
curl http://localhost:8080/api/admin/languages

# Get English dictionary
curl http://localhost:8080/api/admin/dictionary/en

# Get specific word
curl http://localhost:8080/api/admin/dictionary/en/hello

# Add new word
curl -X POST http://localhost:8080/api/admin/dictionary \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "word": "amazing",
    "definitions": [{
      "partOfSpeech": "Adjective",
      "meaning": "Extremely impressive",
      "example": "That was an amazing performance!"
    }]
  }'

# Update word
curl -X PUT http://localhost:8080/api/admin/dictionary/en/hello \
  -H "Content-Type: application/json" \
  -d '{
    "definitions": [{
      "partOfSpeech": "Interjection",
      "meaning": "Updated meaning",
      "example": "Updated example"
    }]
  }'

# Delete word
curl -X DELETE http://localhost:8080/api/admin/dictionary/en/hello

# Search
curl "http://localhost:8080/api/admin/dictionary-search?language=en&query=hel"
```

### Using JavaScript/Fetch

```javascript
// Get all languages
fetch("/api/admin/languages")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Add new word
fetch("/api/admin/dictionary", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    language: "en",
    word: "wonderful",
    definitions: [
      {
        partOfSpeech: "Adjective",
        meaning: "Inspiring wonder",
        example: "What a wonderful day!",
      },
    ],
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

// Delete word
fetch("/api/admin/dictionary/en/wonderful", {
  method: "DELETE",
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## Error Handling

The API returns appropriate HTTP status codes:

- **200 OK**: Successful GET, PUT requests
- **201 Created**: Successful POST requests
- **400 Bad Request**: Missing or invalid parameters
- **404 Not Found**: Resource not found
- **409 Conflict**: Word already exists when creating

## Data Persistence

Currently, the dictionary data is stored in memory. To persist data permanently, you would need to:

1. Connect to a database (MongoDB, PostgreSQL, etc.)
2. Modify `server/routes/dictionary-admin.ts` to use database queries
3. Implement data serialization for import/export

## Future Enhancements

- Database integration for data persistence
- User authentication and role-based access
- Bulk import/export functionality
- Word pronunciation audio
- Example sentence audio recordings
- Multi-definition support UI improvements
- Advanced search and filtering
