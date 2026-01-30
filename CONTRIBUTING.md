# Contributing to Datary

Welcome! Thank you for considering contributing to **Datary** - a modern cross-platform database explorer. Your contributions help make the platform better, faster, and more user-friendly.

Before you start, please read this document carefully. It contains all the guidelines for contributing effectively.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Project Structure](#project-structure)
5. [Rules for Code](#rules-for-code)
6. [Commit Message Guidelines](#commit-message-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Reporting Issues](#reporting-issues)
9. [Acknowledgements](#acknowledgements)

---

## Code of Conduct

We aim to maintain a friendly and inclusive environment. Please respect all participants and contribute constructively.

- Be polite and respectful.
- Give constructive feedback.
- Report problems or abusive behavior to maintainers.

Full code of conduct can be found in [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

---

## How to Contribute

We welcome contributions from everyone! Here’s how to get started:

1. Fork the repository.
2. Clone your fork locally:

```bash
git clone https://github.com/TeaCoder52/datary.git
cd datary
```

3. Create a new branch for your work:

```bash
git checkout -b feat/add-new-feature
```

4. Make your changes.
5. Run and test your changes locally.
6. Commit your changes following the [commit guidelines](#commit-message-guidelines).
7. Push your branch to your fork.
8. Open a Pull Request against the main branch of the main repository.

## Development Setup

Follow these steps to set up a local development environment:

1. Install dependencies:

```bash
pnpm install
```

2. Build packages:

```bash
pnpm run build:packages
```

3. Run in development mode:

```bash
pnpm run dev
```

## Project Structure

```txt
apps/
  desktop/      # Electron app
    main/       # Electron main process code
    preload/    # Preload scripts exposing APIs
    renderer/   # React frontend
packages/
  db/           # Database utilities and types
```

## Rules for Code

- Follow TypeScript strict typing.
- Use contextBridge for exposing APIs to the renderer.
- Run pnpm build:packages before testing Electron builds.
- Keep consistent code style using Prettier.

## Commit Message Guidelines

For a clean history, all commits must follow this format:

```bash
<type>(<scope>): <short description>
<optional detailed description>
```

**Type Prefixes:**

| Prefix   | Description                                         | Example                                                         |
| -------- | --------------------------------------------------- | --------------------------------------------------------------- |
| feat     | A new feature or functionality added                | feat(renderer): add connection import from URL                  |
| fix      | Bug fix or correction                               | fix(preload): correct db.connect typing                         |
| chore    | Changes to configuration, build scripts, or tooling | chore: update .gitignore                                        |
| refactor | Code refactoring                                    | refactor(db): reorganize database connection utilities          |
| perf     | Performance improvements                            | perf: optimize database query caching                           |
| ci       | Changes to CI/CD pipelines or workflow              | ci: update GitHub Actions                                       |
| revert   | Revert a previous commit                            | revert: revert "feat(renderer): add connection import from URL" |

**Rules:**

- Messages must be in English.
- Short description ≤ 50 characters.
- Use imperative mood: Add, Fix, Update, Remove.
- Detailed description optional, separated by an empty line.
- Scope is optional but recommended (e.g., renderer, main, preload, db).

## Pull Request Process

- Make sure your branch is up-to-date with `main`.
- Validate your code works locally.
- Describe changes clearly in the PR description.
- Use proper commit messages.
- After approval, the PR will be merged into the main branch.

## Reporting Issues

If you find a bug or issue:

1. Open a new issue in the repository.
2. Provide as much detail as possible:
    - Steps to reproduce
    - Environment (OS, Node.js version, Electron version)
    - Error messages
    - Screenshots if relevant

3. Label the issue appropriately (bug, enhancement, question, etc.).

## Acknowledgements

Thanks to everyone contributing to Datary! Your work helps make database management easier and more accessible.

Maintainer: TeaCoder - project owner and guide
Contributors: Everyone who submits PRs, fixes bugs, or improves the code/documentation.

Every contribution matters - together we make Datary better for all users!
