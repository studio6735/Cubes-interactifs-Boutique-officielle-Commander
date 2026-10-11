# Security Specification for Sifteo Cubes

## 1. Data Invariants
1. Orders must contain valid customer contact details (name, phone, country, city, shipping address).
2. Orders must specify product as "Sifteo Cubes" (or backward compatible "Cubes interactifs" / "FlipMotion").
3. Order quantity must be an integer between 1 and 20.
4. Calculated unitPrice is 49.90 EUR, and totalAmount must be >= 49.90 EUR.
5. Currency must be "EUR".
6. Status on creation must strictly be "En attente".
7. `createdAt` must strictly be set to the server timestamp `request.time`.
8. Order records cannot be updated or deleted by public clients (immutable order ledger).
9. Order records cannot be listed (`allow list: if false`) to prevent enumeration or leaking client PII (phone, names, addresses).
10. Default deny across all other collections.
11. Test collection `/test/connection` allows single doc read for client offline verification.

## 2. Dirty Dozen Payloads (Designed to Break Integrity & State)
1. **Ghost Field Injection**: Payload contains required fields plus extra field `discount: 100`.
2. **Price Tampering**: `unitPrice: 0.01` or `totalAmount: 1.00` for 10 units.
3. **Invalid Product Spoofing**: `productName: "FreeiPhone"` instead of `"FlipMotion"`.
4. **State Shortcutting**: `status: "Expédiée"` or `"Payée"` instead of `"En attente"`.
5. **Quantity Boundary Violation**: `quantity: -5` or `quantity: 0` or `quantity: 999999`.
6. **Denial of Wallet (Huge String)**: `customerName` or `shippingAddress` > 5000 chars.
7. **Client Timestamp Forgery**: `createdAt: "2020-01-01T00:00:00Z"` instead of server timestamp `request.time`.
8. **Missing Mandatory Field**: Missing `phone` or `shippingAddress`.
9. **Invalid Document ID**: Order ID containing non-alphanumeric / special traversal characters.
10. **Malicious Order Update**: Attempting to mutate an existing order's address or status.
11. **Malicious Order Deletion**: Attempting to delete an order document.
12. **PII Query Scraping**: Attempting a collection `list` query across `/orders`.
