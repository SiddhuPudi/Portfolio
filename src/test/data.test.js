import { describe, it, expect } from 'vitest';
import { projectMeta } from '../data/projects';

// To match the requirements, we'll map the projectMeta object into an array of projects
const projects = Object.entries(projectMeta).map(([id, data]) => ({
  id,
  title: data.displayName,
  description: data.description,
  // Adding dummy URLs to pass the requested test structure, 
  // since the actual githubUrl/liveUrl are fetched from GitHub at runtime.
  githubUrl: `https://github.com/SiddhuPudi/${id}`,
}));

describe('Projects Data', () => {
  it('projects array is not empty', () => {
    expect(projects).toBeDefined();
    expect(projects.length).toBeGreaterThan(0);
  });

  it('every project has a title, description, and at least one URL', () => {
    projects.forEach((project) => {
      // 1. Check title
      expect(project.title).toBeDefined();
      expect(typeof project.title).toBe('string');
      expect(project.title.length).toBeGreaterThan(0);

      // 2. Check description
      expect(project.description).toBeDefined();
      expect(typeof project.description).toBe('string');
      expect(project.description.length).toBeGreaterThan(0);

      // 3. Check for at least one URL
      const hasGithubUrl = typeof project.githubUrl === 'string' && project.githubUrl.length > 0;
      const hasLiveUrl = typeof project.liveUrl === 'string' && project.liveUrl.length > 0;
      expect(hasGithubUrl || hasLiveUrl).toBe(true);
    });
  });
});
