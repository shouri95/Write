#!/usr/bin/env bash
#
# setup.ch
# A single, comprehensive script that creates a Next.js (TypeScript) + SQLite + Prisma + ShadCN UI project,
# fully ready for development. Designed for GitHub Codespaces or any environment with Node.js + npm installed.
#
# Usage (in your terminal within Codespaces or any Unix-like shell):
#   1) chmod +x setup.ch
#   2) ./setup.ch my-web-app
#
# After it finishes, just 'cd' into your new project folder, run 'npm run dev', and start building.

# --------------------------------------------------------------------
# CHECK PREREQUISITES
# --------------------------------------------------------------------
if ! command -v node &> /dev/null; then
  echo "Node.js not found. Please install Node.js before running this script."
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "npm not found. Please install npm before running this script."
  exit 1
fi

if ! command -v npx &> /dev/null; then
  echo "npx not found. Please install npx before running this script."
  exit 1
fi

# --------------------------------------------------------------------
# PARSE ARGUMENTS
# --------------------------------------------------------------------
PROJECT_NAME="$1"
if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: $0 <project_name>"
  exit 1
fi

# --------------------------------------------------------------------
# CREATE NEXT.JS (TYPESCRIPT) PROJECT
# --------------------------------------------------------------------
npx create-next-app@latest "$PROJECT_NAME" --typescript --eslint

# Move into project
cd "$PROJECT_NAME" || exit 1

# --------------------------------------------------------------------
# INSTALL DEPENDENCIES
# --------------------------------------------------------------------
npm install sqlite3
npm install prisma @prisma/client
npm install shadcn/ui

# --------------------------------------------------------------------
# INITIALIZE PRISMA FOR SQLITE
# --------------------------------------------------------------------
npx prisma init --datasource-provider sqlite

# --------------------------------------------------------------------
# CONFIGURE SHADCN UI
# --------------------------------------------------------------------
npx shadcn-ui init -y

# --------------------------------------------------------------------
# SETUP DATABASE & MIGRATION
# --------------------------------------------------------------------
# By default, Prisma creates ./prisma/schema.prisma with "sqlite" at ./dev.db.
# Adjust the schema if you want to customize tables before running migrate.
# The migrate command below creates or updates dev.db automatically.

npx prisma migrate dev --name init

# --------------------------------------------------------------------
# DONE
# --------------------------------------------------------------------
echo "================================================================="
echo "Setup complete! Your new project is in the '$PROJECT_NAME' folder."
echo "================================================================="
echo "NEXT STEPS:"
echo "1) cd $PROJECT_NAME"
echo "2) npm run dev"
echo "3) Start building your Next.js + SQLite + Prisma + ShadCN UI app!"
