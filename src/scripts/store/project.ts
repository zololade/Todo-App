//sample data
interface SingleProject {
  id: string;
  title: string;
  overview: string;
  flags: null | string[]; //remember to remove optional
}

const initialProjects: SingleProject[] = [
  {
    id: "xyz",
    title: "Prepare Presentation",
    overview:
      "Keep the talk and slides simple: what are the three things about this that everyone should remember?",
    flags: null,
  },
  {
    id: "abc",
    title: "Go to market",
    overview: "Activities to perform at each store in the market",
    flags: null,
  },
];

let projects = [...initialProjects];

export function projectModifier(id: string, flag: string) {
  const currentProject = projects.find((project) => project.id === id);
  if (!currentProject) return;

  projects = [
    ...projects.filter((data) => data.id !== currentProject.id),
    {
      ...currentProject,
      flags: !currentProject.flags
        ? [flag]
        : currentProject.flags.includes(flag)
          ? currentProject.flags.filter((data) => flag !== data).length === 0
            ? null
            : [...currentProject.flags.filter((data) => flag !== data)]
          : [flag, ...currentProject.flags],
    },
  ];
}

export function projectsGetter() {
  return projects;
}

//for test purpose
export function resetProjects() {
  projects = initialProjects.map((project) => project);
}

export { projects };
