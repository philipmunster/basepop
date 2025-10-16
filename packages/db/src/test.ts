import { db, shopifyOrderFact } from './index'

async function main() {
  const data = await db
    .select()
    .from(shopifyOrderFact)
    .limit(2)

  console.log(data)
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e)
  process.exit(1)
})