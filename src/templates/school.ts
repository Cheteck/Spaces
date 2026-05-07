export const schoolTemplate = {
  name: 'Learning / School',
  description: 'Template for educational spaces and mentorship circles',
  defaultRoles: {
    guardian: ['space.manage', 'course.manage', 'mentor.assign', 'member.manage'],
    facilitator: ['course.teach', 'member.list', 'impact.report'],
    contributor: ['course.attend', 'resource.use', 'impact.view'],
    supporter: ['space.view']
  }
};
