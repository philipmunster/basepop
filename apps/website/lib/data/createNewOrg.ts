import { db } from '@repo/db'
import { org, orgSettings, orgMember, orgRole, orgRolePermissions, orgDataSourceStatus } from '@repo/db/schema'
import { describeCompanyOptionsType, ALL_DATA_SOURCE_IDS } from '@repo/db'
import { DataInsertError } from '@/lib/errors/classes'

export async function createNewOrg(userId: string, orgId: string, userEmail: string | undefined, orgName: string, organisationSize: describeCompanyOptionsType) {

  const ownerRoleId = crypto.randomUUID() // the user creating the org is the owner by default

  try {
    await db.transaction(async (tx) => {
      await tx.insert(org).values({ id: orgId, name: orgName, createdBy: userId, organisationSize})
      await tx.insert(orgSettings).values({orgId, billingEmail: userEmail})
      await tx.insert(orgDataSourceStatus).values(
        ALL_DATA_SOURCE_IDS.map( (id) => ({orgId, dataSourceId: id})) // insert a row for each dataSource (connected false by default)
      )
      await tx.insert(orgRole).values({ id: ownerRoleId, orgId, name: 'owner' })
      await tx.insert(orgMember).values({ orgId, userId, roleId: ownerRoleId}) // has to be here cause references orgRole which should be created first
      await tx.insert(orgRolePermissions).values(
        ALL_DATA_SOURCE_IDS.map( (id) => ({roleId: ownerRoleId, dataSourceId: id, canView: true, orgId})) // also inserting row for each id. Owner can of course view all
      )
    })
  } catch(err) {
    // e.message is the string, e.cause is Drizzle error and e.meta is the filters used
    throw new DataInsertError('Error ocurred when creating a new organisation', {
      cause: err,
      meta: {
        orgId,
        userId
      },
    })
  }
}