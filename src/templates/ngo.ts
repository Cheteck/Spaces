export const ngoTemplate = {
  name: 'NGO / Association',
  description: 'Template for organizations focusing on social impact and transparency',
  defaultRoles: {
    OWNER: ['*'],
    ADMIN: ['space.manage', 'impact.report', 'governance.propose', 'governance.manage', 'member.manage'],
    GUARDIAN: ['space.view', 'impact.report', 'governance.vote', 'resource.share'],
    FACILITATOR: ['space.view', 'member.list', 'impact.view', 'governance.vote'],
    CONTRIBUTOR: ['space.view', 'post.create', 'impact.report', 'governance.vote'],
    SUBSCRIBER: ['space.view', 'impact.view', 'governance.vote']
  }
};
