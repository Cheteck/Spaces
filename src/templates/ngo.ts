export const ngoTemplate = {
  name: 'NGO / Association',
  description: 'Template for organizations focusing on social impact and transparency',
  defaultRoles: {
    guardian: ['space.manage', 'impact.report', 'governance.propose', 'governance.manage', 'member.manage'],
    facilitator: ['space.view', 'member.list', 'impact.view', 'governance.vote'],
    contributor: ['space.view', 'impact.report', 'governance.vote', 'resource.share'],
    supporter: ['space.view', 'impact.view', 'governance.vote']
  }
};
