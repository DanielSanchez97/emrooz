# Personal Finance


I have been frustrated with public finance management tools. I think they are too game-ified.

I want to build a tool that keeps all of my financial data locally (separate folder from this repo) in a standardized format that I can then build a small web application on top of.

The core things the app should do is:
- Easily import my bank, credit card, and Venmo transactions from export PDF/HTML Files
- Categorize my expenses into buckets that I create
    - Labels and categories for types of expenses
    - Keep a history of previous transactions to help do the labeling automatically
- Track my spending against a budget that I create 
- Allow for complex understanding of transactions
    - If I pay for a dinner for my friends and have them Venmo me back money, I can associate the transaction on my credit card to reimbursement from Venmo transactions
- Force me to justify every transaction with a reason for the transaction
- For my savings, breakdown the total balance in my account into multiple buckets.


Technical Implementation
- We should use SQL Lite as the database for this data. 
- I will have multiple clients for the application (locally running website, ios app). The SQL Lite database will be synced to an S3 bucket. When a client connects, it should get a copy of the data. Only one client can be "connected" at a time so that we do not have to resolve multiple writes happening at the same time. 

