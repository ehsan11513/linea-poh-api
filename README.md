# Linea Proof of Humanity API Proxy for Layer3

A simple REST API proxy that wraps Linea's Proof of Humanity (PoH) API to make it compatible with Layer3's Custom API Integration specification.

## Overview

This API acts as a bridge between Layer3 quest steps and Linea's PoH verification service. When a user tries to verify a quest step on Layer3, Layer3 will call this API, which in turn checks the user's PoH status via Linea's API.

## How It Works

1. **Layer3** calls this API: `GET /verify?address=0x...`
2. **This API** calls Linea's PoH API: `GET https://poh-api.linea.build/poh/v2/{address}`
3. **This API** returns Layer3-compatible response:
   - `{"status": "success"}` if address has PoH
   - `{"status": "failed"}` if address does not have PoH

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

The server will start on port 3000 (or the port specified in the `PORT` environment variable).

## API Endpoints

### Verify PoH Status
**Endpoint:** `GET /verify?address={wallet_address}`

**Query Parameters:**
- `address` (required): Ethereum wallet address (0x format)

**Response Format (Layer3 Compatible):**
- **Success (200):** `{"status": "success"}` - Address has PoH
- **Failed (200):** `{"status": "failed"}` - Address does not have PoH
- **Client Error (400):** `{"status": "failed", "message": "..."}` - Invalid request
- **Server Error (500):** `{"status": "failed", "message": "..."}` - Internal error

**Example:**
```bash
curl "http://localhost:3000/verify?address=0xc5fd29cC1a1b76ba52873fF943FEDFDD36cF46C6"
```

### Health Check
**Endpoint:** `GET /health`

Returns service status.

### Root
**Endpoint:** `GET /`

Returns API information and available endpoints.

## Layer3 Integration

1. **Deploy this API** to a publicly accessible URL (e.g., Vercel, Railway, Render, AWS, etc.)

2. **In Layer3 Activation Builder:**
   - Add a "Custom API" action type
   - Set the endpoint URL to: `https://your-deployed-api.com/verify`
   - (Optional) Add any required headers if needed

3. **How it works in Layer3:**
   - When a user clicks "Verify" on the quest step, Layer3 automatically calls: `https://your-deployed-api.com/verify?address={user_wallet_address}`
   - If the response is `{"status": "success"}`, the user can proceed
   - If the response is `{"status": "failed"}`, the user cannot proceed

## Deployment Options

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Railway
1. Connect your GitHub repo
2. Railway will auto-detect Node.js and deploy

### Render
1. Create a new Web Service
2. Connect your repo
3. Set build command: `npm install`
4. Set start command: `npm start`

### AWS Lambda / Serverless
You may need to adapt the code for serverless functions. Consider using `serverless-http` or similar.

## Environment Variables

- `PORT` (optional): Server port (default: 3000)

## Error Handling

- **4xx errors**: Returned for invalid requests (missing address, invalid format)
- **5xx errors**: Returned when Linea's PoH API is unavailable or returns unexpected responses

## Testing

Test the API locally:

```bash
# Test with a verified address (if you have one)
curl "http://localhost:3000/verify?address=0xc5fd29cC1a1b76ba52873fF943FEDFDD36cF46C6"

# Test health endpoint
curl "http://localhost:3000/health"

# Test with invalid address
curl "http://localhost:3000/verify?address=invalid"
```

## Notes

- This API is stateless and requires no authentication
- Linea's PoH API is free to use and requires no API keys
- The API handles all error cases according to Layer3's specification
- Response times depend on Linea's PoH API response time

## References

- [Linea PoH Documentation](https://docs.linea.build/get-started/how-to/verify-users-with-proof-of-humanity)
- [Layer3 Custom API Integration](https://layer3xyz.gitbook.io/layer3-builder/activation-builder/guides/custom-api-integration)

