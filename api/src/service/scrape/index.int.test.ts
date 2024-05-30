import {cleanPageContent, getContentsForSearchResults} from "@/service/scrape/index"

describe("scrape", () => {
    test("Nominal with request" , async () => {
        const res = await getContentsForSearchResults([
            {
                url: "https://vincentdnl.com",
                title: "Mock title"
            }
        ])
        console.info(res[0].content)
    }, 60000)
})

describe("cleanContent", () => {
    test("Nominal with model query" , async () => {
        const res = await cleanPageContent([{
            url: "https://vincentdnl.com",
            title: "Mock title",
            content: `vincentdnl
Shop
Art
Blog
Hello! 👋
I’m Vincent Déniel, a full-stack web developer who has been programming for 15 years.
Here is what I do:
➡ CTO and software developer for Bulldog, a company I co-founded
➡ Training and education in science and technology
➡ Comics about programming and technology
You are in luck, I’m currently looking for new opportunities!
Looking for new freelance opportunities!
I’m looking for a new full-stack web development or CTO mission. Why should you hire me?
➡ I have plenty of experience in the software industry and have been part of startups building and selling successful products
➡ I have been a tech lead in an international company
➡ I have a good product culture (read “Running Lean” and “The Mom Test”) which is a great fit for your team
➡ I have a web3 experience
Let’s get in touch on LinkedIn!
LinkedIn
How I work
Technologies and tools
Here is the stack I'm most confortable with:
➡ Typescript
➡ React
➡ Node.js (ts-node)
➡ PostgreSQL & MongoDB
➡ Hardhat & Ethers.js for web3
➡ Python
Practices
I usually work following the principles of:
➡ Functional Programming
➡ DDD (Domain Driven Design)
➡ Agile Methodologies
➡ TDD (Test Driven Development)
➡ Lean
A few things I worked on
Bulldog Engagement Platform
A SaaS platform for brands who want to engage their community
The Bulldog SaaS platform is a product that helps our customers (some are CAC40 companies) reward the most active and engaging users in their community.
Main challenges:
Scalability (lots of incoming events from users)
Creation of the domain rules of a custom reward model
Onboarding and training of interns
Bulldog NFT Platform
A SaaS platform that helps brands create their NFT collection
This product was a platform that helped our customers create and deploy their NFT collection and create a page to sell the collection.
Main challenges:
Deploying a set of customizable smart contracts
Handling every success and error on blockchain transactions
myElefant Messaging Platform
A SaaS platform for sending rich marketing SMS
As a full-stack developer, I took part in the creation and maintenance of the myElefant marketing SMS platform.
Main challenges:
Scalability (millions of SMS sent weekly)
Avoiding bugs and regressions with automated testing (TDD)
I'm on these social networks
➡ Twitter
➡ Instagram
➡ Github
➡ LinkedIn
© vincentdnl 2024`
        }])
        console.info(res)
    }, 60000)
})
