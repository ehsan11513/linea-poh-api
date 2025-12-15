const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Linea PoH API base URL
const LINEA_POH_API_BASE = 'https://poh-api.linea.build/poh/v2';

/**
 * Validates Ethereum address format
 * @param {string} address - Ethereum address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEthereumAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Verifies Proof of Humanity status for a given address using Linea's PoH API
 * @param {string} address - Ethereum wallet address
 * @returns {Promise<{isHuman: boolean, error: string|null}>}
 */
async function verifyPoH(address) {
  try {
    const response = await fetch(`${LINEA_POH_API_BASE}/${address}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      // If Linea API returns non-200, treat as server error
      return {
        isHuman: false,
        error: `Linea PoH API returned status ${response.status}`,
      };
    }

    const text = (await response.text()).trim();
    
    // Linea API returns "true" or "false" as plain text
    if (text === 'true') {
      return { isHuman: true, error: null };
    } else if (text === 'false') {
      return { isHuman: false, error: null };
    } else {
      // Unexpected response format
      return {
        isHuman: false,
        error: `Unexpected response from Linea PoH API: ${text}`,
      };
    }
  } catch (error) {
    return {
      isHuman: false,
      error: `Failed to call Linea PoH API: ${error.message}`,
    };
  }
}

/**
 * Main verification endpoint compatible with Layer3 Custom API Integration spec
 * GET /verify?address=0x...
 * 
 * Layer3 will call this endpoint with the user's address as a query parameter.
 * 
 * Response format (per Layer3 spec):
 * - Success: 200, {"status": "success"}
 * - Failed: 200, {"status": "failed"}
 * - Client error: 4xx, JSON error
 * - Server error: 5xx, JSON error
 */
app.get('/verify', async (req, res) => {
  const address = req.query.address;

  // Validate address parameter (4xx for client errors)
  if (!address) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing required parameter: address',
    });
  }

  if (!isValidEthereumAddress(address)) {
    return res.status(400).json({
      status: 'failed',
      message: 'Invalid Ethereum address format',
    });
  }

  // Verify PoH status
  const result = await verifyPoH(address);

  // If there was an error calling Linea API, return 5xx (server error)
  if (result.error) {
    console.error(`Error verifying PoH for ${address}:`, result.error);
    return res.status(500).json({
      status: 'failed',
      message: 'Internal server error while verifying PoH status',
    });
  }

  // Return Layer3-compatible response
  if (result.isHuman) {
    return res.status(200).json({
      status: 'success',
    });
  } else {
    return res.status(200).json({
      status: 'failed',
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Linea PoH API Proxy',
  });
});

/**
 * Root endpoint with API information
 */
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'Linea PoH API Proxy for Layer3',
    version: '1.0.0',
    endpoints: {
      verify: '/verify?address=0x...',
      health: '/health',
    },
    description: 'REST API proxy for Linea Proof of Humanity verification, compatible with Layer3 Custom API Integration',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Linea PoH API Proxy server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Verify endpoint: http://localhost:${PORT}/verify?address=0x...`);
});

module.exports = app;

