#!/bin/bash

# Test script for Linea PoH API Proxy
# Usage: ./test-api.sh [base_url]
# Default: http://localhost:3000

BASE_URL="${1:-http://localhost:3000}"
EXAMPLE_ADDRESS="0xc5fd29cC1a1b76ba52873fF943FEDFDD36cF46C6"

echo "Testing Linea PoH API Proxy at: $BASE_URL"
echo "=========================================="
echo ""

echo "1. Health Check:"
curl -s "$BASE_URL/health" | jq '.' 2>/dev/null || curl -s "$BASE_URL/health"
echo ""
echo ""

echo "2. Verify with example address (should return success or failed):"
curl -s "$BASE_URL/verify?address=$EXAMPLE_ADDRESS" | jq '.' 2>/dev/null || curl -s "$BASE_URL/verify?address=$EXAMPLE_ADDRESS"
echo ""
echo ""

echo "3. Verify with invalid address (should return error):"
curl -s "$BASE_URL/verify?address=invalid" | jq '.' 2>/dev/null || curl -s "$BASE_URL/verify?address=invalid"
echo ""
echo ""

echo "4. Verify without address parameter (should return error):"
curl -s "$BASE_URL/verify" | jq '.' 2>/dev/null || curl -s "$BASE_URL/verify"
echo ""
echo ""

echo "5. Root endpoint:"
curl -s "$BASE_URL/" | jq '.' 2>/dev/null || curl -s "$BASE_URL/"
echo ""
echo ""

echo "Tests completed!"

