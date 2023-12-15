import * as casbin from 'casbin';
import path from 'path';

const POLICY_PATHS = {
  rootAdmin: './../../../../fixtures/casbin/rbac_policy.root_admin.csv',
  tenderOwner: './../../../../fixtures/casbin/rbac_policy.tender_owner.csv',
  juryMember: './../../../../fixtures/casbin/rbac_policy.jury_member.csv',
  applicant: './../../../../fixtures/casbin/rbac_policy.applicant.csv',
};

export async function getCasbinEnforcerByName(
  name: string,
): Promise<casbin.Enforcer | undefined> {
  const CASBIN_ENFORCERS: {[key: string]: Promise<casbin.Enforcer>} = {
    rootAdmin: createEnforcerByRole(POLICY_PATHS.rootAdmin),
    tenderOwner: createEnforcerByRole(POLICY_PATHS.tenderOwner),
    juryMember: createEnforcerByRole(POLICY_PATHS.juryMember),
    applicant: createEnforcerByRole(POLICY_PATHS.applicant),
  };
  if (Object.prototype.hasOwnProperty.call(CASBIN_ENFORCERS, name))
    return CASBIN_ENFORCERS[name];
  return undefined;
}

export async function createEnforcerByRole(
  policyPath: string,
): Promise<casbin.Enforcer> {
  const conf = path.resolve(
    __dirname,
    './../../../../fixtures/casbin/rbac_model.conf',
  );
  const policy = path.resolve(__dirname, policyPath);
  return casbin.newEnforcer(conf, policy);
}
